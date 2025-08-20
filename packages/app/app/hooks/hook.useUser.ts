import type { loader } from "app/features/app-root/AppRoot.layout";
import { useRouteLoaderData } from "react-router";

export function useUser() {
  const data = useRouteLoaderData<typeof loader>("AppRoot.layout");
  if (!data) return undefined;
  return data.currentUser;
}
