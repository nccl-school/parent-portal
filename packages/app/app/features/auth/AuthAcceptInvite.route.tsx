import { exhaustiveMatchGuard } from "@stratum-ui/core/utils";
import { Callout, Typography } from "@nccl/components";

import type { Route } from "./+types/AuthAcceptInvite.route";
import { AuthAcceptInviteValid } from "./AuthAcceptInviteValid";
import { AuthAcceptInviteError } from "./AuthAcceptInviteError";

import { renderData } from "../../utils/client";
import { PageHeader } from "../../components/page";
// import { getNCCLClient } from "../../utils/server";

export async function loader(args: Route.LoaderArgs) {
  //   if (!args.params.token) {
  //     return { status: "error", reason: "token missing" } as const;
  //   }
  return { status: "ok", token: args.params.token } as const;
  //   const ncclClient = getNCCLClient(args);
  //   try {
  //     const resource = await ncclClient.resource.getResourceByPath(slugPath);
  //     return resource;
  //   } catch (error) {
  //     return ncclClient.serializeError(error);
  //   }
}

export default function AuthAcceptInviteRoute(args: Route.ComponentProps) {
  return (
    <>
      {renderData(args.loaderData, {
        loading: "Loading...",
        ok: (d) => {
          switch (d.status) {
            case "error":
              return (
                <AuthAcceptInviteError>
                  <Callout variant="danger" omitIcon description={d.reason} />
                </AuthAcceptInviteError>
              );

            case "ok":
              return <AuthAcceptInviteValid />;

            default:
              exhaustiveMatchGuard(d);
          }
        },
      })}
    </>
  );
}
