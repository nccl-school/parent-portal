import type { User } from "@clerk/react-router/ssr.server";
import { Button } from "@nccl/components";

export function AdminUsersTableCellMenu(user: Pick<User, "id">) {
  console.log(user);
  return (
    <Button
      dxVariant="icon"
      dxIcon="more-vertical-circle-01-solid-standard"
      dxSize="md"
    />
  );
}
