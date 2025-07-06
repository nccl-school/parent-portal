import {
  Popover,
  PopoverMenu,
  PopoverMenuItem,
  PopoverMenuItemIcon,
  PopoverMenuItemText,
  type PopoverEngine,
} from "@nccl/components";
import { useCallback, type MouseEventHandler } from "react";
import type { User } from "@nccl/api/client";

import { AdminUserPermissions } from "../admin-user-permissions";
import { AdminUserProfile } from "../admin-user-profile";

export function AdminUsersMenu({
  popover,
  user,
}: {
  user: User;
  popover: PopoverEngine;
}) {
  const handleLaunchUserPermissions = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(
    (e) => {
      AdminUserPermissions.launch(e, { user });
      popover.hide();
    },
    [popover, user]
  );

  const handleLaunchUserProfile = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(
    (e) => {
      AdminUserProfile.launch(e, { user });
      popover.hide();
    },
    [popover, user]
  );

  return (
    <Popover ref={popover.setPopover}>
      <PopoverMenu>
        <PopoverMenuItem onClick={handleLaunchUserProfile}>
          <PopoverMenuItemIcon dxIcon="user-02-stroke-standard" />
          <PopoverMenuItemText>View profile</PopoverMenuItemText>
        </PopoverMenuItem>
        <PopoverMenuItem onClick={handleLaunchUserPermissions}>
          <PopoverMenuItemIcon dxIcon="key-02-stroke-standard" />
          <PopoverMenuItemText>Change role</PopoverMenuItemText>
        </PopoverMenuItem>
      </PopoverMenu>
    </Popover>
  );
}
