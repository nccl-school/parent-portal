import { exhaustiveMatchGuard } from "@stratum-ui/core/utils";
import { Callout } from "@nccl/components";
import { AcceptInviteRequestSchema } from "@nccl/api/client";
import { href, redirect } from "react-router";

import type { Route } from "./+types/AuthAcceptInvite.route";
import { AuthAcceptInviteValid } from "./AuthAcceptInviteValid";
import { AuthAcceptInviteError } from "./AuthAcceptInviteError";

import { validateFormData } from "../../utils/isomorphic";
import { renderData } from "../../utils/client";
import {
  getAuthClient,
  getNCCLClient,
  withSetCookie,
} from "../../utils/server";

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url);
  const queryToken = url.searchParams.get("token");
  if (!queryToken) {
    return {
      status: "missing_token",
      reason: "A token is required in order to process your invitation.",
    } as const;
  }
  const ncclClient = getNCCLClient(args);
  try {
    const res = await ncclClient.account.validateInviteToken(queryToken);
    return res;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  const authClient = getAuthClient();
  const formData = await args.request.formData();

  try {
    const body = await validateFormData(AcceptInviteRequestSchema, formData);
    console.log("Accepting invite");
    await ncclClient.account.acceptInvite(body);
    console.log("Successfully accepted invite");
    console.log("Signin in");
    const signInRes = await authClient.signInEmail({
      headers: args.request.headers,
      body: {
        email: body.email,
        password: body.password,
      },
      asResponse: true,
    });
    console.log("Signin in... complete");

    return withSetCookie(signInRes, redirect(href("/")));
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

export default function AuthAcceptInviteRoute(args: Route.ComponentProps) {
  return (
    <>
      {renderData(args.loaderData, {
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
