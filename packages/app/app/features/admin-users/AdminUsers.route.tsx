import type { Route } from "./+types/AdminUsers.route";

import { InnerPageHeader, PageSection } from "../../components/page";
import { getClerkClient } from "../../utils/server";
import { assembleTitle } from "../../utils/util.assemble-title";

export function meta() {
  return [{ title: assembleTitle("Users | Admin") }];
}

export async function loader(args: Route.LoaderArgs) {
  const clerkClient = await getClerkClient(args);
  const users = await clerkClient.users.getUserList();
  return { users: users.data };
}

export default function AdminUsersRoute(args: Route.ComponentProps) {
  return (
    <>
      <InnerPageHeader dxTitle="Users" />
      <PageSection>
        <ul>
          {args.loaderData.users.map((user) => (
            <li key={user.id}>{user.firstName}</li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}
