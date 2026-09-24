import Typography from "@mui/material/Typography";
import { PanelRoot, PanelContent } from "./ChatPanel.styles";

import { ChatHeader } from "../ChatHeader/ChatHeader";
import { MessageList } from "../MessageList/MessageList";

import type { Chat } from "../../types/chat";

type ChatPanelProps = {
  chat: Chat | null;
};

export function ChatPanel({ chat }: ChatPanelProps) {
  return (
    <PanelRoot component="main" aria-label="Область чата">
      <PanelContent>
        {chat ? (
          <>
            <ChatHeader chat={chat} />
            <MessageList key={chat.id} messages={chat.messages} />
          </>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Выберите или создайте чат.
          </Typography>
        )}
      </PanelContent>
    </PanelRoot>
  );
}
