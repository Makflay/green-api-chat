import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const RailRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: 0,
  minHeight: 0,
  overflowY: "auto",
  padding: theme.spacing(2, 1),
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
})) as typeof Box;

export const BrandMark = styled(Box)(({ theme }) => ({
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
  width: 40,
  height: 40,
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,

  "& .MuiSvgIcon-root": {
    fontSize: 26,
  },
})) as typeof Box;

export const NavigationList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  width: "100%",
  padding: 0,
  flexShrink: 0,
})) as typeof List;

export const BottomList = styled(NavigationList)(({ theme }) => ({
  marginTop: "auto",
  paddingTop: theme.spacing(2),
})) as typeof NavigationList;

export const RailItem = styled(ListItemButton)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  flexShrink: 0,
  gap: theme.spacing(0.5),
  minHeight: 64,
  padding: theme.spacing(1, 0.5),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(["background-color", "color"], {
    duration: theme.transitions.duration.shortest,
  }),

  "& .MuiSvgIcon-root": {
    fontSize: 26,
  },

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },

  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.main,
  },

  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.main,
  },

  "&.Mui-focusVisible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2,
  },

  '&[aria-disabled="true"]': {
    cursor: "default",
  },

  '&[aria-disabled="true"]:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.secondary,
  },
})) as typeof ListItemButton;

export const ItemLabel = styled(Typography)({
  fontSize: "0.75rem",
  lineHeight: 1.3,
  fontWeight: 400,
}) as typeof Typography;
