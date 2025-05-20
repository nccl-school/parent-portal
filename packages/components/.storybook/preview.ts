import type { Preview } from "@storybook/react";
import "@nccl/theme/root.css";
import "@nccl/theme/reset.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
