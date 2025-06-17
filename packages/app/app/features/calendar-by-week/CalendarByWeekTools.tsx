import { Button } from "@nccl/components";

import { CalendarTools } from "../calendar/CalendarTools";
import { CalendarToolsSection } from "../calendar/CalendarToolsSection";
import { CalendarToolsTitle } from "../calendar/CalendarToolsTitle";
import type { Route } from "./+types/CalendarByWeek.route";
import { useSearchParams } from "react-router";

export function CalendarByWeekTools({
  meta,
}: {
  meta: Route.ComponentProps["loaderData"]["meta"];
}) {
  const [_, setSearchParams] = useSearchParams();

  function goToThisWeek() {
    setSearchParams((prevState) => {
      prevState.delete("date");
      return prevState;
    });
  }

  function goToNextWeek() {
    setSearchParams({ date: meta.next_week.formatted });
  }
  function goToPrevWeek() {
    setSearchParams({ date: meta.prev_week.formatted });
  }

  return (
    <CalendarTools>
      <CalendarToolsSection>
        <CalendarToolsTitle>
          {`${meta.this_week.month_name} ${meta.this_week.year_name}`}
        </CalendarToolsTitle>
        <Button
          dxVariant="outlined"
          dxColor="primary"
          dxSize="sm"
          onClick={goToThisWeek}
        >
          Today
        </Button>
        <Button
          dxVariant="icon"
          dxIcon="arrow-left-01-stroke-standard"
          dxSize="md"
          onClick={goToPrevWeek}
        />
        <Button
          dxVariant="icon"
          dxIcon="arrow-right-01-stroke-standard"
          dxSize="md"
          onClick={goToNextWeek}
        />
      </CalendarToolsSection>
      <CalendarToolsSection>
        <CalendarToolsSection>
          <Button
            dxVariant="icon"
            dxIcon="settings-02-stroke-standard"
            dxSize="md"
          />
          <Button dxVariant="icon" dxIcon="at-stroke-standard" dxSize="md" />
        </CalendarToolsSection>
        <CalendarToolsSection>
          <Button
            dxVariant="icon"
            dxIcon="filter-stroke-standard"
            dxSize="md"
          />
        </CalendarToolsSection>
      </CalendarToolsSection>
    </CalendarTools>
  );
}
