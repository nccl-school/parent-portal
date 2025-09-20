import { css } from "@linaria/core";
import { Button, InputSearch, Typography } from "@nccl/components";
import { Form } from "react-router";
import { makeCustom, makeRem, makeResponsive } from "@nccl/theme";

import type { Route } from "./+types/Directory.route";
import { DirectoryList } from "./DirectoryList";

import { LoadingState } from "../../components/states/LoadingState";
import { PageContainer } from "../../components/page/PageContainer";
import { PageHeader } from "../../components/page";
import { createRouteHandle } from "../../utils/isomorphic";
import { getNCCLClient } from "../../utils/server";
import { pluralize, renderLoaderData } from "../../utils/client";

const styles = css`
  display: grid;
  height: 100%;

  ${makeResponsive({ to: "laptop" })} {
    column-gap: ${makeRem(16)};
    grid-template-rows: auto auto auto 1fr;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "title title"
      "search search"
      "count tools"
      "main main";
  }

  ${makeResponsive({ from: "laptop" })} {
    column-gap: ${makeRem(16)};
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr ${makeRem(300)} auto;
    grid-template-areas:
      "title title title"
      "count search tools"
      "main main main";
    row-gap: ${makeRem(16)};
    max-width: ${makeCustom("container--max-width")};
    margin: 0 auto;
    padding: 0 ${makeCustom("page--gutter-desktop")};
  }
`;

const headerStyles = css`
  ${makeResponsive({ to: "laptop" })} {
    display: none;
  }
`;

const searchStyles = css`
  grid-area: search;

  ${makeResponsive({ to: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-mobile")};
  }
`;

const countStyles = css`
  grid-area: count;
  align-self: center;

  ${makeResponsive({ to: "laptop" })} {
    padding: ${makeRem(8)} ${makeCustom("page--gutter-mobile")};
  }

  ${makeResponsive({ from: "laptop" })} {
  }
`;

const toolStyles = css`
  grid-area: tools;
  display: flex;
  align-self: center;
  align-items: center;
  height: 100%;
  gap: ${makeRem(8)};

  ${makeResponsive({ to: "laptop" })} {
    padding: ${makeRem(8)} ${makeCustom("page--gutter-mobile")};
  }
`;
const mainStyles = css`
  grid-area: main;
  margin: 0 auto;
  width: 100%;
  overflow: auto;

  ${makeResponsive({ from: "laptop" })} {
  }
`;

export const handle = createRouteHandle({
  mobileTitle: "Directory",
});

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(args);
  const directory = await ncclClient.directory.getEntireDirectory();
  return { directory };
}

export default function DirectoryRoute({ loaderData }: Route.ComponentProps) {
  return (
    <PageContainer dxVariant="scrollable" className={styles}>
      <PageHeader dxTitle="Directory" className={headerStyles} />
      <Form className={searchStyles}>
        <InputSearch
          dxVariant="contrasted"
          dxSize="md"
          placeholder="Search parents, teachers, staff..."
        />
      </Form>
      <div className={countStyles}>
        <Typography dxNode="h3" dxVariant="heading5">
          {renderLoaderData(loaderData.directory, {
            loading: "Loading...",
            ok: (d) => pluralize("result", d.length, { withCount: true }),
          })}
        </Typography>
      </div>

      <div className={toolStyles}>
        <Button
          dxVariant="icon"
          dxIcon="preference-horizontal-stroke-standard"
          dxColor="neutral-dark-1200"
          dxSize="lg"
        />
        <Button
          dxVariant="icon"
          dxIcon="more-horizontal-solid-standard"
          dxColor="neutral-dark-1200"
          dxSize="lg"
        />
      </div>
      <div className={mainStyles}>
        {renderLoaderData(loaderData.directory, {
          loading: <LoadingState>Loading...</LoadingState>,
          ok: DirectoryList,
        })}
      </div>
    </PageContainer>
  );
}
