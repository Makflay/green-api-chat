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
import type { Chat } from "../../types/chat.type";

type ChatsSidebarProps = {
  chats: Chat[];
  activeChatId: string | null;
  onCreateChat: (phone: string) => Promise<string | null>;
  onSelectChat: (chatId: string) => void;
};

export function ChatsSidebar({
  chats,
  activeChatId,
  onCreateChat,
  onSelectChat,
}: ChatsSidebarProps) {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  async function handleCreateChat(phone: string): Promise<string | null> {
    const error = await onCreateChat(phone);

    if (!error) {
      setIsNewChatOpen(false);
    }

    return error;
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
              const isActive = chat.id === activeChatId;

              return (
                <ListItem key={chat.id} disablePadding>
                  <ChatItem
                    component="button"
                    type="button"
                    selected={isActive}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => onSelectChat(chat.id)}
                    disableRipple
                  >
                    <ChatNumber component="span">{chat.phone}</ChatNumber>
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
