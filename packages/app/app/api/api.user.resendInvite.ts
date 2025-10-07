// import type { Route } from "./+types/api.user.resendInvite";

//

// /**
//  * Server loader to resend an invite
//  */
// export async function loader(args: Route.ActionArgs) {
//   const ncclClient = args.context.resolve("ncclClient");
//   try {
//     const res = await ncclClient.user.resendInvitation(args.params.id);
//     return res;
//   } catch (error) {
//     return ncclClient.serializeError(error);
//   }
// }
export {};
