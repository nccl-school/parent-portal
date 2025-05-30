import type { User } from "@clerk/react-router/ssr.server";
import { Button, usePopover } from "@nccl/components";
import { useCallback, useRef, type RefCallback } from "react";

import { AdminUsersMenu } from "./AdminUsersMenu";

export function AdminUsersTableCellMenu(user: Omit<User, "_raw">) {
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
