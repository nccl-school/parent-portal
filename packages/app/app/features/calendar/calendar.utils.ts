import type { calendar_v3 } from "googleapis";

export type GoogleCalendarEvents = calendar_v3.Schema$Events;
export type GoogleCalendarEvent = calendar_v3.Schema$Event;

export const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23
export const amPmHours = hours.map((h) => {
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour} ${period}`;
});
