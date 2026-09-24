import { useState } from "react";
import "./App.css";

import { CredentialsForm } from "./components/CredentialsForm/CredentialsForm";
import { MessengerLayout } from "./components/MessengerLayout/MessengerLayout";

import type { Chat, Credentials } from "./types/chat";

function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  function handleCreateChat(chat: Chat) {
    setChats((currentChats) => {
      const alreadyExists = currentChats.some(
        (existingChat) => existingChat.phone === chat.phone,
      );

      if (alreadyExists) {
        return currentChats;
      }

      return [...currentChats, chat];
    });

    setActiveChatId(chat.id);
  }

  if (credentials) {
    return <CredentialsForm onConnect={setCredentials} />;
  }

  return (
    <MessengerLayout
      chats={chats}
      activeChatId={activeChatId}
      onCreateChat={handleCreateChat}
      onSelectChat={setActiveChatId}
    />
  );
}

export default App;
