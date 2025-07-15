import type { Meta } from "@storybook/react";

import { DescriptionList } from "./DescriptionList.js";
import { DescriptionListTag } from "./DescriptionListTag.js";
import { DescriptionListData } from "./DescriptionListData.js";

import { Label } from "../label/Label.js";

const meta: Meta = {
  title: "List / Description List",
};

export default meta;

export const Basic = () => {
  return (
    <DescriptionList>
      <DescriptionListTag>Assignee</DescriptionListTag>
      <DescriptionListData>Jennifer Anniston</DescriptionListData>
      <DescriptionListTag>Due Date</DescriptionListTag>
      <DescriptionListData>
        {new Date().toLocaleDateString()}
      </DescriptionListData>
      <DescriptionListTag>Projects</DescriptionListTag>
      <DescriptionListData>
        <Label dxVariant="primary">In progress</Label>
      </DescriptionListData>
    </DescriptionList>
  );
};
