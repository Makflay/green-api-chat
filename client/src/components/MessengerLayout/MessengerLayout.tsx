import { NavigationRail } from "../NavigationRail/NavigationRail";
import { ChatsSidebar } from "../ChatsSidebar/ChatsSidebar";
import { ChatPanel } from "../ChatPanel/ChatPanel";
import { LayoutRoot } from "./MessengerLayout.styles";

export function MessengerLayout() {
  return (
    <LayoutRoot>
      <NavigationRail />
      <ChatsSidebar />
      <ChatPanel />
    </LayoutRoot>
  );
}
