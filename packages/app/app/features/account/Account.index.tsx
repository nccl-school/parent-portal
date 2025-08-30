import { AccountNav } from "./AccountNav";

import { createRouteHandle } from "../../utils/isomorphic";

export const handle = createRouteHandle({
  mobileTitle: "Account",
});

export default function AccountIndex() {
  return <AccountNav />;
}
