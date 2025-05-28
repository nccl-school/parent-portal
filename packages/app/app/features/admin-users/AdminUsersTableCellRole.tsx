import type { User } from "@clerk/react-router/ssr.server";
import { Label, type LabelVariants } from "@nccl/components";
import { match, P } from "ts-pattern";

import type { Roles } from "../../global";

export function AdminUsersTableCellRole(user: Pick<User, "publicMetadata">) {
  const dxVariant = match<Roles | undefined, LabelVariants>(
    user.publicMetadata.role
  )
    .with(P.nullish, () => "info")
    .with("teacher", () => "primary")
    .with("admin", () => "secondary")
    .with("parent", () => "tertiary")
    .exhaustive();

  return (
    <Label dxVariant={dxVariant}>
      {user.publicMetadata?.role ?? "No Role Assigned"}
    </Label>
  );
}
