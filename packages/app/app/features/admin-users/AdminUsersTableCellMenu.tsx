import { Button, usePopover } from "@nccl/components";
import { useCallback, useRef, type RefCallback } from "react";
import type { UserWithRole } from "@nccl/api/client";

import { AdminUsersMenu } from "./AdminUsersMenu";

export function AdminUsersTableCellMenu(user: UserWithRole) {
  const popover = usePopover({ offset: 12, position: "bottom-span-left" });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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
      <AdminUsersMenu popover={popover} user={user} />
    </>
  );
}
