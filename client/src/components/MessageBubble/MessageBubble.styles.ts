import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import type { MessageDirection } from "../../types/chat";

type DirectionProps = {
  direction: MessageDirection;
};

export const MessageRow = styled("li", {
  shouldForwardProp: (prop) => prop !== "direction",
})<DirectionProps>(({ direction }) => ({
  display: "flex",
  justifyContent: direction === "outgoing" ? "flex-end" : "flex-start",
  minWidth: 0,
}));

export const Bubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "direction",
})<DirectionProps>(({ theme, direction }) => ({
  minWidth: 0,
  maxWidth: "min(75%, 560px)",
  padding: theme.spacing(1, 1.5),
  backgroundColor:
    direction === "outgoing" ? "#D9F2FF" : theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  borderBottomLeftRadius:
    direction === "incoming" ? 4 : theme.shape.borderRadius,
  borderBottomRightRadius:
    direction === "outgoing" ? 4 : theme.shape.borderRadius,
}));

export const MessageText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
}));
