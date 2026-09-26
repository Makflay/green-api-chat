import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

export const Screen = styled("main")(({ theme }) => ({
  minHeight: "100dvh",
  display: "grid",
  placeItems: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

export const Card = styled("section")(({ theme }) => ({
  width: "100%",
  maxWidth: 420,
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 20px rgba(23, 25, 28, 0.04)",

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

export const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const Field = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.paper,

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.divider,
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.secondary,
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },

    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.error.main,
    },

    "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.divider,
    },
  },

  "& .MuiFormHelperText-root": {
    minHeight: "3em",
    lineHeight: 1.5,
    overflowWrap: "anywhere",
  },
}));

export const ConnectButton = styled(Button)(({ theme }) => ({
  minHeight: 48,
  marginTop: theme.spacing(1),
  fontSize: theme.typography.body1.fontSize,
  textTransform: "none",
  position: "relative",
}));

export const ConnectLabel = styled("span", {
  shouldForwardProp: (prop) => prop !== "$loading",
})<{ $loading: boolean }>(({ $loading }) => ({
  visibility: $loading ? "hidden" : "visible",
}));

export const ConnectProgress = styled(CircularProgress)({
  position: "absolute",
});
