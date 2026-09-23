import { useState } from "react";
import "./App.css";

import { CredentialsForm } from "./components/CredentialsForm/CredentialsForm";
import type { Credentials } from "./components/CredentialsForm/CredentialsForm";
import { MessengerLayout } from "./components/MessengerLayout/MessengerLayout";

function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  if (credentials) {
    return <CredentialsForm onConnect={setCredentials} />;
  }

  return <MessengerLayout />;
}

export default App;
