import type { Meta } from "@storybook/react";

import { Header } from "./Header.js";
import { HeaderActionsItem } from "./HeaderActionsItem.js";
import { HeaderActions } from "./HeaderActions.js";

import { Icon } from "../icons/Icon.js";

const meta: Meta = {
  title: "Header",
  component: Header,
} satisfies Meta<typeof meta>;

export default meta;

export const Basic = () => {
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
          <input type="text" />
        </HeaderActionsItem>
      </HeaderActions>
    </Header>
  );
};
