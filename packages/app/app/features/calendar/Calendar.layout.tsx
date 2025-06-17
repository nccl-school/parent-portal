import { href, NavLink, Outlet, type NavLinkProps } from "react-router";
import { css } from "@linaria/core";
import { Tab, Tabs, type IconNames } from "@nccl/components";
import { makeCustom } from "@nccl/theme";

import { PageHeader } from "../../components/page";

const styles = css`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  overflow: hidden;
  height: calc(100vh - var(--nccl-custom-header--height-desktop) - 1px);

  .summary {
    margin: 0 auto;
    width: 100%;
    padding: 0 ${makeCustom("page--gutter-desktop")};
    max-width: ${makeCustom("container--max-width")};
  }

  section {
    overflow: hidden;
    height: 100%;
    background: white;
    display: grid;
    grid-template-rows: auto 1fr;
  }
`;

const tabs: (NavLinkProps & {
  baseIcon: IconNames;
  activeIcon: IconNames;
  copy: string;
})[] = [
  {
    to: href("/calendar/by-day"),
    copy: "Day",
    end: true,
    baseIcon: "folder-02-stroke-standard",
    activeIcon: "folder-02-solid-standard",
  },
  {
    to: href("/calendar"),
    copy: "Week",
    end: true,
    baseIcon: "contact-01-stroke-standard",
    activeIcon: "contact-01-solid-standard",
  },
];

const tabStyles = css`
  padding: 0 ${makeCustom("page--gutter-desktop")};
  max-width: ${makeCustom("container--max-width")};
  margin: 0 auto;
  width: 100%;
`;

export default function CalendarLayout() {
  return (
    <div className={styles}>
      <PageHeader
        dxTitle="Calendar"
        dxSubtitle="View and get details on up and coming NCCL events"
      />
      {/* <div className="summary">summary</div> */}
      <div className={tabStyles}>
        <Tabs>
          {tabs.map(
            ({ baseIcon: _, activeIcon: __, copy, ...navLinkProps }, i) => (
              <li key={i.toString()}>
                <NavLink {...navLinkProps}>
                  {({ isActive }) => <Tab dxActive={isActive}>{copy}</Tab>}
                </NavLink>
              </li>
            )
          )}
        </Tabs>
      </div>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
