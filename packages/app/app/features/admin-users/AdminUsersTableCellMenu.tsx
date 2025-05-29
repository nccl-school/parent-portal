import type { User } from "@clerk/react-router/ssr.server";
import { Button, usePopover } from "@nccl/components";

import { AdminUsersMenu } from "./AdminUsersMenu";

export function AdminUsersTableCellMenu({
  id,
  launchUserPermissions,
  launchUserProfile,
}: Pick<User, "id"> & {
  launchUserPermissions: (userId: string) => void;
  launchUserProfile: (userId: string) => void;
}) {
  const popover = usePopover({ offset: 12, position: "bottom-span-left" });

  return (
    <>
      <Button
        dxVariant="icon"
        dxIcon="more-vertical-circle-01-solid-standard"
        dxSize="md"
        ref={popover.setPopoverTarget}
        onClick={popover.show}
      />
      <AdminUsersMenu
        popover={popover}
        userId={id}
        launchUserPermissions={launchUserPermissions}
        launchUserProfile={launchUserProfile}
      />
    </>
  );
}
