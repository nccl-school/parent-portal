import { google } from "googleapis";

const calendar = google.calendar("v3");

import type { Route } from "./+types/CalendarByDay.route";

import { CONSTANTS } from "../../utils/isomorphic";

export async function loader(args: Route.LoaderArgs) {
  const ncclPublicEvents = await calendar.events.list({
    calendarId: CONSTANTS.GOOGLE_CALENDAR_ID_NCCL_PUBLIC,
    key: args.context.env.GOOGLE_API_KEY,
    maxResults: 100,
    orderBy: "startTime",
    singleEvents: true,
    timeMin: new Date().toISOString(),
  });

  return {
    events: ncclPublicEvents.data,
  };
}

export default function CalendarByDayRoute() {
  // const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
  // const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <>
      <div>tools</div>
      <div>Work in progress</div>
    </>
  );
}
