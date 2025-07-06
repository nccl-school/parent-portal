import type { GetRoleListResponse } from "@nccl/api/client";
import { useEffect } from "react";
import { href, useFetcher } from "react-router";

export function useGetRoles() {
  const { load, data } = useFetcher<GetRoleListResponse>();
  useEffect(() => {
    load(href("/api/role"));
  }, [load]);
  return data ?? [];
}
