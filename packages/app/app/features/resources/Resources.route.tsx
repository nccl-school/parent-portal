import { Typography } from "@nccl/components";
import { Link } from "react-router";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { match } from "ts-pattern";

import type { Route } from "./+types/Resources.route";

import { renderData } from "../../utils/client";
import { getNCCLClient } from "../../utils/server";

export async function loader(args: Route.LoaderArgs) {
  const { "*": slugPath } = args.params;

  const ncclClient = getNCCLClient(args);
  try {
    const tree = await ncclClient.resource.getResourceByPath(slugPath);
    return tree;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

const mainStyles = css`
  padding: 0 ${makeRem(32)};
`;

export default function ResourcesRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <div>
        <Typography dxNode="div" dxVariant="heading4">
          All Files
        </Typography>
      </div>
      {renderData(loaderData, {
        ok: (resource) => (
          <ul className={mainStyles}>
            {resource.childResources.map((childResource) => (
              <li key={childResource.id}>
                {match(childResource)
                  .with({ type: "FOLDER" }, (s) => (
                    <Link to={`./${s.slug}`}>
                      <div>{s.name}</div>
                    </Link>
                  ))
                  .otherwise((s) => (
                    <div>{s.name}</div>
                  ))}
              </li>
            ))}
          </ul>
        ),
      })}
    </>
  );
}
