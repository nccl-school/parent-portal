import { exhaustiveMatchGuard } from "@stratum-ui/core/utils";
import { Callout } from "@nccl/components";
import { AcceptInviteRequestSchema } from "@nccl/api/client";
import { href, redirect } from "react-router";

import type { Route } from "./+types/AuthAcceptInvite.route";
import { AuthAcceptInviteValid } from "./AuthAcceptInviteValid";
import { AuthAcceptInviteError } from "./AuthAcceptInviteError";

import { validateFormData } from "../../utils/isomorphic";
import { renderLoaderData } from "../../utils/client";

import { assembleTitle } from "../../utils/util.assemble-title";

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url);
  const queryToken = url.searchParams.get("token");
  if (!queryToken) {
    return {
      status: "missing_token",
      reason: "A token is required in order to process your invitation.",
    } as const;
  }
  const ncclClient = args.context.resolve("ncclClient");
  try {
    const res = await ncclClient.account.validateInviteToken(queryToken);
    return res;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

export async function action(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  const formData = await args.request.formData();

  try {
    const body = await validateFormData(AcceptInviteRequestSchema, formData);
    console.log("Accepting invite");
    await ncclClient.account.acceptInvite(body);
    console.log("Successfully accepted invite");
    return redirect(href("/sign-up/success"));
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

export default function AuthAcceptInviteRoute(args: Route.ComponentProps) {
  return (
    <>
      <title>{assembleTitle("Sign up")}</title>
      {renderLoaderData(args.loaderData, {
        loading: "Loading...",
        ok: (d) => {
          switch (d.status) {
            case "invalid_token":
            case "missing_token":
              return (
                <AuthAcceptInviteError>
                  <Callout variant="danger" omitIcon description={d.reason} />
                </AuthAcceptInviteError>
              );

            case "valid":
              return <AuthAcceptInviteValid email={d.email} />;

            default:
              exhaustiveMatchGuard(d);
          }
        },
      })}
    </>
  );
}
