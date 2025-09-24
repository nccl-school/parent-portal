export type NCCLEvent = {
  id: string;
  startDate: string;
  endDate: string;
  allDayEvent: boolean;
  title: string;
  description: string | null;
};

export type Get3DayOutlookResponse = Record<string, NCCLEvent[]>;
