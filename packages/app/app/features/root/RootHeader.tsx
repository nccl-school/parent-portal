import {
  Header,
  HeaderActions,
  HeaderActionsItem,
  Avatar,
} from "@nccl/components";

export function RootHeader() {
  return (
    <Header>
      <HeaderActions>
        {/* <HeaderActionsItem>
          <Icon dxIcon="search-01-stroke-standard" />
        </HeaderActionsItem>
        <HeaderActionsItem>
          <Icon dxIcon="search-01-stroke-standard" />
        </HeaderActionsItem> */}
        <HeaderActionsItem>
          <Avatar
            dxFirstName="Guy"
            dxSize="lg"
            dxSrc="https://i.pravatar.cc/300"
          />
        </HeaderActionsItem>
      </HeaderActions>
    </Header>
  );
}
