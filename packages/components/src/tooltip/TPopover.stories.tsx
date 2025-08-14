import type { Meta } from "@storybook/react";

import { TPopoverEngine } from "./TPopoverEngine.js";

const meta: Meta = {
  title: "Popover2.0",
} satisfies Meta<typeof meta>;

export default meta;

const PopoverEngine = new TPopoverEngine({
  position: "top",
  offset: 8,
  type: "auto",
});

export function InstanceDemo() {
  return (
    <>
      <button
        onClick={() => PopoverEngine.toggle()}
        ref={PopoverEngine.setTarget}
      >
        Toggle
      </button>
      <div ref={PopoverEngine.setPopover}>this is a popover</div>
    </>
  );
}

export function HookDemo() {}
