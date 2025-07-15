import type { Meta } from "@storybook/react";

import { usePopover } from "./popover.usePopover.js";
import storyStyles from "./_stories.module.scss";
import { Popover } from "./Popover.js";
import { PopoverMenu } from "./PopoverMenu.js";
import { PopoverMenuItem } from "./PopoverMenuItem.js";
import { PopoverMenuItemIcon } from "./PopoverMenuItemIcon.js";
import { PopoverMenuItemText } from "./PopoverMenuItemText.js";
import { PopoverMenuItemAction } from "./PopoverMenuItemAction.js";

import type { PopoverPosition } from "../_core/popover/index.js";
import { PopoverEngine, popoverPositions } from "../_core/popover/index.js";

const meta: Meta = {
  title: "Overlay / Popover",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof meta>;

export default meta;

const PopoverInstance = new PopoverEngine();
export const WithInstance = () => {
  return (
    <>
      <button
        onClick={PopoverInstance.show}
        ref={PopoverInstance.setPopoverTarget}
      >
        Open Popover
      </button>
      <Popover ref={PopoverInstance.setPopover}>
        <h3>I'm a popover</h3>
        <button onClick={PopoverInstance.hide}>Close me</button>
      </Popover>
    </>
  );
};

export const WithHook = () => {
  const popover = usePopover();
  return (
    <>
      <button onClick={popover.show} ref={popover.setPopoverTarget}>
        Open Popover
      </button>
      <Popover ref={popover.setPopover}>
        <h3>I'm a popover</h3>
        <button onClick={popover.hide}>Close me</button>
      </Popover>
    </>
  );
};

export const Positioning = () => {
  const popover = usePopover({ offset: 10 });

  return (
    <div className={storyStyles.base}>
      <div style={{ gridArea: "header" }}>
        <button onClick={popover.show}>Show</button>
        <button onClick={popover.hide}>Hide</button>
      </div>
      <div style={{ gridArea: "main" }} className="main">
        <button
          style={{ gridArea: "target" }}
          className="target"
          onClick={popover.show}
          ref={popover.setPopoverTarget}
        >
          Open Popover
        </button>
        <Popover ref={popover.setPopover}>
          <h3>I'm a popover</h3>
          <button onClick={popover.hide}>Close me</button>
        </Popover>
      </div>
      <div style={{ gridArea: "side" }}>
        <h2>Offset</h2>
        <p>The space in between the popover and the target</p>
        <input
          type="number"
          defaultValue={popover.getState().offset}
          onChange={({ currentTarget: { value } }) => {
            popover.setOffset(Number(value));
          }}
        />
        <h2>Positioning</h2>
        <p>The position that the popover will render relative to the target</p>
        {popoverPositions.map((position) => (
          <div key={position}>
            <label>
              <input
                type="radio"
                name="position"
                value={position}
                defaultChecked={popover.getState().position === position}
                onChange={({ currentTarget: { value } }) => {
                  popover.hide();
                  popover.setPosition(value as PopoverPosition);
                  popover.show();
                }}
              />
              <span>{position}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const WithMenu = () => {
  const popover = usePopover();
  return (
    <>
      <button onClick={popover.show} ref={popover.setPopoverTarget}>
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
