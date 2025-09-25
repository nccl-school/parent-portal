import { useRouteLoaderData } from "react-router";

import type { loader } from "../features/app-root/AppRoot.layout";

export function useSession() {
  const data = useRouteLoaderData<typeof loader>(
    "features/app-root/AppRoot.layout"
  );
  if (!data) return undefined;
  return data.session;
}
