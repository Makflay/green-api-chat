import { useState } from "react";
import "./App.css";

import { CredentialsForm } from "./components/CredentialsForm/CredentialsForm";
import type { Credentials } from "./components/CredentialsForm/CredentialsForm";
import { MessengerLayout } from "./components/MessengerLayout/MessengerLayout";
import type { LocalChat } from "./components/NewChatForm/NewChatForm";

function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [chats, setChats] = useState<LocalChat[]>([]);
  const [activePhoneNumber, setActivePhoneNumber] = useState<string | null>(
    null,
  );

  function handleCreateChat(chat: LocalChat) {
    setChats((currentChats) => {
      const alreadyExists = currentChats.some(
        (existingChat) => existingChat.phoneNumber === chat.phoneNumber,
      );

      if (alreadyExists) {
        return currentChats;
      }

      return [...currentChats, chat];
    });

    setActivePhoneNumber(chat.phoneNumber);
  }

  if (credentials) {
    return <CredentialsForm onConnect={setCredentials} />;
  }

  return (
    <MessengerLayout
      chats={chats}
      activePhoneNumber={activePhoneNumber}
      onCreateChat={handleCreateChat}
      onSelectChat={setActivePhoneNumber}
    />
  );
}

export default App;
