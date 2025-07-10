import type { UserStatus } from "@nccl/api/client";
import { Label, type LabelVariants } from "@nccl/components";
import { match } from "ts-pattern";

import { capitalizeFirstLetter } from "../../utils/isomorphic";

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const dxVariant = match<UserStatus, LabelVariants>(status)
    .with("ACTIVE", () => "success")
    .with("INVITED", () => "warning")
    .with("DISABLED", () => "info")
    .exhaustive();

  return (
    <Label dxVariant={dxVariant}>
      {capitalizeFirstLetter(status.toLocaleLowerCase())}
    </Label>
  );
}
