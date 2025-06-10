import { forwardRef, type JSX } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { Icon, Typography } from "@nccl/components";
import { makeFontWeight, makeRem } from "@nccl/theme";

import type { UserRole } from "../../models/user.model";

import { UserRoleBadge, type UserRoleDefinition } from "./index";

export type UserPermissionCardPropsNative = JSX.IntrinsicElements["div"];
export type UserPermissionCardPropsCustom = UserRoleDefinition & {
  role?: UserRole;
};
export type UserPermissionCardProps = UserPermissionCardPropsNative &
  UserPermissionCardPropsCustom;

const styles = css`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "icon title"
    "icon description";
  column-gap: ${makeRem(12)};

  .icon {
    grid-area: icon;
  }
  .title {
    font-weight: ${makeFontWeight("body-bold")};
    grid-area: title;
    display: flex;
    justify-content: space-between;
    gap: ${makeRem(4)};
  }
  .description {
    grid-area: description;
    font-weight: ${makeFontWeight("body-regular")};
  }
`;

export const UserPermissionCard = forwardRef<
  HTMLDivElement,
  UserPermissionCardProps
>(function UserPermissionCard(
  { children, className, icon, description, title, role, ...restProps },
  ref
) {
  return (
    <div {...restProps} className={classes(className, styles)} ref={ref}>
      <Icon dxIcon={icon} dxSize={32} className="icon" />
      <div className="title">
        <Typography dxVariant="body1" dxNode="div" className="title">
          {title}
        </Typography>
        <UserRoleBadge publicMetadata={{ role }} />
      </div>
      <Typography className="description" dxVariant="label" dxNode="div">
        {description}
      </Typography>
    </div>
  );
});
