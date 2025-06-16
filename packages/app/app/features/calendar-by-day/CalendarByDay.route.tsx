import { format, startOfWeek, addDays } from "date-fns";
import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeColor, makeFontWeight, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { google } from "googleapis";

const calendar = google.calendar("v3");

import {
  amPmHours,
  type GoogleCalendarEvents,
} from "../calendar/calendar.utils";

const styles = css`
  display: grid;
  grid-template-columns: auto repeat(7, 1fr);
  position: relative;
  height: 100%;
  overflow-y: auto;

  .calendar-header {
    display: contents;
  }

  .calendar-day-header {
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding: 8px 0;
    background: white;
    display: grid;
    place-content: center;
    color: ${makeColor("neutral-dark-1000")};
    height: ${makeRem(60)};
    position: sticky;
    top: 0;
    border-bottom: ${makeColor("neutral-dark-100", { opacity: 0.2 })};
    background: ${makeColor("neutral-light-100", { opacity: 0.3 })};
    z-index: 10;
    backdrop-filter: blur(5px);

    &.active {
      background: ${makeColor("primary-50", { opacity: 0.5 })};
      color: ${makeColor("primary-1200")};
    }

    & > * {
      font-size: ${makeRem(16)};
      text-transform: uppercase;
      font-weight: ${makeFontWeight("heading-semiBold")};
    }
  }

  .calendar-body {
    display: contents;
  }

  .calendar-row {
    display: contents;
    padding: ${makeRem(32)} 0;
  }

  .calendar-cell {
    border: 1px solid ${makeColor("neutral-light-50")};
    height: ${makeRem(100)};
    padding: ${makeRem(32)} 0;
    /* background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px); */
  }

  .calendar-hour-label {
    text-align: center;
    padding-right: 4px;
    font-size: ${makeRem(12)};
    position: relative;
    top: -12px;
    transform: translateY(6px);
    background: #fff;
    padding: 0 ${makeRem(24)};
    color: ${makeColor("neutral-dark-300")};
  }

  .calendar-event {
    background: #3b82f6;
    color: white;
    font-size: 12px;
    border-radius: 4px;
    padding: 2px 4px;
    overflow: hidden;
  }
`;

export async function loader(args: Route.LoaderArgs) {
  const events = await calendar.events.list({
    calendarId: args.context.env.GOOGLE_CALENDAR_ID_NCCL_PUBLIC,
    key: args.context.env.GOOGLE_CALENDAR_API_KEY,
    maxResults: 100,
    orderBy: "startTime",
    singleEvents: true,
    timeMin: new Date().toISOString(),
  });

  return {
    events: events.data,
  };
}

export default function CalendarByDayRoute({
  events,
}: {
  events: GoogleCalendarEvents;
}) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
  // const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <>
      <div>tools</div>
      <div>Work in progress</div>
    </>
  );
}
