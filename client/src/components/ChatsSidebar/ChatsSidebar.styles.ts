import { styled } from "@mui/material/styles";

export const SidebarRoot = styled("aside")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  minHeight: 0,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
}));
