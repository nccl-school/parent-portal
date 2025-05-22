import path from "node:path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";

import packageJson from "./package.json" with { type: "json" };

export default defineConfig({
  plugins: [
    react(),
    // @ts-expect-error Per documentation, this is correct regardless of types
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: path.resolve(import.meta.dirname, "./dist"),
    lib: {
      entry: path.resolve(import.meta.dirname, "./src/index.ts"),
      fileName(_format, entryName) {
        return `${entryName}.js`;
      },
      formats: ["es"],
    },

    rollupOptions: {
      output: {
        preserveModules: true,
      },
      external: (id) => {
        // Exclude regular dependencies and known externals
        return [
          ...Object.keys(packageJson.dependencies),
          "react/jsx-runtime",
        ].some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
      },
    },
  },
});
