import { useState, useRef, useCallback } from "react";
import "./App.css";

import { CredentialsForm } from "./components/CredentialsForm/CredentialsForm";
import { MessengerLayout } from "./components/MessengerLayout/MessengerLayout";

import * as greenApi from "./api/greenApi";
import type { Chat, Message } from "./types/chat.type";
import type {
  GreenApiCredentials,
  ReceiveNotificationResponse,
} from "./types/greenApi.type";

import {
  getPhoneError,
  normalizePhoneNumber,
  resolveMaxChatId,
} from "./utils/chatId";
import { useNotifications } from "./hooks/useNotifications";

function App() {
  const [credentials, setCredentials] = useState<GreenApiCredentials | null>(
    null,
  );
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const [isSending, setIsSending] = useState(false);
  const sendingRef = useRef(false);

  const [sendError, setSendError] = useState<{
    localChatId: string;
    text: string;
  } | null>(null);

  const lastNotificationRef = useRef<ReceiveNotificationResponse | null>(null);

  const handleNotification = useCallback(
    (notification: ReceiveNotificationResponse) => {
      lastNotificationRef.current = notification;
    },
    [],
  );

  useNotifications(credentials, handleNotification);

  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? null;

  async function handleCreateChat(phone: string): Promise<string | null> {
    if (!credentials) {
      return "Сначала введите учетные данные.";
    }

    const phoneError = getPhoneError(phone);

    if (phoneError) {
      return phoneError;
    }

    const digits = normalizePhoneNumber(phone).replace(/^\+/, "");
    const normalizedPhone = `+${digits}`;

    const existingChat = chats.find((chat) => chat.phone === normalizedPhone);

    if (existingChat) {
      setActiveChatId(existingChat.id);
      return null;
    }

    let serverChatId: string;

    try {
      serverChatId = await resolveMaxChatId(normalizedPhone, credentials);
    } catch (error) {
      return error instanceof Error
        ? error.message
        : "Не удалось получить идентификатор чата.";
    }

    const existingByServerId = chats.find(
      (chat) => chat.chatId === serverChatId,
    );

    if (existingByServerId) {
      setActiveChatId(existingByServerId.id);
      return null;
    }

    const chat: Chat = {
      id: crypto.randomUUID(),
      phone: normalizedPhone,
      chatId: serverChatId,
      messages: [],
    };

    setChats((currentChats) => [...currentChats, chat]);
    setActiveChatId(chat.id);

    return null;
  }

  function handleSelectChat(chatId: string) {
    setActiveChatId(chatId);
  }

  async function handleSendMessage(text: string): Promise<boolean> {
    const trimmedText = text.trim();

    if (!credentials || !activeChat || !trimmedText || sendingRef.current) {
      return false;
    }

    const targetChat = activeChat;

    sendingRef.current = true;
    setIsSending(true);
    setSendError(null);

    try {
      const response = await greenApi.sendMessage(credentials, {
        chatId: targetChat.chatId,
        message: trimmedText,
      });

      const message: Message = {
        id: response.idMessage,
        text: trimmedText,
        direction: "outgoing",
      };

      setChats((currentChats) =>
        currentChats.map((chat) =>
          chat.id === targetChat.id
            ? {
                ...chat,
                messages: [...chat.messages, message],
              }
            : chat,
        ),
      );

      setSendError(null);

      return true;
    } catch {
      setSendError({
        localChatId: targetChat.id,
        text: "Не удалось подтвердить отправку. Текст не очищен. Проверьте соединение и попробуйте отправить сообщение ещё раз.",
      });

      return false;
    } finally {
      sendingRef.current = false;
      setIsSending(false);
    }
  }

  if (!credentials) {
    return <CredentialsForm onConnect={setCredentials} />;
  }

  return (
    <MessengerLayout
      chats={chats}
      activeChatId={activeChatId}
      activeChat={activeChat}
      onCreateChat={handleCreateChat}
      onSelectChat={handleSelectChat}
      onSendMessage={handleSendMessage}
      isSending={isSending}
      sendError={
        sendError?.localChatId === activeChatId ? sendError.text : null
      }
    />
  );
}

export default App;
