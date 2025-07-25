import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { Link } from "react-router";
import type { ReactNode } from "react";

import { BreadcrumbText } from "./ResourcesBreadcrumb";

const stylesBreadcrumb = css`
  grid-area: breadcrumb;
  display: flex;
  align-items: center;
  padding: 0 ${makeRem(32)};
  padding-bottom: ${makeRem(4)};

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
