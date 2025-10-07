import type { Route } from "./+types/AdminUsers.route";
import { AdminUsersTable } from "./AdminUsersTable";

import { assembleTitle } from "../../utils/util.assemble-title";

export function meta() {
  return [{ title: assembleTitle("Users | Admin") }];
}

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  const data = await ncclClient.user.getUserList();
  return data;
}

export default function AdminUsersRoute(args: Route.ComponentProps) {
  return <AdminUsersTable data={args.loaderData} />;
}
