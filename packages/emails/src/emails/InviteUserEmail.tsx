import { EmailButton } from "../components/EmailButton.js";
import { EmailLayout } from "../components/EmailLayout.js";
import { EmailText } from "../components/EmailText.js";
import { EmailTitle } from "../components/EmailTitle.js";

export type InviteUserEmailProps = {
  inviteLink: string;
  expiresInDays: number;
  expiresOnDate: string;
};

export function InviteUserEmail({
  inviteLink,
  expiresInDays,
  expiresOnDate,
}: InviteUserEmailProps) {
  return (
    <EmailLayout previewText="Invitation to join NCCL Parents">
      <EmailTitle>You're invited to the NCCL Parent Portal!</EmailTitle>
      <EmailText>
        You have been invited to join the NCCL School parent portal. This portal
        centralizes all resources and information needed throughout the school
        year.
      </EmailText>
      <EmailText>To accept this invite, click the button below:</EmailText>
      <EmailButton href={inviteLink}>Accept Invite</EmailButton>
      <EmailText>
        If the button doesn't work, copy and paste this link into your browser:{" "}
        {inviteLink}
      </EmailText>
      <EmailText>
        <strong>Note: </strong>This invitation will expire in {expiresInDays}{" "}
        days ({expiresOnDate})
      </EmailText>
      <EmailText>
        Thanks!
        <br />
        NCCL Web Team
      </EmailText>
    </EmailLayout>
  );
}
export default InviteUserEmail;
