import {
  Popover,
  PopoverMenu,
  PopoverMenuItem,
  PopoverMenuItemIcon,
  PopoverMenuItemText,
  type PopoverEngine,
} from "@nccl/components";
import { useCallback } from "react";

export function AdminUsersMenu({
  popover,
  userId,
  launchUserProfile,
  launchUserPermissions,
}: {
  userId: string;
  popover: PopoverEngine;
  launchUserProfile: (userId: string) => void;
  launchUserPermissions: (userId: string) => void;
}) {
  const handleLaunchUserProfile = useCallback(() => {
    launchUserProfile(userId);
    popover.hide();
  }, [launchUserProfile, popover, userId]);

  const handleLaunchUserPermissions = useCallback(() => {
    launchUserPermissions(userId);
    popover.hide();
  }, [launchUserPermissions, popover, userId]);

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
