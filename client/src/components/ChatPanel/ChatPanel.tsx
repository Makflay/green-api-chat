import { useState } from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { PanelRoot, PanelContent, NoChatState } from "./ChatPanel.styles";
import type { Chat } from "../../types/chat.type";

import { ChatHeader } from "../ChatHeader/ChatHeader";
import { MessageList } from "../MessageList/MessageList";
import { MessageInput } from "../MessageInput/MessageInput";

type ChatPanelProps = {
  chat: Chat | null;
  onSendMessage: (text: string) => Promise<boolean>;
  isSending: boolean;
  sendError: string | null;
  pollingError: string | null;
};

export function ChatPanel({
  chat,
  onSendMessage,
  isSending,
  sendError,
  pollingError,
}: ChatPanelProps) {
  const [draft, setDraft] = useState("");

  async function handleSubmit() {
    const text = draft.trim();

    if (!chat || !text || isSending) {
      return;
    }

    const sent = await onSendMessage(text);

    if (sent) {
      setDraft("");
    }
  }

  return (
    <PanelRoot component="main" aria-label="Область чата">
      {pollingError && <Alert severity="warning">{pollingError}</Alert>}
      <>
        {chat ? (
          <>
            <ChatHeader chat={chat} />
            <MessageList key={chat.id} messages={chat.messages} />
            {sendError && <Alert severity="error">{sendError}</Alert>}
            <MessageInput
              value={draft}
              onChange={setDraft}
              onSubmit={() => {
                void handleSubmit();
              }}
              loading={isSending}
            />
          </>
        ) : (
          <PanelContent>
            <NoChatState>
              <Typography variant="body1" color="text.secondary">
                Выберите или создайте чат.
              </Typography>
            </NoChatState>
          </PanelContent>
        )}
      </>
    </PanelRoot>
  );
}
