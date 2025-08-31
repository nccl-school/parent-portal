import { createRouteHandle } from "../../utils/isomorphic";
import { PageHeader } from "../../components/page";
import { AccountPageSection } from "../account/AccountPageSection";
import { AccountPageSectionHeader } from "../account/AccountPageSectionHeader";

export const handle = createRouteHandle({
  mobileTitle: "Security",
});

export default function AccountSecurity() {
  return (
    <>
      <PageHeader
        dxTitle="Security"
        dxSubtitle="Manage your login, password, and other personal settings."
      />
      <AccountPageSection>
        <AccountPageSectionHeader
          dxTitle="Security"
          dxSubtitle="Manage your login, password, and other personal settings."
        />
      </AccountPageSection>
    </>
  );
}
