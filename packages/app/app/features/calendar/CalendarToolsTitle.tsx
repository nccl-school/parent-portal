import { Typography } from "@nccl/components";

export function CalendarToolsTitle({ children }: { children: string }) {
  return (
    <Typography dxVariant="heading2" dxNode="div">
      {children}
    </Typography>
  );
}
