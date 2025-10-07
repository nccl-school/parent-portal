import { exhaustiveMatchGuard } from "@stratum-ui/core/utils";
import type { GetUserResponse } from "@nccl/api/client";

import type { Route } from "./+types/DirectoryDetail.route";
import { DirectoryDetailUser } from "./DirectoryDetailUser";

import { ErrorState } from "../../components/states/ErrorState";
import { EmptyState } from "../../components/states/EmptyState";
import { createRouteHandle } from "../../utils/isomorphic";

import { getUserName } from "../user";
import { renderLoaderData } from "../../utils/client";

export async function loader(
  args: Route.LoaderArgs
): Promise<
  | { status: "found"; user: GetUserResponse }
  | { status: "not-found" }
  | { status: "error"; message: string }
> {
  const ncclClient = args.context.resolve("ncclClient");

  try {
    const user = await ncclClient.user.getUser(args.params.id);
    return { status: "found", user };
  } catch (error) {
    const err = ncclClient.serializeError(error);
    if (err.error_type === "not_found") {
      return { status: "not-found" };
    }
    return { status: "error", message: err.message };
  }
}

export const handle = createRouteHandle<Awaited<ReturnType<typeof loader>>>({
  mobileTitle: (loaderData) => {
    switch (loaderData.status) {
      case "found":
        return getUserName(loaderData.user);

      case "not-found":
      case "error":
        return "Error";

      default:
        return exhaustiveMatchGuard(loaderData);
    }
  },
});

export default function DirectoryDetail({ loaderData }: Route.ComponentProps) {
  return renderLoaderData(loaderData, {
    loading: "Loading...",
    ok: (d) => {
      switch (d.status) {
        case "found":
          return <DirectoryDetailUser {...d.user} />;

        case "error":
          return <ErrorState title="An error occurred">{d.message}</ErrorState>;

        case "not-found":
          return (
            <EmptyState
              imgSrc="/images/image-icon-missing-person.png"
              imgAlt="missing-person"
              title="Looks like we don't know that person"
              borderless
            >
              The person you have requested cannot be found.
            </EmptyState>
          );

        default:
          break;
      }
    },
  });
}
