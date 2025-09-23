import { href, useFetcher } from "react-router";
import { useEffect } from "react";
import { css } from "@linaria/core";
import { makeColor, makeRem, makeReset } from "@nccl/theme";
import { Label, Typography } from "@nccl/components";
import { format } from "date-fns";

import { HomeSection } from "./HomeSection";
import { HomeSectionTitle } from "./HomeSectionTitle";
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
        <HomeSectionEventsMenu />
      </HomeSectionTitle>
      {renderLoaderData(data, {
        loading: <LoadingState>Loading next 3 days...</LoadingState>,
        ok: (d) => {
          if (d.items?.length === 0) {
            return (
              <MessageState>
                No events for the next 3 days. Huzzah!
              </MessageState>
            );
          }
          return (
            <ul className={listStyles}>
              {d.items?.map((item) => (
                <li key={item.id}>
                  <div className={itemStyles}>
                    <div className={titleStyles}>
                      <div className="bubble" />
                      <div>
                        <Typography dxVariant="label" dxNode="div">
                          {item.start?.date && <span>All day</span>}
                          {item.start?.dateTime && (
                            <span>{format(item.start.dateTime, "p")}</span>
                          )}
                          {item.end?.dateTime && (
                            <>
                              &nbsp;-&nbsp;
                              <span>{format(item.end.dateTime, "p")}</span>
                            </>
                          )}
                        </Typography>
                      </div>
                      <Label dxVariant="primary">all school</Label>
                    </div>
                    <Typography dxVariant="heading5" dxNode="div">
                      {item.summary}
                    </Typography>
                    <Typography dxVariant="body3" dxNode="div">
                      {item.description}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          );
        },
      })}
    </HomeSection>
  );
}
