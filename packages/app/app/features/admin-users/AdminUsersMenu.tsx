import {
  Popover,
  PopoverMenu,
  PopoverMenuItem,
  PopoverMenuItemAction,
  PopoverMenuItemIcon,
  PopoverMenuItemText,
  type PopoverEngine,
} from "@nccl/components";
import { useCallback, useEffect, type MouseEventHandler } from "react";
import type { User } from "@nccl/api/client";
import { href, useFetcher } from "react-router";

import { AdminUserPermissions } from "../admin-user-permissions";
import { AdminUserProfile } from "../admin-user-profile";

export function AdminUsersMenu({
  popover,
  user,
}: {
  user: User;
  popover: PopoverEngine;
}) {
  const fetcher = useFetcher();

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

  useEffect(() => {
    if (!fetcher.data) return;
    console.log(fetcher.data);
  }, [fetcher.data]);

  return (
    <Popover ref={popover.setPopover}>
      <PopoverMenu>
        <PopoverMenuItem>
          <PopoverMenuItemAction onClick={handleLaunchUserProfile}>
            <PopoverMenuItemIcon dxIcon="user-02-stroke-standard" />
            <PopoverMenuItemText>View profile</PopoverMenuItemText>
          </PopoverMenuItemAction>
        </PopoverMenuItem>

        <PopoverMenuItem>
          <PopoverMenuItemAction onClick={handleLaunchUserPermissions}>
            <PopoverMenuItemIcon dxIcon="key-02-stroke-standard" />
            <PopoverMenuItemText>Change role</PopoverMenuItemText>
          </PopoverMenuItemAction>
        </PopoverMenuItem>

        {user.invitationId && user.status === "INVITED" && (
          <PopoverMenuItem>
            <fetcher.Form
              action={href("/api/user/resend-invite/:id", { id: user.id })}
            >
              <PopoverMenuItemAction type="submit">
                <PopoverMenuItemIcon dxIcon="refresh-stroke-standard" />
                <PopoverMenuItemText>
                  {fetcher.state !== "idle"
                    ? "Resending..."
                    : "Resend invitation"}
                </PopoverMenuItemText>
              </PopoverMenuItemAction>
            </fetcher.Form>
          </PopoverMenuItem>
        )}
      </PopoverMenu>
    </Popover>
  );
}
