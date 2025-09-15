import z from "zod";
import {
  InputGroup,
  InputText,
  Button,
  Toast,
  AnchorContent,
} from "@nccl/components";
import {
  Form,
  href,
  Link,
  redirect,
  useNavigation,
  useSearchParams,
} from "react-router";
import { useEffect } from "react";
import { ErrorSet, parseError } from "@nccl/api/client";

import type { Route } from "./+types/AuthAcceptInvite.route";
import { AuthPage } from "./AuthPage";
import { AuthPageHeader } from "./AuthPageHeader";
import { AuthPageBody } from "./AuthPageBody";
import { AuthPageFooter } from "./AuthPageFooter";

import { getAuthError, getValidationErrors } from "../../utils/client";
import { PageHeader } from "../../components/page";
import { getNCCLClient } from "../../utils/server";
import { getFormData } from "../../utils/isomorphic";
import { assembleTitle } from "../../utils/util.assemble-title";

const schema = z.object({
  email: z
    .email({ error: "Please enter an email address" })
    .trim()
    .min(1, { error: "Please enter an email address" }),
});
type FormData = z.infer<typeof schema>;

export async function action(args: Route.ActionArgs) {
  const authClient = getNCCLClient(args);
  const formData = await getFormData(args, schema);
  if (formData.error) {
    return parseError(formData.error);
  }

  const resetPasswordUrl = `${args.context.env.NCCL_APP_URL}${href("/reset-password")}`;

  const res = await authClient.auth.requestPasswordReset({
    ...formData.data,
    redirectTo: resetPasswordUrl,
  });
  if (!res.ok) {
    console.log(res.text());
    const json = await res.json();
    console.error(json);
    const err = new ErrorSet.serverError(
      json?.message ?? "Error when trying to send a password reset email."
    );
    return parseError(err);
  }
  return redirect("/forgot-password/success");
}

export default function AuthForgotPassword(args: Route.ComponentProps) {
  const navigation = useNavigation();
  const [urlSearchParams] = useSearchParams();
  const validationErrors = getValidationErrors<FormData>(args.actionData);
  const authError = getAuthError(args.actionData);

  useEffect(() => {
    if (!authError) return;
    Toast.error("Invalid email or password. Please try again.", {
      title: "Unable to sign in.",
    });
  }, [args.actionData, authError]);

  return (
    <Form method="post">
      <title>{assembleTitle("Request a password reset")}</title>
      <AuthPage>
        <AuthPageHeader>
          <PageHeader
            dxTitle="Request a password reset"
            dxSubtitle="Type your email address below. If it matches an account, we’ll send a reset link."
          />
        </AuthPageHeader>
        <AuthPageBody>
          <InputGroup>
            <input
              type="hidden"
              name="redirectURL"
              value={urlSearchParams.get("redirectURL") ?? undefined}
            />
            <InputText
              name="email"
              dxLabel="Email address"
              autoComplete="username"
              dxError={validationErrors.email?.[0]}
            />
            <Link to={href("/sign-in")}>
              <AnchorContent>Back to sign in</AnchorContent>
            </Link>
          </InputGroup>
        </AuthPageBody>
        <AuthPageFooter>
          <Button
            dxSize="lg"
            dxVariant="contained"
            dxColor="secondary"
            style={{ justifyContent: "center" }}
            type="submit"
            disabled={navigation.state !== "idle"}
          >
            {navigation.state !== "idle"
              ? "Loading..."
              : "Request password reset"}
          </Button>
        </AuthPageFooter>
      </AuthPage>
    </Form>
  );
}
