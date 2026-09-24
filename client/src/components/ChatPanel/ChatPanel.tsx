import { useState } from "react";
import Typography from "@mui/material/Typography";
import { PanelRoot, PanelContent } from "./ChatPanel.styles";
import type { Chat } from "../../types/chat";

import { ChatHeader } from "../ChatHeader/ChatHeader";
import { MessageList } from "../MessageList/MessageList";
import { MessageInput } from "../MessageInput/MessageInput";

type ChatPanelProps = {
  chat: Chat | null;
};

export function ChatPanel({ chat }: ChatPanelProps) {
  const [draft, setDraft] = useState("");

  function handleSubmit() {
    console.log("ChatPanel handleSubmit");
  }

  return (
    <PanelRoot component="main" aria-label="Область чата">
      <>
        {chat ? (
          <>
            <ChatHeader chat={chat} />
            <MessageList key={chat.id} messages={chat.messages} />
            <MessageInput
              value={draft}
              onChange={setDraft}
              onSubmit={handleSubmit}
            />
          </>
        ) : (
          <PanelContent>
            <Typography variant="body1" color="text.secondary">
              Выберите или создайте чат.
            </Typography>
          </PanelContent>
        )}
      </>
    </PanelRoot>
  );
}
