import { href, useFetcher } from "react-router";
import { Fragment, useEffect } from "react";
import { css } from "@linaria/core";
import { makeColor, makeRem, makeReset } from "@nccl/theme";
import { Button, Label, Typography } from "@nccl/components";
import { format, isToday } from "date-fns";

import { HomeSection } from "./HomeSection";
import { HomeSectionTitle } from "./HomeSectionTitle";
import { HomeSectionContent } from "./HomeSectionContent";
import { HomeSectionEventsMenu } from "./HomeSectionEventsMenu";

import { renderLoaderData } from "../../utils/client.js";
import { LoadingState } from "../../components/states/LoadingState.js";
import type { loader } from "../../api/api.events.upcoming.js";
import { MessageState } from "../../components/states/MessageState";

export const SECTION_UPCOMING_EVENTS = "upcoming-events";

const listStyles = css`
  ${makeReset("ul")};

  li + li {
    margin-top: ${makeRem(12)};
  }
`;

const itemStyles = css`
  padding: ${makeRem(16)};
  min-height: ${makeRem(100)};
  background: ${makeColor("white")};
  border-radius: ${makeRem(8)};
  box-shadow:
    rgba(17, 17, 26, 0.05) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
`;

const titleStyles = css`
  display: grid;
  grid-template-columns: ${makeRem(12)} 1fr auto;
  gap: ${makeRem(8)};
  align-items: center;
  width: 100%;
  margin-bottom: ${makeRem(24)};

  .bubble {
    height: ${makeRem(12)};
    display: inline-flex;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background: ${makeColor("primary")};
  }
`;

export function HomeSectionEvents() {
  const { data, load } = useFetcher<typeof loader>();

  useEffect(() => {
    load(href("/api/events/upcoming"));
  }, [load]);

  return (
    <HomeSection dxSectionName={SECTION_UPCOMING_EVENTS}>
      <HomeSectionTitle
        dxTitle="3 Day Outlook"
        dxTitleImg="/images/image-icon-event.png"
        dxTitleImgAlt="event"
      >
        <Button
          dxVariant="icon"
          dxIcon="refresh-stroke-standard"
          dxSize="md"
          onClick={() => load(href("/api/events/upcoming"))}
        />
        <HomeSectionEventsMenu />
      </HomeSectionTitle>
      <HomeSectionContent>
        {renderLoaderData(data, {
          loading: <LoadingState>Loading next 3 days...</LoadingState>,
          ok: (groupedEvents) => {
            if (Object.keys(groupedEvents).length === 0) {
              return (
                <MessageState>
                  No events for the next 3 days. Aww yeah!
                </MessageState>
              );
            }
            return (
              <ul className={listStyles}>
                {Object.entries(groupedEvents).map(([startDate, events]) => (
                  <Fragment key={startDate}>
                    <li>
                      <Typography dxVariant="label" dxNode="div">
                        {isToday(startDate)
                          ? `Today (${format(startDate, "eeee")})`
                          : format(startDate, "eeee")}
                      </Typography>
                    </li>
                    {events.map((event) => (
                      <li key={event.id}>
                        <div className={itemStyles}>
                          <div className={titleStyles}>
                            <div className="bubble" />
                            <div>
                              <Typography dxVariant="label" dxNode="div">
                                {event.allDayEvent ? (
                                  <span>All day</span>
                                ) : (
                                  <>
                                    <span>{format(event.startDate, "p")}</span>
                                    &nbsp;-&nbsp;
                                    <span>{format(event.endDate, "p")}</span>
                                  </>
                                )}
                              </Typography>
                            </div>
                            <Label dxVariant="primary">all school</Label>
                          </div>
                          <Typography dxVariant="heading5" dxNode="div">
                            {event.title}
                          </Typography>
                          {event.description && (
                            <Typography dxVariant="body3" dxNode="div">
                              {event.description}
                            </Typography>
                          )}
                        </div>
                      </li>
                    ))}
                  </Fragment>
                ))}
              </ul>
            );
          },
        })}
      </HomeSectionContent>
    </HomeSection>
  );
}
