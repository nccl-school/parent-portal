import type { User } from "@clerk/react-router/ssr.server";
import { Button, usePopover } from "@nccl/components";
import { useCallback, useRef, type RefCallback } from "react";
import { useFetcher } from "react-router";

import { AdminUsersMenu } from "./AdminUsersMenu";

import { adminUserPermissions } from "../admin-user-permissions";

export function AdminUsersTableCellMenu({ id }: Pick<User, "id"> & {}) {
  const popover = usePopover({ offset: 12, position: "bottom-span-left" });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const fetcher = useFetcher();

  const launchUserPermission = useCallback<(userId: string) => void>(
    (userId) => {
      if (!buttonRef.current) return;
      adminUserPermissions.launch(buttonRef.current, { userId, fetcher });
    },
    [fetcher]
  );

  const onButtonMount = useCallback<RefCallback<HTMLButtonElement>>(
    (node) => {
      popover.setPopoverTarget(node);
      buttonRef.current = node;
    },
    [popover]
  );

  return (
    <>
      <Button
        dxVariant="icon"
        dxIcon="more-vertical-circle-01-solid-standard"
        dxSize="md"
        ref={onButtonMount}
        onClick={popover.show}
      />
      <AdminUsersMenu
        popover={popover}
        userId={id}
        launchUserPermission={launchUserPermission}
      />
    </>
  );
}
