import {
  Popover,
  PopoverMenu,
  PopoverMenuItem,
  PopoverMenuItemIcon,
  PopoverMenuItemText,
  type PopoverEngine,
} from "@nccl/components";
import { useCallback, type MouseEventHandler } from "react";

import { AdminUserPermissions } from "../admin-user-permissions";

export function AdminUsersMenu({
  popover,
  userId,
}: {
  userId: string;
  popover: PopoverEngine;
}) {
  const handleLaunchUserPermissions = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(
    (e) => {
      AdminUserPermissions.launch(e, { userId });
      popover.hide();
    },
    [popover, userId]
  );

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
