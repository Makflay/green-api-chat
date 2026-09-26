import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";

export const SidebarRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
})) as typeof Box;

export const SidebarHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  minHeight: 72,
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
})) as typeof Box;

export const SidebarTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  color: theme.palette.text.primary,
})) as typeof Typography;

export const NewChatButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.shortest,
  }),

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },

  "&.Mui-focusVisible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 3,
  },

  "& .MuiSvgIcon-root": {
    fontSize: 26,
  },

  "&.Mui-disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

export const ChatsArea = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
});

export const EmptyState = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  padding: theme.spacing(3),
  textAlign: "center",
}));

export const EmptyStateText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

export const ChatList = styled(List)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

export const ChatItem = styled(ListItemButton)(({ theme }) => ({
  width: "100%",
  minWidth: 0,
  textAlign: "left",
  minHeight: 72,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },

  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
  },

  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.action.selected,
  },

  "&.Mui-focusVisible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2,
  },
})) as typeof ListItemButton;

export const ChatNumber = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  fontWeight: theme.typography.fontWeightBold,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
})) as typeof Typography;
