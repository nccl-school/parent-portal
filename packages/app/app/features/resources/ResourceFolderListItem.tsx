import { css } from "@linaria/core";
import { Icon, Typography, type IconProps } from "@nccl/components";
import { makeColor, makeRem, makeReset } from "@nccl/theme";
import { NavLink, type NavLinkProps } from "react-router";

const itemStyles = css`
  ${makeReset("anchor")};

  display: grid;
  grid-template-columns: ${makeRem(20)} 1fr;
  align-items: center;
  width: 100%;
  gap: ${makeRem(12)};
  height: ${makeRem(36)};

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

export function ResourceFolderListItem({
  dxIcon,
  to,
  end,
  dxColor,
  children,
}: Pick<IconProps, "dxIcon" | "dxColor"> &
  Pick<NavLinkProps, "end" | "to"> & { children: string }) {
  return (
    <NavLink className={itemStyles} to={to} end={end}>
      <Icon dxIcon={dxIcon} dxColor={dxColor} dxSize={20} />
      <Typography dxNode="div" dxVariant="body3">
        {children}
      </Typography>
    </NavLink>
  );
}
