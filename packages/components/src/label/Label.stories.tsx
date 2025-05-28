import type { Meta } from "@storybook/react";
import { randWord } from "@ngneat/falso";

import { Label } from "./Label.js";
import { LabelGroup } from "./LabelGroup.js";

const meta: Meta = {
  title: "Label",
  component: Label,
} satisfies Meta<typeof meta>;

export default meta;

export const Variants = () => {
  return (
    <LabelGroup>
      <Label dxVariant="primary">{randWord()}</Label>
      <Label dxVariant="secondary">{randWord()}</Label>
      <Label dxVariant="tertiary">{randWord()}</Label>
      <Label dxVariant="danger">{randWord()}</Label>
      <Label dxVariant="info">{randWord()}</Label>
      <Label dxVariant="success">{randWord()}</Label>
      <Label dxVariant="warning">{randWord()}</Label>
    </LabelGroup>
  );
};
