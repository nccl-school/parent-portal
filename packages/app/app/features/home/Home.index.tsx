import { css } from "@linaria/core";
import { makeCustom, makeRem, makeResponsive } from "@nccl/theme";

import { getGreetingBanner } from "./home.utils";
import {
  HomeSectionEvents,
  SECTION_UPCOMING_EVENTS,
} from "./HomeSectionEvents";
import { HomeSectionFeed, SECTION_FEED } from "./HomeSectionFeed";
import { HomeSectionActions, SECTION_ACTIONS } from "./HomeSectionActions";
import type { Route } from "./+types/Home.index";

import { CLASSES, createRouteHandle } from "../../utils/isomorphic";
import { PageHeader } from "../../components/page";
import { assembleTitle } from "../../utils/util.assemble-title";

const styles = css`
  ${makeResponsive({ to: "laptop" })} {
    display: grid;
    row-gap: ${makeRem(16)};
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    grid-template-areas: ${`
      "${SECTION_ACTIONS}"
      "${SECTION_UPCOMING_EVENTS}"
      "${SECTION_FEED}"
      `};

    padding: 0 ${makeCustom("page--gutter-mobile")};
  }

  ${makeResponsive({ from: "laptop" })} {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto auto;
    gap: ${makeRem(16)};
    grid-template-areas: ${`
      "${SECTION_FEED} ${SECTION_ACTIONS}"
      "${SECTION_FEED} ${SECTION_UPCOMING_EVENTS}"
      "${SECTION_FEED} ."
      `};

    padding: 0 ${makeCustom("page--gutter-desktop")};
    max-width: ${makeCustom("container--max-width")};
    width: 100%;
    margin: 0 auto;
  }
`;

export async function loader(args: Route.LoaderArgs) {
  const session = args.context.resolve("session");
  return session.user;
}

export const handle = createRouteHandle<Awaited<ReturnType<typeof loader>>>({
  mobileTitle: (user) => `${getGreetingBanner()}, ${user.firstName}`,
});

export default function HomeIndexRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <title>{assembleTitle("Home")}</title>
      <PageHeader
        dxTitle={`${getGreetingBanner()}, ${loaderData.firstName}`}
        className={CLASSES.desktopOnly}
      />
      <div className={styles}>
        <HomeSectionActions />
        <HomeSectionFeed />
        <HomeSectionEvents />
      </div>
    </>
  );
}
