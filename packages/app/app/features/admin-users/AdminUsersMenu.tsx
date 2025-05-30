import {
  Popover,
  PopoverMenu,
  PopoverMenuItem,
  PopoverMenuItemIcon,
  PopoverMenuItemText,
  type PopoverEngine,
} from "@nccl/components";
import { useCallback, type MouseEventHandler } from "react";
import type { User } from "@clerk/react-router/ssr.server";

import { AdminUserPermissions } from "../admin-user-permissions";
import { AdminUserProfile } from "../admin-user-profile";

export function AdminUsersMenu({
  popover,
  user,
}: {
  user: Omit<User, "_raw">;
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
