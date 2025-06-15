import type { Route } from "./+types/AdminUsers.route";
import { AdminUsersTable } from "./AdminUsersTable";

import { PageSection } from "../../components/page";
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
    <PageSection>
      <AdminUsersTable data={args.loaderData.users} />
    </PageSection>
  );
}
