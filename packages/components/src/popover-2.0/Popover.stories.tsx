import type { Meta } from "@storybook/react";

import { PopoverEngine } from "./PopoverEngine.js";
import { Popover } from "./Popover.js";
import { usePopover } from "./popover.usePopover.js";
import { PopoverMenu } from "./PopoverMenu.js";
import { PopoverMenuItem } from "./PopoverMenuItem.js";
import { PopoverMenuItemAction } from "./PopoverMenuItemAction.js";
import { PopoverMenuItemIcon } from "./PopoverMenuItemIcon.js";
import { PopoverMenuItemText } from "./PopoverMenuItemText.js";

const meta: Meta = {
  title: "Popover",
} satisfies Meta<typeof meta>;

export default meta;

const Poppy = new PopoverEngine({
  position: "top",
  offset: 8,
  type: "auto",
});

export function InstanceDemo() {
  return (
    <>
      <button onClick={Poppy.toggle} ref={Poppy.setTarget}>
        Toggle
      </button>
      <div ref={Poppy.setPopover}>this is a popover</div>
    </>
  );
}

export function HookDemo() {}

export const WithMenu = () => {
  const popover = usePopover();

  return (
    <>
      <button onClick={popover.show} ref={popover.setTarget}>
        Open Popover
      </button>
      <Popover ref={popover.setPopover}>
        <PopoverMenu>
          <PopoverMenuItem>
            <PopoverMenuItemAction>
              <PopoverMenuItemIcon dxIcon="user-02-stroke-standard" />
              <PopoverMenuItemText>View Profile</PopoverMenuItemText>
            </PopoverMenuItemAction>
          </PopoverMenuItem>
          <PopoverMenuItem>
            <PopoverMenuItemAction>
              <PopoverMenuItemIcon dxIcon="key-02-stroke-standard" />
              <PopoverMenuItemText>Change Permission</PopoverMenuItemText>
            </PopoverMenuItemAction>
          </PopoverMenuItem>
        </PopoverMenu>
      </Popover>
    </>
  );
};
