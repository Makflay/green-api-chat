import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const PanelRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.light,
})) as typeof Box;
