import { ENV_RUNTIME } from "@nccl/env";
import { Resend } from "resend";

export function createResendClient(resendApiKey?: string) {
  const API_KEY = resendApiKey ?? ENV_RUNTIME.getOne("RESEND_API_KEY");
  return new Resend(API_KEY);
}

export const EMAIL_FIELDS = {
  from: "NCCL Parents <no-reply@ncclschool.org>",
};
