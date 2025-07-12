import { Header, HeaderActions, HeaderActionsItem } from "@nccl/components";

import { RootHeaderUser } from "./RootHeaderUser";

export function RootHeader() {
  return (
    <Header>
      <HeaderActions>
        <HeaderActionsItem>
          <RootHeaderUser />
        </HeaderActionsItem>
      </HeaderActions>
    </Header>
  );
}
