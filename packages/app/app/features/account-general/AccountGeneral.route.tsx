import { createRouteHandle } from "../../utils/isomorphic";
import { InnerPageHeader, PageSection } from "../../components/page";

export const handle = createRouteHandle({
  mobileTitle: "General",
});

export default function AccountGeneral() {
  return (
    <>
      <InnerPageHeader
        dxTitle="General"
        dxSubtitle="Change your picture, update your bio, etc.."
      />
      <PageSection>stuff here</PageSection>
    </>
  );
}
