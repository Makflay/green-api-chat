import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

export const InputPanel = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  padding: theme.spacing(1.5, 2),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const Composer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 1, 0.75, 2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: `calc(${theme.shape.borderRadius} * 2)`,

  "&:focus-within": {
    borderColor: theme.palette.primary.main,
  },
}));

export const TextInput = styled(InputBase)(({ theme }) => ({
  ...theme.typography.body1,
  flex: 1,
  minWidth: 0,
  padding: theme.spacing(1, 0),
  color: theme.palette.text.primary,

  "& .MuiInputBase-input": {
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
}));

export const SendButton = styled(IconButton)(({ theme }) => ({
  flexShrink: 0,
  width: 40,
  height: 40,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.shortest,
  }),

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },

  "&.Mui-disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },

  "&.Mui-focusVisible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },

  "& .MuiSvgIcon-root": {
    fontSize: 22,
  },
}));

export const SendProgress = styled(CircularProgress)({
  flexShrink: 0,
});
