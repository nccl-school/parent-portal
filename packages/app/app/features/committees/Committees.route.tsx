import { Typography } from "@nccl/components";

import { createRouteHandle } from "../../utils/isomorphic";
import { ComingSoonState } from "../../components/states/ComingSoonState";

export const handle = createRouteHandle({ mobileTitle: "Committees" });

export default function CommitteeRoute() {
  return (
    <ComingSoonState allowSuggestions>
      <Typography dxNode="p" dxVariant="body1">
        We're working on bringing committee functionality to the app.
      </Typography>
    </ComingSoonState>
  );
}
