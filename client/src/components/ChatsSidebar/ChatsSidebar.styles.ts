import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
