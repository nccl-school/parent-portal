import { Outlet } from "react-router";
import { useUser } from "@clerk/react-router";

import { PageContainer } from "../..//components/page/PageContainer";
import { PageHeader } from "../../components/page";

export function getGreetingBanner(): string {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomeLayout() {
  const { user } = useUser();

  if (!user) return;

  return (
    <PageContainer dxVariant="scrollable">
      <PageHeader dxTitle={`${getGreetingBanner()}, ${user.firstName}`} />
      <Outlet />
    </PageContainer>
  );
}
