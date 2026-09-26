import { useState, useEffect, useRef, useCallback } from "react";

import { CredentialsForm } from "./components/CredentialsForm/CredentialsForm";
import { MessengerLayout } from "./components/MessengerLayout/MessengerLayout";

import * as greenApi from "./api/greenApi";
import type { Chat, Message, Credentials } from "./types/chat.type";
import type { IncomingTextNotificationResponse } from "./types/greenApi.type";

import {
  getPhoneError,
  normalizePhoneNumber,
  resolveMaxChatId,
} from "./utils/chatId";
import { useNotifications } from "./hooks/useNotifications";

function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const [isSending, setIsSending] = useState(false);
  const sendingRef = useRef(false);

  const [sendError, setSendError] = useState<{
    localChatId: string;
    text: string;
  } | null>(null);

  const pendingNotificationRef = useRef<{
    chatId: string;
    messageId: string;
    resolve: (processed: boolean) => void;
  } | null>(null);

  useEffect(() => {
    const pending = pendingNotificationRef.current;

    if (!pending) {
      return;
    }

    const saved = chats.some(
      (chat) =>
        chat.chatId === pending.chatId &&
        chat.messages.some((message) => message.id === pending.messageId),
    );

    pendingNotificationRef.current = null;
    pending.resolve(saved);
  }, [chats]);

  useEffect(() => {
    return () => {
      const pending = pendingNotificationRef.current;

      pendingNotificationRef.current = null;
      pending?.resolve(false);
    };
  }, []);

  const handleNotification = useCallback(
    (notification: IncomingTextNotificationResponse): Promise<boolean> => {
      const { body } = notification;
      const serverChatId = body.senderData.chatId;

      const targetChat = chats.find((chat) => chat.chatId === serverChatId);

      if (!targetChat || pendingNotificationRef.current) {
        return Promise.resolve(false);
      }

      const alreadySaved = targetChat.messages.some(
        (message) => message.id === body.idMessage,
      );

      if (alreadySaved) {
        return Promise.resolve(true);
      }

      const message: Message = {
        id: body.idMessage,
        text: body.messageData.textMessageData.textMessage,
        direction: "incoming",
      };

      return new Promise<boolean>((resolve) => {
        pendingNotificationRef.current = {
          chatId: serverChatId,
          messageId: message.id,
          resolve,
        };

        setChats((currentChats) =>
          currentChats.map((chat) => {
            if (
              chat.chatId !== serverChatId ||
              chat.messages.some((item) => item.id === message.id)
            ) {
              return chat;
            }

            return {
              ...chat,
              messages: [...chat.messages, message],
            };
          }),
        );
      });
    },
    [chats],
  );

  const pollingError = useNotifications(credentials, handleNotification);

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
    } catch (error) {
      let text =
        "Не удалось подтвердить отправку. Текст сохранён. Проверьте соединение и попробуйте ещё раз.";

      if (greenApi.isGreenApiAuthError(error)) {
        text =
          "GREEN-API отклонил доступ. Проверьте учетные данные и права инстанса. Текст сохранён. Для повторного ввода credentials обновите страницу.";
      } else if (
        error instanceof greenApi.GreenApiHttpError &&
        error.status === 400
      ) {
        text =
          "GREEN-API отклонил запрос отправки. Проверьте получателя и параметры сообщения. Текст сохранён.";
      }
      setSendError({
        localChatId: targetChat.id,
        text,
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
      pollingError={pollingError}
    />
  );
}

export default App;
