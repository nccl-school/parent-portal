import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import wyw from "@wyw-in-js/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";
import { ENV_RUNTIME } from "@nccl/env";

console.log("VITE", process.env);

const SENTRY_ORG = ENV_RUNTIME.getOne("SENTRY_ORG");
const SENTRY_AUTH_TOKEN = ENV_RUNTIME.getOne("SENTRY_AUTH_TOKEN");
const SENTRY_PROJECT_APP = ENV_RUNTIME.getOne("SENTRY_PROJECT_APP");

const sentryConfig: SentryReactRouterBuildOptions = {
  org: SENTRY_ORG,
  project: SENTRY_PROJECT_APP,
  authToken: SENTRY_AUTH_TOKEN,
};

export default defineConfig((config) => ({
  plugins: [
    devtoolsJson(),
    reactRouter(),
    sentryReactRouter(sentryConfig, config),
    tsconfigPaths(),
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
  ].filter(Boolean),

  build: {
    rollupOptions: config.isSsrBuild
      ? {
          input: "./server/app.ts",
        }
      : undefined,
  },
}));
