import type { Meta } from "@storybook/react";
import { randSentence } from "@ngneat/falso";

import { TOAST_VARIANTS } from "./Toast.js";

import { Toaster } from "./index.js";

const meta: Meta = {
  title: "Toaster",
};

export default meta;

const variantsArr = Object.values(TOAST_VARIANTS);

export function Demo() {
  function launchToast() {
    Toaster.launch({
      message: randSentence(),
      variant: variantsArr[Math.floor(Math.random() * variantsArr.length)],
      dismissal: "auto",
    });
  }

  return (
    <>
      <button onClick={launchToast}>Create random toast</button>
      <Toaster.Render />
    </>
  );
}
