import { LayoutRoot } from "./MessengerLayout.styles";
import type { Chat } from "../../types/chat";

import { NavigationRail } from "../NavigationRail/NavigationRail";
import { ChatsSidebar } from "../ChatsSidebar/ChatsSidebar";
import { ChatPanel } from "../ChatPanel/ChatPanel";

type MessengerLayoutProps = {
  chats: Chat[];
  activeChatId: string | null;
  activeChat: Chat | null;
  onCreateChat: (chat: Chat) => void;
  onSelectChat: (chatId: string) => void;
  onSendMessage: (text: string) => void;
};

export function MessengerLayout({
  chats,
  activeChatId,
  activeChat,
  onCreateChat,
  onSelectChat,
  onSendMessage,
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
      />
    </LayoutRoot>
  );
}
