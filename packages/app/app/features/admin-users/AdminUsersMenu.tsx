import {
  Popover,
  PopoverMenu,
  PopoverMenuItem,
  PopoverMenuItemIcon,
  PopoverMenuItemText,
  type PopoverEngine,
} from "@nccl/components";
import { useCallback, type MouseEventHandler } from "react";

export function AdminUsersMenu({
  popover,
  userId,
  launchUserPermission,
}: {
  userId: string;
  popover: PopoverEngine;
  launchUserPermission: (userId: string) => void;
}) {
  const handleLaunchUserPermissions = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    launchUserPermission(userId);
    popover.hide();
  }, [launchUserPermission, popover, userId]);

  return (
    <Popover ref={popover.setPopover}>
      <PopoverMenu>
        <PopoverMenuItem>
          <PopoverMenuItemIcon dxIcon="user-02-stroke-standard" />
          <PopoverMenuItemText>View Profile</PopoverMenuItemText>
        </PopoverMenuItem>
        <PopoverMenuItem onClick={handleLaunchUserPermissions}>
          <PopoverMenuItemIcon dxIcon="key-02-stroke-standard" />
          <PopoverMenuItemText>Change Permission</PopoverMenuItemText>
        </PopoverMenuItem>
      </PopoverMenu>
    </Popover>
  );
}
