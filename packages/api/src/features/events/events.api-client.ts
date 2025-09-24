import type { GetUpcomingEventsResponse } from "./events.schema.js";

import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";

export class EventsClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super({ basePath: "/events", ...options });
  }

  /**
   * Get's all of the events that happen in the next
   * 3 days
   */
  get3DayOutlook() {
    return this._get<GetUpcomingEventsResponse>({
      path: "/3-day-outlook",
    });
  }
}
