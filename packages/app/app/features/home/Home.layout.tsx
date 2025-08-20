import { Outlet } from "react-router";

import { PageContainer } from "../..//components/page/PageContainer";
import { PageHeader } from "../../components/page";
import { useUser } from "../../hooks/hook.useUser";

export function getGreetingBanner(): string {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomeLayout() {
  const user = useUser();

  return (
    <PageContainer dxVariant="scrollable">
      <PageHeader dxTitle={`${getGreetingBanner()}, ${user?.firstName}`} />
      <Outlet />
    </PageContainer>
  );
}
