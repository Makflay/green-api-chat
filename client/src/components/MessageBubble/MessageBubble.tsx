import type { Message } from "../../types/chat.type";
import { Bubble, MessageRow, MessageText } from "./MessageBubble.styles";

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <MessageRow
      direction={message.direction}
      aria-label={
        message.direction === "incoming"
          ? "Входящее сообщение"
          : "Исходящее сообщение"
      }
    >
      <Bubble direction={message.direction}>
        <MessageText>{message.text}</MessageText>
      </Bubble>
    </MessageRow>
  );
}
