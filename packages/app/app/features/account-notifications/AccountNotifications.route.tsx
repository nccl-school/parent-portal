import { PageHeader } from "../../components/page";
import { createRouteHandle } from "../../utils/isomorphic";
import { AccountPageSection } from "../account/AccountPageSection";
import { AccountPageSectionHeader } from "../account/AccountPageSectionHeader";

export const handle = createRouteHandle({
  mobileTitle: "Notifications",
});

export default function AccountNotifications() {
  return (
    <>
      <PageHeader
        dxTitle="Notifications"
        dxSubtitle="Manage how and when you're alerted for activities"
      />
      <AccountPageSection>
        <AccountPageSectionHeader
          dxTitle="Coming soon!"
          dxSubtitle="This is currently in the works!"
        />
      </AccountPageSection>
    </>
  );
}
