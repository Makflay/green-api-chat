import { LayoutRoot } from "./MessengerLayout.styles";
import { NavigationRail } from "../NavigationRail/NavigationRail";
import { ChatsSidebar } from "../ChatsSidebar/ChatsSidebar";
import { ChatPanel } from "../ChatPanel/ChatPanel";
import type { LocalChat } from "../NewChatForm/NewChatForm";

type MessengerLayoutProps = {
  chats: LocalChat[];
  activePhoneNumber: string | null;
  onCreateChat: (chat: LocalChat) => void;
  onSelectChat: (phoneNumber: string) => void;
};

export function MessengerLayout({
  chats,
  activePhoneNumber,
  onCreateChat,
  onSelectChat,
}: MessengerLayoutProps) {
  return (
    <LayoutRoot>
      <NavigationRail />
      <ChatsSidebar
        chats={chats}
        activePhoneNumber={activePhoneNumber}
        onCreateChat={onCreateChat}
        onSelectChat={onSelectChat}
      />
      <ChatPanel />
    </LayoutRoot>
  );
}
