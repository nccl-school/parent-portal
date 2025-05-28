import type { Meta } from "@storybook/react";
import type { ReactNode } from "react";

import { Button } from "./Button.js";

const meta: Meta = {
  title: "Button",
  component: Button,
} satisfies Meta<typeof meta>;

export default meta;

function Container({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
      {children}
    </div>
  );
}

export const IconSizes = () => {
  return (
    <>
      <Container>
        <Button
          dxVariant="icon"
          dxIcon="folder-02-stroke-standard"
          dxSize="sm"
        />
        <Button
          dxVariant="icon"
          dxIcon="folder-02-stroke-standard"
          dxSize="md"
        />
        <Button
          dxVariant="icon"
          dxIcon="folder-02-stroke-standard"
          dxSize="lg"
        />
      </Container>
      <Container>
        <Button
          dxVariant="icon"
          dxStyle="outlined"
          dxIcon="folder-02-stroke-standard"
          dxSize="sm"
        />
        <Button
          dxVariant="icon"
          dxStyle="outlined"
          dxIcon="folder-02-stroke-standard"
          dxSize="md"
        />
        <Button
          dxVariant="icon"
          dxStyle="outlined"
          dxIcon="folder-02-stroke-standard"
          dxSize="lg"
        />
      </Container>
    </>
  );
};
