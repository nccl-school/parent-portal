import {
  addDays,
  addWeeks,
  format,
  getDate,
  parseISO,
  startOfDay,
  startOfWeek,
  subWeeks,
} from "date-fns";

import type { CalendarSearchParams } from "../calendar";

export function getByWeekMetaData(params: CalendarSearchParams) {
  const todaysDate = startOfDay(new Date());
  const customDate = params.date ? parseISO(params.date) : undefined;
  const date = customDate ?? todaysDate;

  const startOfThisWeek = startOfWeek(date);
  const startOfNextWeek = startOfWeek(addWeeks(startOfThisWeek, 1));
  const startOfPrevWeek = startOfWeek(subWeeks(startOfThisWeek, 1));

  return {
    today: {
      iso: todaysDate.toISOString(),
      dayNum: getDate(todaysDate),
    },
    this_week: {
      iso: startOfThisWeek.toISOString(),
      formatted: format(startOfThisWeek, "yyyy-MM-dd"),
      month_name: format(startOfThisWeek, "MMMM"),
      year_name: format(startOfThisWeek, "yyyy"),
    },
    next_week: {
      iso: startOfNextWeek.toISOString(),
      formatted: format(startOfNextWeek, "yyyy-MM-dd"),
    },
    prev_week: {
      iso: startOfPrevWeek.toISOString(),
      formatted: format(startOfPrevWeek, "yyyy-MM-dd"),
    },
    days: Array.from({ length: 7 }, (_, i) => {
      const day = addDays(startOfThisWeek, i);
      return {
        iso: day.toISOString(),
        num: getDate(day),
      };
    }),
  };
}
