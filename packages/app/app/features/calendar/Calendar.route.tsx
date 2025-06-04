import { Typography } from "@nccl/components";

import type { Route } from "./+types/Calendar.route";

import { PageSection } from "../../components/page";

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${args.context.cloudflare.env.GOOGLE_CALENDAR_ID_NCCL_PUBLIC}/events`
  );
  url.searchParams.set(
    "key",
    args.context.cloudflare.env.GOOGLE_CALENDAR_API_KEY
  );
  url.searchParams.set("maxResults", "10");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("timeMin", new Date().toISOString());

  const res = await fetch(url);
  const json = await res.json();

  return {
    events: json,
  };
}

export default function CalendarRoute(args: Route.ComponentProps) {
  return (
    <PageSection>
      <Typography dxVariant="heading3" dxNode="h3">
        Data for the next 10 google cal events
      </Typography>
      <br />
      <code style={{ width: "80%", overflow: "auto" }}>
        {JSON.stringify(args.loaderData.events, null, 2)}
      </code>
    </PageSection>
  );
}
