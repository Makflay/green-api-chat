import { LayoutRoot } from "./MessengerLayout.styles";
import type { Chat } from "../../types/chat.type";

import { NavigationRail } from "../NavigationRail/NavigationRail";
import { ChatsSidebar } from "../ChatsSidebar/ChatsSidebar";
import { ChatPanel } from "../ChatPanel/ChatPanel";

type MessengerLayoutProps = {
  chats: Chat[];
  activeChatId: string | null;
  activeChat: Chat | null;
  onCreateChat: (phone: string) => Promise<string | null>;
  onSelectChat: (chatId: string) => void;
  onSendMessage: (text: string) => Promise<boolean>;
  isSending: boolean;
  sendError: string | null;
};

export function MessengerLayout({
  chats,
  activeChatId,
  activeChat,
  onCreateChat,
  onSelectChat,
  onSendMessage,
  isSending,
  sendError,
}: MessengerLayoutProps) {
  return (
    <LayoutRoot>
      <NavigationRail />
      <ChatsSidebar
        chats={chats}
        activeChatId={activeChatId}
        onCreateChat={onCreateChat}
        onSelectChat={onSelectChat}
      />
      <ChatPanel
        key={activeChat?.id ?? "no-active-chat"}
        chat={activeChat}
        onSendMessage={onSendMessage}
        isSending={isSending}
        sendError={sendError}
      />
    </LayoutRoot>
  );
}
