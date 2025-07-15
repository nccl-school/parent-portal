import { forwardRef, type JSX } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { Icon, Typography } from "@nccl/components";
import { makeFontWeight, makeRem } from "@nccl/theme";
import type { Role } from "@nccl/api/client";

import { RoleBadge, roleIcon } from "./index";

export type RoleCardPropsNative = JSX.IntrinsicElements["div"];
export type RoleCardPropsCustom = { userRole: Role };
export type RoleCardProps = RoleCardPropsNative & RoleCardPropsCustom;

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

export const RoleCard = forwardRef<HTMLDivElement, RoleCardProps>(
  function RoleCard({ children, className, userRole, ...restProps }, ref) {
    return (
      <div {...restProps} className={classes(className, styles)} ref={ref}>
        <Icon dxIcon={roleIcon[userRole.id]} dxSize={32} className="icon" />
        <div className="title">
          <Typography dxVariant="body1" dxNode="div" className="title">
            {userRole.label}
          </Typography>
          <RoleBadge role={userRole} />
        </div>
        <Typography className="description" dxVariant="label" dxNode="div">
          {userRole.description}
        </Typography>
      </div>
    );
  }
);
