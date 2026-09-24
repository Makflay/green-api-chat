import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ListItem from "@mui/material/ListItem";
import {
  RailRoot,
  BottomList,
  BrandMark,
  ItemLabel,
  NavigationList,
  RailItem,
} from "./NavigationRail.styles";

export function NavigationRail() {
  return (
    <RailRoot component="nav" aria-label="Основная навигация">
      <BrandMark role="img" aria-label="Green API Chat">
        <ChatBubbleRoundedIcon />
      </BrandMark>

      <NavigationList>
        <ListItem disablePadding>
          <RailItem
            component="button"
            type="button"
            selected
            aria-current="page"
            disableRipple
          >
            <ForumRoundedIcon />
            <ItemLabel component="span">Chats</ItemLabel>
          </RailItem>
        </ListItem>

        <ListItem disablePadding>
          <RailItem
            component="button"
            type="button"
            aria-disabled
            disableRipple
          >
            <PeopleAltRoundedIcon />
            <ItemLabel component="span">Contacts</ItemLabel>
          </RailItem>
        </ListItem>

        <ListItem disablePadding>
          <RailItem
            component="button"
            type="button"
            aria-disabled
            disableRipple
          >
            <CallRoundedIcon />
            <ItemLabel component="span">Calls</ItemLabel>
          </RailItem>
        </ListItem>
      </NavigationList>

      <BottomList>
        <ListItem disablePadding>
          <RailItem
            component="button"
            type="button"
            aria-disabled
            disableRipple
          >
            <SettingsRoundedIcon />
            <ItemLabel component="span">Settings</ItemLabel>
          </RailItem>
        </ListItem>
      </BottomList>
    </RailRoot>
  );
}
