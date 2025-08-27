import type { calendar_v3 } from "googleapis";
import { z } from "zod";

export type GoogleCalendarEvents = calendar_v3.Schema$Events;
export type GoogleCalendarEvent = calendar_v3.Schema$Event;

export const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23
export const amPmHours = hours.map((h) => {
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour} ${period}`;
});

const calendarSearchParams = z.object({
  date: z.string().optional(),
});
export type CalendarSearchParams = z.infer<typeof calendarSearchParams>;

export function getCalendarURLSearchParams(request: Request) {
  const url = new URL(request.url);
  const urlSearchParams = new URLSearchParams(url.searchParams);
  const rawParams = Object.fromEntries(urlSearchParams.entries());
  const obj = calendarSearchParams.parse(rawParams);
  return obj;
}
