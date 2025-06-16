import { Button } from "@nccl/components";

import { CalendarTools } from "../calendar/CalendarTools";
import { CalendarToolsSection } from "../calendar/CalendarToolsSection";
import { CalendarToolsTitle } from "../calendar/CalendarToolsTitle";

export function CalendarByWeekTools() {
  return (
    <CalendarTools>
      <CalendarToolsSection>
        <CalendarToolsTitle>June 2025</CalendarToolsTitle>
        <Button dxVariant="outlined" dxColor="primary" dxSize="sm">
          Today
        </Button>
        <Button
          dxVariant="icon"
          dxIcon="arrow-left-01-stroke-standard"
          dxSize="md"
        />
        <Button
          dxVariant="icon"
          dxIcon="arrow-right-01-stroke-standard"
          dxSize="md"
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
