import { useState, useRef } from "react";
import "./App.css";

import { CredentialsForm } from "./components/CredentialsForm/CredentialsForm";
import { MessengerLayout } from "./components/MessengerLayout/MessengerLayout";

import * as greenApi from "./api/greenApi";
import type { Chat, Message } from "./types/chat.type";
import type { GreenApiCredentials } from "./types/greenApi.type";

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

  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? null;

  async function handleCreateChat(phone: string): Promise<string | null> {
    if (!credentials) {
      return "Сначала введите учетные данные.";
    }

    const digits = phone.replace(/^\+/, "");

    if (!/^(7\d{10}|375\d{9})$/.test(digits)) {
      return "Введите номер РФ или РБ с кодом страны 7 или 375.";
    }

    const normalizedPhone = `+${digits}`;

    const existingChat = chats.find(
      (chat) => chat.phone.replace(/^\+/, "") === digits,
    );

    if (existingChat) {
      setActiveChatId(existingChat.id);
      return null;
    }

    try {
      const account = await greenApi.checkAccount(credentials, {
        phoneNumber: Number(digits),
      });

      if ("status" in account) {
        return "Не удалось проверить номер. Проверьте авторизацию инстанса и ограничения API.";
      }

      if (!account.exist) {
        return "Аккаунт MAX для этого номера не найден.";
      }

      if (!account.chatId) {
        return "GREEN-API не вернул идентификатор чата.";
      }

      const existingByServerId = chats.find(
        (chat) => chat.chatId === account.chatId,
      );

      if (existingByServerId) {
        setActiveChatId(existingByServerId.id);
        return null;
      }

      const chat: Chat = {
        id: crypto.randomUUID(),
        chatId: account.chatId,
        phone: normalizedPhone,
        messages: [],
      };

      setChats((currentChats) => [...currentChats, chat]);
      setActiveChatId(chat.id);

      return null;
    } catch {
      return "Не удалось проверить номер. Проверьте соединение и учетные данные.";
    }
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

      return true;
    } catch {
      setSendError({
        localChatId: targetChat.id,
        text: "Не удалось подтвердить отправку. Текст не очищен. Проверьте соединение и состояние инстанса.",
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
