import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  SidebarRoot,
  ChatsArea,
  EmptyState,
  EmptyStateText,
  NewChatButton,
  SidebarHeader,
  SidebarTitle,
} from "./ChatsSidebar.styles";

export function ChatsSidebar() {
  return (
    <SidebarRoot component="aside" aria-labelledby="chats-sidebar-title">
      <SidebarHeader component="header">
        <SidebarTitle id="chats-sidebar-title" component="h2">
          Чаты
        </SidebarTitle>

        <NewChatButton
          type="button"
          aria-label="Создать новый чат"
          aria-disabled
          disableRipple
        >
          <AddRoundedIcon />
        </NewChatButton>
      </SidebarHeader>

      <ChatsArea>
        <EmptyState>
          <EmptyStateText>История чатов пуста</EmptyStateText>
        </EmptyState>
      </ChatsArea>
    </SidebarRoot>
  );
}
