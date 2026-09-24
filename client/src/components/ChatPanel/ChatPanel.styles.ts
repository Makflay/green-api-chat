import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const PanelRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
  backgroundColor: theme.palette.primary.light,
})) as typeof Box;

export const PanelContent = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflowY: "auto",
  padding: theme.spacing(3),
}));
