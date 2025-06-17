import { format, parseISO } from "date-fns";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { Typography } from "@nccl/components";

import type { GoogleCalendarEvent } from "./calendar.utils";

const pixelsPerMinute = 60 / 60; // 2

const styles = css`
  overflow: hidden;
  padding: 4px;

  & > div {
    background: ${makeColor("primary-100")};
    border-radius: ${makeRem(4)};
    border: 1px solid ${makeColor("primary-1200")};
    color: ${makeColor("primary-1200")};
    padding: ${makeRem(8)} ${makeRem(8)};
    height: 100%;
    width: 100%;
  }
  .time {
    color: ${makeColor("primary-800")};
  }
`;

export function CalendarEvent({ event }: { event: GoogleCalendarEvent }) {
  const startDateTime = event.start?.dateTime || event.start?.date;
  const endDateTime = event.end?.dateTime || event.end?.date;

  if (!startDateTime || !endDateTime) {
    throw new Error("Event does not have a start or an end date. Cannot map");
  }

  const start = parseISO(startDateTime); // handle all-day
  const end = parseISO(endDateTime);

  const startTime = format(startDateTime, "h aaaa");
  const endTime = format(endDateTime, "h aaaa");

  const dayIndex = start.getDay(); // Sunday = 0
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const endMinutes = end.getHours() * 60 + end.getMinutes();
  const durationMinutes = endMinutes - startMinutes;

  const top = startMinutes * pixelsPerMinute + 60; // height of the top cell;
  const height = durationMinutes * pixelsPerMinute;

  return (
    <div
      className={styles}
      style={{
        position: "absolute",
        top,
        height,
        left: `calc(${dayIndex} * ((100% - 100px) / 7) + 100px)`,
        width: "calc(((100% - 100px) / 7))",
      }}
    >
      <div>
        <Typography dxVariant="label" dxNode="div">
          {event.summary}
        </Typography>
        <Typography dxVariant="label" dxNode="div" className="time">
          {startTime} - {endTime}
        </Typography>
      </div>
    </div>
  );
}
