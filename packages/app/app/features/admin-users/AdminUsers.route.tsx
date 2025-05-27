import type { Route } from "./+types/AdminUsers.route";

import { PageSection } from "../../components/page";
import { getClerkClient } from "../../utils/server";

// export async function loader(args: Route.LoaderArgs) {
//   const clerkClient = await getClerkClient(args);
//   const users = await clerkClient.users.getUserList();
//   console.log({ users });
//   return { users:  };
// }

export default function AdminUsersRoute(args: Route.ComponentProps) {
  console.log("🔁 AdminUsers.route.tsx (index)");
  return (
    <PageSection>
      {/* <ul>
        {args.loaderData.users.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul> */}
    </PageSection>
  );
}
