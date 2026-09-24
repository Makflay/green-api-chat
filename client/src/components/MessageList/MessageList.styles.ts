import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const ListViewport = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflowY: "auto",
  padding: theme.spacing(3),
}));

export const Messages = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  gap: theme.spacing(1),
  margin: 0,
  padding: 0,
  listStyle: "none",
}));

export const EmptyState = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  padding: theme.spacing(2),
  textAlign: "center",
}));

export const EmptyStateText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
