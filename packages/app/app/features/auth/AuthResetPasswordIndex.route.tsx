import {
  Button,
  Callout,
  InputGroup,
  InputPassword,
  Typography,
} from "@nccl/components";
import { Form, href, Link, redirect, useNavigation } from "react-router";
import { ErrorSet, parseError, zPasswordSchema } from "@nccl/api/client";
import { z } from "zod/v4";
import { useState } from "react";

import { AuthPageHeader } from "./AuthPageHeader";
import { AuthPageBody } from "./AuthPageBody";
import { AuthPageFooter } from "./AuthPageFooter";
import { AuthPage } from "./AuthPage";
import type { Route } from "./+types/AuthResetPasswordIndex.route";
import { AuthPasswordMeter } from "./AuthFieldPassword";

import { PageHeader } from "../../components/page";
import { getValidationErrors, renderLoaderData } from "../../utils/client";
import { getFormData } from "../../utils/isomorphic";
import { getNCCLClient } from "../../utils/server";
import { assembleTitle } from "../../utils/util.assemble-title";

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url);

  const error = url.searchParams.get("error");
  if (error === "INVALID_TOKEN") {
    return {
      status: "INVALID_TOKEN",
      reason:
        "Your reset password link is no longer valid. Please request a new password reset email.",
    } as const;
  }
  const token = url.searchParams.get("token");
  if (!token) {
    return {
      status: "MISSING_TOKEN",
      reason:
        "Cannot find a token require to validate the password reset. Please request a new password reset email.",
    } as const;
  }
  return {
    status: "ok",
    token,
  } as const;
}

const schema = z
  .object({
    password: zPasswordSchema,
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password" }),
    token: z.string().min(1, { error: "A token is required" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "The two passwords don't match",
    path: ["confirmPassword"], // show the error on the confirmPassword field
  });

export async function action(args: Route.ActionArgs) {
  const nccClient = getNCCLClient(args);
  const formData = await getFormData(args, schema);
  if (formData.error) {
    return parseError(formData.error);
  }

  const res = await nccClient.auth.resetPassword({
    newPassword: formData.data.password,
    token: formData.data.token,
  });
  if (!res.ok) {
    const json = await res.json();
    console.error(json);
    const err = new ErrorSet.serverError(
      json.error?.message ?? "Unable to reset password."
    );
    return parseError(err);
  }
  return redirect("/reset-password/success");
}

export default function AuthResetPassword(args: Route.ComponentProps) {
  const navigation = useNavigation();
  const [password, setPassword] = useState<string>("");
  const validationErrors = getValidationErrors<z.infer<typeof schema>>(
    args.actionData
  );

  return (
    <Form method="post">
      <title>{assembleTitle("Forgot password")}</title>
      <AuthPage>
        <AuthPageHeader>
          <PageHeader
            dxTitle="Reset your password"
            dxSubtitle="Enter & confirm your new password below"
          />
        </AuthPageHeader>
        <AuthPageBody>
          {renderLoaderData(args.loaderData, {
            loading: "Loading...",
            ok: (d) => {
              switch (d.status) {
                case "INVALID_TOKEN":
                case "MISSING_TOKEN":
                  return (
                    <>
                      <Callout
                        variant="danger"
                        omitIcon
                        description={d.reason}
                      />
                      <br />
                      <Link to={href("/forgot-password")}>
                        <Typography dxVariant="body3" dxNode="span">
                          Request a new password reset email
                        </Typography>
                      </Link>
                    </>
                  );

                case "ok":
                  return (
                    <InputGroup>
                      <input type="hidden" value={d.token} name="token" />
                      <InputPassword
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        name="password"
                        dxLabel="Password"
                        autoComplete="password"
                        dxError={validationErrors.password?.[0]}
                      />
                      <AuthPasswordMeter password={password} />
                      <InputPassword
                        name="confirmPassword"
                        dxLabel="Confirm password"
                        autoComplete="password"
                        dxError={validationErrors.confirmPassword?.[0]}
                      />
                    </InputGroup>
                  );

                default:
                  break;
              }
            },
          })}
        </AuthPageBody>
        {renderLoaderData(args.loaderData, {
          loading: null,
          ok: (d) => {
            if (d.status !== "ok") {
              return null;
            }
            return (
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
                    : "Reset password"}
                </Button>
              </AuthPageFooter>
            );
          },
        })}
      </AuthPage>
    </Form>
  );
}
