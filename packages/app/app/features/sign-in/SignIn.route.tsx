import { SignIn } from "@clerk/react-router";

import { ClerkAuthWrapper } from "../../components/clerk/ClerkAuthWrapper";
import { assembleTitle } from "../../utils/util.assemble-title";

export function meta() {
  return [
    { title: assembleTitle("Sign in") },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LandingRoute() {
  return (
    <ClerkAuthWrapper>
      <SignIn oauthFlow="redirect" />
    </ClerkAuthWrapper>
  );
}
