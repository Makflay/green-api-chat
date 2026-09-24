import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const FormDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: "none",
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
}));

export const FormActions = styled(DialogActions)(({ theme }) => ({
  gap: theme.spacing(1),
  padding: theme.spacing(1, 3, 3),
}));

export const CreateButton = styled(Button)({
  minHeight: 40,
});
