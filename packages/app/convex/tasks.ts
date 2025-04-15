import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity();
    console.log(identity);
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await context.db.query("tasks").collect();
  },
});
