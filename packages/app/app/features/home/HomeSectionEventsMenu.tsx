import {
  Button,
  Popover,
  PopoverMenu,
  PopoverMenuItem,
  PopoverMenuItemAction,
  PopoverMenuItemIcon,
  PopoverMenuItemText,
  usePopover,
} from "@nccl/components";
import { href, Link } from "react-router";

export function HomeSectionEventsMenu() {
  const { setPopover, setTarget, toggle } = usePopover({
    offset: 8,
    position: "bottom-span-left",
  });

  return (
    <>
      <Button
        dxIcon="more-01-solid-standard"
        dxVariant="icon"
        dxColor="neutral-light-900"
        onClick={toggle}
        ref={setTarget}
        dxSize="md"
      />
      <Popover ref={setPopover}>
        <PopoverMenu>
          <PopoverMenuItem>
            <Link to={href("/calendar")}>
              <PopoverMenuItemAction>
                <PopoverMenuItemIcon dxIcon="view-stroke-rounded" />
                <PopoverMenuItemText>View all events</PopoverMenuItemText>
              </PopoverMenuItemAction>
            </Link>
          </PopoverMenuItem>
        </PopoverMenu>
      </Popover>
    </>
  );
}
