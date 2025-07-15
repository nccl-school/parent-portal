import { SignUp } from "@clerk/react-router";

import { ClerkAuthWrapper } from "../../components/clerk/ClerkAuthWrapper";

export default function SignUpPage() {
  return (
    <ClerkAuthWrapper>
      <SignUp />
    </ClerkAuthWrapper>
  );
}
