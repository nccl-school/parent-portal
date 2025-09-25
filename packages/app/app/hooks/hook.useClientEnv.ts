import { useRouteLoaderData } from "react-router";

import type { loader } from "../root.js";

export function useClientEnv() {
  const data = useRouteLoaderData<typeof loader>("root");
  if (!data) return undefined;
  return data.ENV;
}
