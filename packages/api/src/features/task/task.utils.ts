import { z } from "zod";

export const TaskSchemaSyncClerkWith = z.object({
  type: z.literal("sync_db_with_clerk"),
});

export const TaskSchema = z.discriminatedUnion("type", [
  TaskSchemaSyncClerkWith,
]);
