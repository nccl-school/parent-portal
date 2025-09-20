import { Typography } from "@nccl/components";
import { useMatches } from "react-router";

export function AppRootMobileTitle() {
  const matches = useMatches();
  console.log(matches);

  return (
    <Typography dxVariant="heading5" dxNode="h1">
      test
    </Typography>
  );
}
