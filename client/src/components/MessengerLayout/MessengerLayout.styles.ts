import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const LayoutRoot = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "80px 360px minmax(0, 1fr)",
  width: "100%",
  minWidth: 760,
  height: "100dvh",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "80px 400px minmax(0, 1fr)",
  },
}));
