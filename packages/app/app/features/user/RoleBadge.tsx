import { Label, type LabelVariants } from "@nccl/components";
import { match, P } from "ts-pattern";
import type { Role, Roles } from "@nccl/api/client";

import { capitalizeFirstLetter } from "../../utils/isomorphic";

export function RoleBadge({ role }: { role: Role }) {
  const dxVariant = match<Roles, LabelVariants>(role.id)
    .with(P.nullish, () => "info")
    .with("USER", () => "primary")
    .with("STAFF", () => "secondary")
    .with("ADMIN", () => "alt")
    .exhaustive();

  return (
    <Label dxVariant={dxVariant}>
      {capitalizeFirstLetter(role.label ?? "no role assigned")}
    </Label>
  );
}
