import type { calendar_v3 } from "googleapis";

import type { NCCLEvent } from "./events.schema.js";

export async function getGoogleClient() {
  const { google } = await import("googleapis");
  return {
    calendar: google.calendar("v3"),
  };
}

export type GoogleClient = Awaited<ReturnType<typeof getGoogleClient>>;

export function normalizeGoogleEvents(events: calendar_v3.Schema$Events) {
  return (events.items ?? []).reduce<NCCLEvent[]>((accum, item) => {
    const title = item.summary ?? "Unnamed event";
    const description = item.description ?? null;
    const id = item.id ?? crypto.randomUUID();

    // all day event in google terms
    if (item.start?.date && item.end?.date) {
      return accum.concat({
        id,
        title,
        description,
        allDayEvent: true,
        startDate: item.start.date,
        endDate: item.end.date,
      });
    }

    // has a definitive start and end date
    if (item.start?.dateTime && item.end?.dateTime) {
      return accum.concat({
        id,
        title,
        description,
        allDayEvent: false,
        startDate: item.start.dateTime,
        endDate: item.end.dateTime,
      });
    }

    return accum;
  }, []);
}
