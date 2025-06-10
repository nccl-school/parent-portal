import type { User } from "@clerk/react-router/ssr.server";
import { Label, type LabelVariants } from "@nccl/components";
import { match, P } from "ts-pattern";

import type { UserRole } from "../../models/user.model";
import { capitalizeFirstLetter } from "../../utils/isomorphic";

export function UserRoleBadge(user: Pick<User, "publicMetadata">) {
  const dxVariant = match<UserRole | undefined, LabelVariants>(
    user.publicMetadata.role
  )
    .with(P.nullish, () => "info")
    .with("parent", () => "primary")
    .with("staff", () => "secondary")
    .with("admin", () => "alt")
    .exhaustive();

  return (
    <Label dxVariant={dxVariant}>
      {capitalizeFirstLetter(user.publicMetadata?.role ?? "no role assigned")}
    </Label>
  );
}
