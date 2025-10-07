import { createContext, RouterContextProvider } from "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import { ENV_RUNTIME } from "@nccl/env";
import type { NCCLClient } from "@nccl/api/client";
import { exhaustiveMatchGuard } from "@stratum-ui/core/utils";

import { createNCCLClient } from "../app/utils/server";

type AppContextStatic = {
  env: ReturnType<typeof ENV_RUNTIME.getAll>;
  ncclClient: NCCLClient;
};
type AppContextDynamic = {
  session: Exclude<Awaited<ReturnType<NCCLClient["auth"]["getSession"]>>, null>;
};
type AppContext = AppContextStatic & AppContextDynamic;

declare module "react-router" {
  interface RouterContextProvider {
    resolve: ReturnType<typeof getContextValue>;
    assign: ReturnType<typeof setContextValue>;
  }
}

export const app = express();

const appContext = {
  env: createContext<AppContext["env"]>(),
  ncclClient: createContext<AppContext["ncclClient"]>(),
  session: createContext<AppContext["session"]>(),
} as const;

function getContextValue(context: RouterContextProvider) {
  return function get<K extends keyof typeof appContext>(key: K) {
    switch (key) {
      case "env":
        return context.get(appContext.env) as AppContext[K];

      case "ncclClient":
        return context.get(appContext.ncclClient) as AppContext[K];

      case "session":
        return context.get(appContext.session) as AppContext[K];

      default:
        return exhaustiveMatchGuard(key);
    }
  };
}

function setContextValue(context: RouterContextProvider) {
  return function assign<K extends keyof typeof appContext>(
    key: K,
    value: AppContext[K]
  ): void {
    switch (key) {
      case "env":
        context.set(appContext.env, value as AppContext["env"]);
        break;

      case "ncclClient":
        context.set(appContext.ncclClient, value as AppContext["ncclClient"]);
        break;

      case "session":
        context.set(appContext.session, value as AppContext["session"]);
        break;

      default:
        return exhaustiveMatchGuard(key);
    }
  };
}

app.use(
  createRequestHandler({
    // eslint-disable-next-line import/no-unresolved
    build: () => import("virtual:react-router/server-build"),
    getLoadContext(req) {
      const reqHeaders = new Headers(
        Object.fromEntries(
          Object.entries(req.headers).map(([k, v]) => [
            k,
            Array.isArray(v) ? v.join(",") : v || "",
          ])
        )
      );

      const context = new RouterContextProvider();

      // -- Set `env`
      const env = ENV_RUNTIME.getAll();
      context.set(appContext.env, env);

      // -- Set `ncclClient`
      const ncclClient = createNCCLClient(reqHeaders, {
        NCCL_API_URL: env.NCCL_API_URL,
      });
      context.set(appContext.ncclClient, ncclClient);

      // -- Set the `resolve` and `assign` values
      context.resolve = getContextValue(context);
      context.assign = setContextValue(context);
      return context;
    },
  })
);
