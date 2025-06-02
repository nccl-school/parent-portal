import { forwardRef, type JSX } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { Icon, Typography } from "@nccl/components";
import { makeFontWeight, makeRem } from "@nccl/theme";

import { UserRoleBadge, type UserRoleDefinition } from "../user";
import type { Roles } from "../../global";

export type AdminUserPermissionCardPropsNative = JSX.IntrinsicElements["div"];
export type AdminUserPermissionCardPropsCustom = UserRoleDefinition & {
  role?: Roles;
};
export type AdminUserPermissionCardProps = AdminUserPermissionCardPropsNative &
  AdminUserPermissionCardPropsCustom;

const styles = css`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "icon title"
    "icon description";
  column-gap: ${makeRem(12)};
  row-gap: ${makeRem(4)};

  .icon {
    grid-area: icon;
  }
  .title {
    font-weight: ${makeFontWeight("body-semiBold")};
    grid-area: title;
    display: flex;
    justify-content: space-between;
    gap: ${makeRem(4)};
  }
  .description {
    grid-area: description;
  }
`;

export const AdminUserPermissionCard = forwardRef<
  HTMLDivElement,
  AdminUserPermissionCardProps
>(function AdminUserPermissionCard(
  { children, className, icon, description, title, role, ...restProps },
  ref
) {
  return (
    <div {...restProps} className={classes(className, styles)} ref={ref}>
      <Icon dxIcon={icon} dxSize={32} className="icon" />
      <div className="title">
        <Typography dxVariant="heading4" dxNode="div" className="title">
          {title}
        </Typography>
        <UserRoleBadge publicMetadata={{ role }} />
      </div>
      <Typography className="description" dxVariant="body1" dxNode="div">
        {description}
      </Typography>
    </div>
  );
});
