import { CONSTANTS, ENV_RUNTIME } from "@nccl/env";
import { startOfDay, addDays } from "date-fns";
import { Hono } from "hono";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

import { getGoogleClient, normalizeGoogleEvents } from "./events.utils.js";

export const events = new Hono();

const timeZone = "America/New_York";

events.get("/3-day-outlook", async (c) => {
  const { calendar } = await getGoogleClient();

  const now = new Date();
  const zonedNow = toZonedTime(now, timeZone);

  const today = startOfDay(zonedNow); // start of day in NCCL zone
  const todayPlus3 = addDays(today, 3);

  const timeMin = fromZonedTime(today, timeZone).toISOString();
  const timeMax = fromZonedTime(todayPlus3, timeZone).toISOString();

  const googleEvents = await calendar.events.list({
    calendarId: CONSTANTS.GOOGLE_CALENDAR_ID_NCCL_PUBLIC,
    key: ENV_RUNTIME.getOne("GOOGLE_API_KEY"),
    orderBy: "startTime",
    singleEvents: true,
    timeMin,
    timeMax,
  });

  const googleEventsNormalized = normalizeGoogleEvents(googleEvents.data);

  const groupedEvents = Object.groupBy(
    googleEventsNormalized,
    (event) => event.startDate
  );

  return c.json(groupedEvents);
});
