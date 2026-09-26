import type { Message } from "../../types/chat.type";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import {
  EmptyState,
  EmptyStateText,
  ListViewport,
  Messages,
} from "./MessageList.styles";

type MessageListProps = {
  messages: Message[];
};

export function MessageList({ messages }: MessageListProps) {
  return (
    <ListViewport role="region" aria-label="Сообщения чата" tabIndex={0}>
      {messages.length === 0 ? (
        <EmptyState>
          <EmptyStateText>Сообщений пока нет</EmptyStateText>
        </EmptyState>
      ) : (
        <Messages>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </Messages>
      )}
    </ListViewport>
  );
}
