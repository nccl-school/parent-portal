import { useRouteLoaderData } from "react-router";

import type { loader } from "../root";

export function useSession() {
  const data = useRouteLoaderData<typeof loader>("root");
  if (!data) return undefined;
  return data.session;
}
