import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

export const PanelRoot = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",
  backgroundColor: "#B7DDED",
  backgroundImage:
    "linear-gradient(135deg, #B5E0E5 0%, #B7DDED 45%, #A5CEFA 100%)",
}) as typeof Box;

export const PanelContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflowY: "auto",
  padding: theme.spacing(3),
}));

export const NoChatState = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflowY: "auto",
  padding: theme.spacing(3),
  textAlign: "center",
}));

export const PanelAlert = styled(Alert)(({ theme }) => ({
  flexShrink: 0,
  minWidth: 0,
  maxHeight: "25dvh",
  overflowY: "auto",
  borderRadius: 0,
  padding: theme.spacing(0.75, 2),
  fontSize: theme.typography.body2.fontSize,

  "& .MuiAlert-message": {
    minWidth: 0,
    overflowWrap: "anywhere",
  },

  "& .MuiAlert-icon": {
    fontSize: 20,
  },
}));
