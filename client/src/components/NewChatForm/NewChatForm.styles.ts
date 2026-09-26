import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

export const FormDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: "none",
    marginTop: theme.spacing(6),
    maxHeight: `calc(100dvh - ${theme.spacing(8)})`,
  },

  "& .MuiDialog-container": {
    alignItems: "flex-start",
  },
}));

export const FormRoot = styled("form")({
  display: "flex",
  flexDirection: "column",
});

export const FormTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(3, 3, 2),
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.fontWeightBold,
}));

export const FormContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(1, 3, 2),
  "& .MuiFormHelperText-root": {
    minHeight: "4.5em",
    lineHeight: 1.5,
    overflowWrap: "anywhere",
  },
}));

export const FormActions = styled(DialogActions)(({ theme }) => ({
  gap: theme.spacing(1),
  padding: theme.spacing(1, 3, 3),
}));

export const CreateButton = styled(Button)({
  minHeight: 40,
  position: "relative",
});

export const CreateLabel = styled("span", {
  shouldForwardProp: (prop) => prop !== "$loading",
})<{ $loading: boolean }>(({ $loading }) => ({
  visibility: $loading ? "hidden" : "visible",
}));

export const CreateProgress = styled(CircularProgress)({
  position: "absolute",
});
