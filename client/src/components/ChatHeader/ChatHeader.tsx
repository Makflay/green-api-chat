import type { Chat } from "../../types/chat";
import {
  HeaderInfo,
  HeaderRoot,
  PhoneNumber,
  Subtitle,
} from "./ChatHeader.styles";

type ChatHeaderProps = {
  chat: Chat;
};

export function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <HeaderRoot component="header">
      <HeaderInfo>
        <PhoneNumber component="h1" title={chat.phone}>
          {chat.phone}
        </PhoneNumber>

        <Subtitle>MAX</Subtitle>
      </HeaderInfo>
    </HeaderRoot>
  );
}
