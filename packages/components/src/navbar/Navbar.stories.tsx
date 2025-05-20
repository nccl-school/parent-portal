import type { Meta } from "@storybook/react";

import { Navbar } from "./Navbar.js";
import { NavbarItem } from "./NavbarItem.js";
import { NavbarItemIcon } from "./NavbarItemIcon.js";
import { NavbarItemText } from "./NavbarItemText.js";

const meta: Meta = {
  title: "Navbar",
  component: Navbar,
} satisfies Meta<typeof meta>;

export default meta;

export const Basic = () => {
  return (
    <Navbar>
      <NavbarItem>
        <NavbarItemIcon
          dxBaseIcon="home-06-stroke-standard"
          dxActiveIcon="home-06-solid-standard"
        />
        <NavbarItemText>Home</NavbarItemText>
      </NavbarItem>
      <NavbarItem className="active">
        <NavbarItemIcon
          dxBaseIcon="home-06-stroke-standard"
          dxActiveIcon="home-06-solid-standard"
        />
        <NavbarItemText>Home</NavbarItemText>
      </NavbarItem>
      <NavbarItem>
        <NavbarItemIcon
          dxBaseIcon="home-06-stroke-standard"
          dxActiveIcon="home-06-solid-standard"
        />
        <NavbarItemText>Home</NavbarItemText>
      </NavbarItem>
      <NavbarItem>
        <NavbarItemIcon
          dxBaseIcon="home-06-stroke-standard"
          dxActiveIcon="home-06-solid-standard"
        />
        <NavbarItemText>Home</NavbarItemText>
      </NavbarItem>
      <NavbarItem>
        <NavbarItemIcon
          dxBaseIcon="home-06-stroke-standard"
          dxActiveIcon="home-06-solid-standard"
        />
        <NavbarItemText>Home</NavbarItemText>
      </NavbarItem>
    </Navbar>
  );
};
