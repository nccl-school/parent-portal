import { format } from "date-fns";
import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";

import { CalendarByWeekTools } from "./CalendarByWeekTools";
import type { Route } from "./+types/CalendarByWeek.route";
import { getByWeekMetaData } from "./calendar-by-week.utils";

import {
  CalendarBody,
  amPmHours,
  getCalendarURLSearchParams,
  CalendarBodyRow,
  CalendarHeader,
  CalendarHeaderCell,
  CalendarEvent,
} from "../calendar";

const styles = css`
  display: grid;
  grid-template-columns: auto repeat(7, 1fr);
  position: relative;
  height: 100%;
  overflow-y: auto;

  .calendar-row {
    display: contents;
  }

  .calendar-cell {
    border: 1px solid ${makeColor("neutral-light-100", { opacity: 0.4 })};
    height: ${makeRem(60)};

    &.active {
      background: ${makeColor("primary-100", { opacity: 0.3 })};
    }
  }

  .calendar-hour-label {
    text-align: center;
    padding-right: 4px;
    font-size: ${makeRem(12)};
    position: relative;
    top: -12px;
    transform: translateY(6px);
    background: #fff;
    width: ${makeRem(100)};
    color: ${makeColor("neutral-dark-300")};
  }
`;

export async function loader(args: Route.LoaderArgs) {
  // ✅ only imported at runtime, not statically
  const { google } = await import("googleapis");
  const calendar = google.calendar("v3");

  const searchParams = getCalendarURLSearchParams(args.request);
  const meta = getByWeekMetaData(searchParams);

  const events = await calendar.events.list({
    calendarId: args.context.env.GOOGLE_CALENDAR_ID_NCCL_PUBLIC,
    key: args.context.env.GOOGLE_CALENDAR_API_KEY,
    orderBy: "startTime",
    singleEvents: true,
    timeMin: meta.this_week.iso,
    timeMax: meta.next_week.iso,
  });

  return {
    events: events.data,
    meta,
  };
}

export default function CalendarByWeekRoute({
  loaderData: { events, meta },
}: Route.ComponentProps) {
  return (
    <>
      <CalendarByWeekTools meta={meta} />
      <div className={styles}>
        {/* Header */}
        <CalendarHeader>
          <CalendarHeaderCell>EST</CalendarHeaderCell>
          {meta.days.map((day) => (
            <CalendarHeaderCell
              key={day.iso}
              className={classes({ active: day.num === meta.today.dayNum })}
            >
              {format(day.iso, "EEE")}
              &nbsp;
              <b>{format(day.iso, "dd")}</b>
            </CalendarHeaderCell>
          ))}
        </CalendarHeader>

        {/* Rows */}
        <CalendarBody>
          {amPmHours.map((hour) => (
            <CalendarBodyRow key={hour} className="calendar-row">
              <div className="calendar-hour-label">
                <Typography dxVariant="label" dxNode="div">
                  {hour}
                </Typography>
              </div>
              {meta.days.map((day) => {
                console.log(day.iso, meta.today.iso);
                return (
                  <div
                    key={day.iso}
                    className={classes("calendar-cell", {
                      active: day.iso === meta.today.iso,
                    })}
                  />
                );
              })}
            </CalendarBodyRow>
          ))}

          {/* Events */}
          {(events.items ?? []).map((event) => (
            <CalendarEvent key={event.id} event={event} />
          ))}
        </CalendarBody>
      </div>
    </>
  );
}
