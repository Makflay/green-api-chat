import { LayoutRoot } from "./MessengerLayout.styles";
import { NavigationRail } from "../NavigationRail/NavigationRail";
import { ChatsSidebar } from "../ChatsSidebar/ChatsSidebar";
import { ChatPanel } from "../ChatPanel/ChatPanel";
import type { Chat } from "../../types/chat";

type MessengerLayoutProps = {
  chats: Chat[];
  activeChatId: string | null;
  onCreateChat: (chat: Chat) => void;
  onSelectChat: (chatId: string) => void;
};

export function MessengerLayout({
  chats,
  activeChatId,
  onCreateChat,
  onSelectChat,
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
      <ChatPanel />
    </LayoutRoot>
  );
}
