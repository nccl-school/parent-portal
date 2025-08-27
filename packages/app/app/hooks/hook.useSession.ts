import { useRouteLoaderData } from "react-router";
import type { loader } from "app/features/app-root/AppRoot.layout";

export function useSession() {
  const data = useRouteLoaderData<typeof loader>("AppRoot.layout");
  if (!data) return undefined;
  return data.session;
}
