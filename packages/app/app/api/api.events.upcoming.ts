import type { Route } from "./+types/api.events.upcoming";

export async function loader(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  try {
    const events = await ncclClient.events.get3DayOutlook();
    return events;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
