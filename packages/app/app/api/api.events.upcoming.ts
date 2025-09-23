import { addDays, startOfDay, startOfToday } from "date-fns";

import type { Route } from "./+types/api.events.upcoming";

import { getNCCLClient } from "../utils/server";
import { CONSTANTS } from "../utils/isomorphic";

export async function loader(args: Route.ActionArgs) {
  const { google } = await import("googleapis");
  const calendar = google.calendar("v3");
  const ncclClient = getNCCLClient(args);

  const today = startOfToday();
  const todayPlus3 = startOfDay(addDays(today, 3));

  try {
    // TODO: move to the BE
    const events = await calendar.events.list({
      calendarId: CONSTANTS.GOOGLE_CALENDAR_ID_NCCL_PUBLIC,
      key: args.context.env.GOOGLE_API_KEY,
      maxResults: 10,
      orderBy: "startTime",
      singleEvents: true,
      timeMin: today.toISOString(),
      timeMax: todayPlus3.toISOString(),
    });

    return events.data;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
