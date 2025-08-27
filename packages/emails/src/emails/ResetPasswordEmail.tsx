import { EmailButton } from "../components/EmailButton.js";
import { EmailLayout } from "../components/EmailLayout.js";
import { EmailText } from "../components/EmailText.js";
import { EmailTitle } from "../components/EmailTitle.js";

export type ResetPasswordEmailProps = {
  resetLink: string;
};

export function ResetPasswordEmail({ resetLink }: ResetPasswordEmailProps) {
  return (
    <EmailLayout previewText="Password reset instructions">
      <EmailTitle>Password reset instructions</EmailTitle>
      <EmailText>
        We received a request to reset the password for your account. If you
        made this request, click the button below to reset your password. If you
        didn&apos;t request a password reset, you can safely ignore this email.
      </EmailText>
      <EmailText>To reset your password click on the button below</EmailText>
      <EmailButton href={resetLink}>Reset your password</EmailButton>
      <br />
      <br />
      <EmailText>
        If the button doesn't work, copy and paste this link into your browser:{" "}
        {resetLink}
      </EmailText>
      <EmailText>
        Thanks!
        <br />
        NCCL Web Team
      </EmailText>
    </EmailLayout>
  );
}
export default ResetPasswordEmail;
