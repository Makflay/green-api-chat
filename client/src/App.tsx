import { useState } from "react";
import "./App.css";
import type { Chat, Credentials, Message } from "./types/chat";

import { CredentialsForm } from "./components/CredentialsForm/CredentialsForm";
import { MessengerLayout } from "./components/MessengerLayout/MessengerLayout";

function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId) ?? null;

  function handleCreateChat(chat: Chat) {
    const existingChat = chats.find(
      (currentChat) => currentChat.phone === chat.phone,
    );

    if (existingChat) {
      setActiveChatId(existingChat.id);
      return;
    }

    setChats((currentChats) => [...currentChats, chat]);

    setActiveChatId(chat.id);
  }

  function handleSelectChat(chatId: string) {
    setActiveChatId(chatId);
  }

  function handleSendMessage(text: string) {
    const trimmedText = text.trim();

    if (!activeChat || !trimmedText) {
      return;
    }

    const targetChatId = activeChat.id;

    const message: Message = {
      id: crypto.randomUUID(),
      text: trimmedText,
      direction: "outgoing",
    };

    setChats((currentChats) =>
      currentChats.map((chat) =>
        chat.id === targetChatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
            }
          : chat,
      ),
    );
  }

  if (credentials) {
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
    />
  );
}

export default App;
