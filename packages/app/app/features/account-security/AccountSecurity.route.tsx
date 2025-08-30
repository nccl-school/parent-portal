import { createRouteHandle } from "../../utils/isomorphic";
import { InnerPageHeader, PageSection } from "../../components/page";

export const handle = createRouteHandle({
  mobileTitle: "Security",
});

export default function AccountSecurity() {
  return (
    <>
      <InnerPageHeader
        dxTitle="Security"
        dxSubtitle="Change your password, manage connected accounts, etc..."
      />
      <PageSection>stuff here</PageSection>
    </>
  );
}
