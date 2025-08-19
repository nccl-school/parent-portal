import z from "zod/v4";

export const SupermenvConfigSchema = z.object({
  schema: z.custom<z.ZodObject>((val) => val instanceof z.ZodObject, {
    message: "schema must be valid Zod Object",
  }),
  dotEnvFilePaths: z.string().array().optional(),
});

export type SupermenvConfig = z.infer<typeof SupermenvConfigSchema>;

export function defineConfig(configOptions: SupermenvConfig) {
  const config = SupermenvConfigSchema.safeParse(configOptions);
  if (!config.success) {
    throw z.formatError(config.error);
  }
  return config.data;
}
