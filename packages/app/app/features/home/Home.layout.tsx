import { Outlet } from "react-router";

import type { Route } from "./+types/Home.layout";

import { ensureSession } from "../../utils/server";
import { PageContainer } from "../..//components/page/PageContainer";
import { PageHeader } from "../../components/page";
import { useUser } from "../../hooks/hook.useUser";

export function getGreetingBanner(): string {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export async function loader(args: Route.LoaderArgs) {
  await ensureSession(args);
}

export default function HomeLayout() {
  const user = useUser();

  if (!user) return;

  return (
    <PageContainer dxVariant="scrollable">
      <PageHeader dxTitle={`${getGreetingBanner()}, ${user.firstName}`} />
      <Outlet />
    </PageContainer>
  );
}
