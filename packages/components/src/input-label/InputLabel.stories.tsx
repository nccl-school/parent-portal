import type { Meta, StoryObj } from "@storybook/react";

import { InputLabel, type InputLabelProps } from "./InputLabel.js";

const meta: Meta = {
  title: "InputLabel",
  component: InputLabel,
} satisfies Meta<typeof meta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    dxNode: "div",
    dxLabel: "Select something",
    dxHint: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
    children: (
      <>
        <div>
          <label>
            <span>option 1</span>
            <input type="radio" name="option" />
          </label>
        </div>
        <div>
          <label>
            <span>option 2</span>
            <input type="radio" name="option" />
          </label>
        </div>
        <div>
          <label>
            <span>option 3</span>
            <input type="radio" name="option" />
          </label>
        </div>
      </>
    ),
  } as InputLabelProps,
};
