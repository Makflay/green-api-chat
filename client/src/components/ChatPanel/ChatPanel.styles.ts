import { styled } from "@mui/material/styles";

export const PanelRoot = styled("main")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.light,
}));
