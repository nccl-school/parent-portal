import { css } from "@linaria/core";
import { Icon, Typography, type IconProps } from "@nccl/components";
import { makeColor, makeRem, makeReset } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { type MouseEventHandler } from "react";

const styles = css`
  ${makeReset("button")};
  text-align: left;
  cursor: pointer;

  display: grid;
  grid-template-columns: ${makeRem(20)} 1fr;
  align-items: center;
  width: 100%;
  gap: ${makeRem(12)};
  height: ${makeRem(36)};

  &.active {
  }

  &:visited {
    color: unset;
    text-decoration: unset;
  }
  padding: 0 ${makeRem(12)};
  background: transparent;
  border-radius: ${makeRem(8)};

  &:hover,
  &.active {
    background: ${makeColor("tertiary-50", { opacity: 0.4 })};
  }
`;

export function FolderTreeNode({
  dxIcon,
  dxColor,
  children,
  onClick,
  isActive,
}: Pick<IconProps, "dxIcon" | "dxColor"> & {
  children: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className={classes(styles, { active: isActive })} onClick={onClick}>
      <Icon dxIcon={dxIcon} dxColor={dxColor} dxSize={20} />
      <Typography dxNode="div" dxVariant="body3">
        {children}
      </Typography>
    </button>
  );
}
