import { parseISO, differenceInMinutes, startOfWeek, addDays } from "date-fns";

import type { GoogleCalendarEvent } from "./calendar.utils";

export function CalendarEvent({ event }: { event: GoogleCalendarEvent }) {
  const start = parseISO(event.start.dateTime || event.start.date); // handle all-day
  const end = parseISO(event.end.dateTime || event.end.date);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const columnIndex = start.getDay(); // 0-6
  const minutesFromStart = start.getHours() * 60 + start.getMinutes();
  const duration = differenceInMinutes(end, start);

  return (
    <div
      className="calendar-event"
      style={{
        gridColumn: columnIndex + 2, // +1 for label, +1 for 1-based index
        top: `${(minutesFromStart / 60) * 100}%`,
        height: `${(duration / 60) * 100}%`,
        position: "absolute",
        left: 0,
        right: 0,
      }}
    >
      {event.summary}
    </div>
  );
}
