import { Typography } from "@nccl/components";

import { createRouteHandle } from "../../utils/isomorphic";
import { ComingSoonState } from "../../components/states/ComingSoonState";

export const handle = createRouteHandle({ mobileTitle: "Volunteering" });

export default function VolunteerRoute() {
  return (
    <ComingSoonState allowSuggestions>
      <Typography dxNode="p" dxVariant="body1">
        We're working on moving away from <b>Track it Forward</b> and
        integrating time tracking into our application.
      </Typography>
    </ComingSoonState>
  );
}
