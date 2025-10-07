import { ErrorSet } from "@nccl/api/client";
import { redirect } from "react-router";
import { ENV_RUNTIME } from "@nccl/env";

import type { Route } from "./+types/api.auth.signInSocial";

export async function action(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  const formData = await args.request.formData();
  const inviteToken = formData.get("inviteToken");

  try {
    switch (args.params.provider) {
      case "google": {
        const res = await ncclClient.auth.signInGoogle({
          inviteToken: inviteToken ? String(inviteToken) : undefined,
          newUserCallbackURL:
            ENV_RUNTIME.getOne("NCCL_APP_URL").concat(`/sign-up/success`),
          callbackURL: ENV_RUNTIME.getOne("NCCL_APP_URL"),
          errorCallbackURL:
            ENV_RUNTIME.getOne("NCCL_APP_URL").concat("/oauth-error"),
        });
        return redirect(res.url);
      }

      default:
        throw new ErrorSet.badRequest(
          `${args.params.provider} is not a supported social provider.`
        );
    }
  } catch (error) {
    console.log(error);
    return ncclClient.serializeError(error);
  }
}
