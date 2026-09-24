import Typography from "@mui/material/Typography";
import { PanelRoot, PanelContent } from "./ChatPanel.styles";

import { ChatHeader } from "../ChatHeader/ChatHeader";

import type { Chat } from "../../types/chat";

type ChatPanelProps = {
  chat: Chat | null;
};

export function ChatPanel({ chat }: ChatPanelProps) {
  return (
    <PanelRoot component="main" aria-label="Область чата">
      {chat && <ChatHeader chat={chat} />}
      <PanelContent>
        {chat ? (
          <>
            <Typography variant="h2" component="h1">
              {chat.phone}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Сообщений: {chat.messages.length}
            </Typography>
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
