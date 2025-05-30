import path, { join, dirname } from "path";

import type { StorybookConfig } from "@storybook/react-vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [{
    name: getAbsolutePath("@storybook/addon-essentials"),
    options: {
      docs: false,
    },
  }, getAbsolutePath("@storybook/addon-onboarding"), getAbsolutePath("@storybook/addon-interactions"), getAbsolutePath("@storybook/addon-a11y")],
  staticDirs: ["../../app/public"],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {
      builder: {
        viteConfigPath: path.resolve(__dirname, "../vite.config.ts"),
      },
    },
  },
};
export default config;
