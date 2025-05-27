import { InnerPageHeader, PageSection } from "../../components/page";
import { assembleTitle } from "../../utils/util.assemble-title";

export function meta() {
  return [{ title: assembleTitle("Resources | Admin") }];
}

export default function AdminResources() {
  return (
    <>
      <InnerPageHeader dxTitle="Resources" />
      <PageSection>hello</PageSection>
    </>
  );
}
