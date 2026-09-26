import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0085FF",
      dark: "#0066CC",
      light: "#E9F4FF",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F3F5F7",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#17191C",
      secondary: "#737980",
    },
    divider: "#E7EAEE",
    action: {
      hover: "rgba(23, 25, 28, 0.04)",
      selected: "#E9F4FF",
    },
  },
  typography: {
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "1.75rem",
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.45,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
});
