import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ListItem from "@mui/material/ListItem";
import {
  SidebarRoot,
  ChatsArea,
  EmptyState,
  EmptyStateText,
  NewChatButton,
  SidebarHeader,
  SidebarTitle,
  ChatItem,
  ChatList,
  ChatNumber,
} from "./ChatsSidebar.styles";
import { NewChatForm } from "../NewChatForm/NewChatForm";
import type { LocalChat } from "../NewChatForm/NewChatForm";

type ChatsSidebarProps = {
  chats: LocalChat[];
  activePhoneNumber: string | null;
  onCreateChat: (chat: LocalChat) => void;
  onSelectChat: (phoneNumber: string) => void;
};

export function ChatsSidebar({
  chats,
  activePhoneNumber,
  onCreateChat,
  onSelectChat,
}: ChatsSidebarProps) {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  function handleCreateChat(chat: LocalChat) {
    onCreateChat(chat);
    setIsNewChatOpen(false);
  }

  return (
    <SidebarRoot component="aside" aria-labelledby="chats-sidebar-title">
      <SidebarHeader component="header">
        <SidebarTitle id="chats-sidebar-title" component="h2">
          Чаты
        </SidebarTitle>

        <NewChatButton
          type="button"
          aria-label="Создать новый чат"
          disableRipple
          aria-haspopup="dialog"
          onClick={() => setIsNewChatOpen(true)}
        >
          <AddRoundedIcon />
        </NewChatButton>
      </SidebarHeader>

      <ChatsArea>
        {chats.length === 0 ? (
          <EmptyState>
            <EmptyStateText>История чатов пуста</EmptyStateText>
          </EmptyState>
        ) : (
          <ChatList aria-label="Список чатов">
            {chats.map((chat) => {
              const isActive = chat.phoneNumber === activePhoneNumber;

              return (
                <ListItem key={chat.phoneNumber} disablePadding>
                  <ChatItem
                    component="button"
                    type="button"
                    selected={isActive}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => onSelectChat(chat.phoneNumber)}
                    disableRipple
                  >
                    <ChatNumber component="span">{chat.phoneNumber}</ChatNumber>
                  </ChatItem>
                </ListItem>
              );
            })}
          </ChatList>
        )}
      </ChatsArea>

      {isNewChatOpen && (
        <NewChatForm
          onCreate={handleCreateChat}
          onClose={() => setIsNewChatOpen(false)}
        />
      )}
    </SidebarRoot>
  );
}
