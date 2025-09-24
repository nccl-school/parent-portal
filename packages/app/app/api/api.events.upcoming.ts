import type { Route } from "./+types/api.events.upcoming";

import { getNCCLClient } from "../utils/server";

export async function loader(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    const events = await ncclClient.events.get3DayOutlook();
    return events;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
