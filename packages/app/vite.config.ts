import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import wyw from "@wyw-in-js/vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [
    devtoolsJson(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    reactRouter(),
    tsconfigPaths(),
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
