import { Header, HeaderActions, HeaderActionsItem } from "@nccl/components";

import { AppRootHeaderUser } from "./AppRootHeaderUser";

export function RootHeader() {
  return (
    <Header>
      <HeaderActions>
        <HeaderActionsItem>
          <AppRootHeaderUser />
        </HeaderActionsItem>
      </HeaderActions>
    </Header>
  );
}
