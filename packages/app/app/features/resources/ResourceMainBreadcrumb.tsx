import { css } from "@linaria/core";
import { makeColor, makeCustom, makeRem, makeResponsive } from "@nccl/theme";
import { Link } from "react-router";
import type { ReactNode } from "react";

import { BreadcrumbText } from "./ResourceMainBreadcrumbItem";

const stylesBreadcrumb = css`
  grid-area: breadcrumb;
  display: flex;
  align-items: center;

  ${makeResponsive({ to: "laptop" })} {
    padding: ${makeCustom("page--gutter-mobile")};
    background: ${makeColor("white")};
  }

  ${makeResponsive({ from: "laptop" })} {
    padding: 0 ${makeRem(32)};
    padding-bottom: ${makeRem(4)};
  }

  a {
    color: ${makeColor("neutral-light-900")} !important;
    text-decoration: none;

    &:hover {
      color: ${makeColor("neutral-dark-900")} !important;
      text-decoration: underline;
    }
    &:visited {
      color: unset;
    }
  }
`;

export function ResourceMainBreadcrumbs({ children }: { children: ReactNode }) {
  return (
    <div className={stylesBreadcrumb}>
      <nav style={{ display: "flex", gap: ".5rem" }}>
        <Link to="/resources">
          <BreadcrumbText>All Files</BreadcrumbText>
        </Link>
        {children}
      </nav>
    </div>
  );
}
