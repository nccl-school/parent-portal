import type { GetResourceBreadcrumbResponse } from "@nccl/api/client";
import { Typography } from "@nccl/components";
import type { ReactNode } from "react";
import { href, NavLink } from "react-router";

export function BreadcrumbText({ children }: { children: ReactNode }) {
  return (
    <Typography dxVariant="label" dxNode="span">
      {children}
    </Typography>
  );
}

export function ResourcesBreadcrumbDelimiter() {
  return <BreadcrumbText>/</BreadcrumbText>;
}

export function ResourcesBreadcrumb({
  breadcrumb,
  relPath,
  isLast,
}: {
  breadcrumb: GetResourceBreadcrumbResponse[0];
  relPath: string;
  isLast: boolean;
}) {
  if (isLast) {
    return <BreadcrumbText>{breadcrumb.name}</BreadcrumbText>;
  }
  return (
    <NavLink key={breadcrumb.id} to={href("/resources/*", { "*": relPath })}>
      <BreadcrumbText>{breadcrumb.name}</BreadcrumbText>
    </NavLink>
  );
}
