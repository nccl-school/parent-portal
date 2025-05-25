import { PageSection } from "../../components/page";
import { assembleTitle } from "../../utils/util.assemble-title";

export function meta() {
  return [
    { title: assembleTitle("Admin") },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminRoute() {
  return <PageSection>content</PageSection>;
}
