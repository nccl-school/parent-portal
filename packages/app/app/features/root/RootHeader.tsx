import {
  Header,
  HeaderActions,
  HeaderActionsItem,
  Icon,
} from "@nccl/components";

import { RootHeaderUser } from "./RootHeaderUser";

export function RootHeader() {
  return (
    <Header>
      <HeaderActions>
        <HeaderActionsItem>
          <Icon dxIcon="search-01-stroke-standard" />
        </HeaderActionsItem>
        <HeaderActionsItem>
          <Icon dxIcon="search-01-stroke-standard" />
        </HeaderActionsItem>
        <HeaderActionsItem>
          <RootHeaderUser />
        </HeaderActionsItem>
      </HeaderActions>
    </Header>
  );
}
