import z from "zod";

export const createIssueEventSchema = z.object({
  stack: z.string().optional(),

  code: z.string().optional(),

  environment: z
    .enum(["development", "staging", "production"])
    .default("production"),

  level: z.enum(["fatal", "error", "warning", "info"]).default("error"),

  route: z.string().optional(),

  release: z.string().optional(),

  device: z.string().optional(),

  server: z
    .object({
      hostname: z.string(),
      region: z.string(),
    })
    .optional(),

  browser: z
    .object({
      name: z.string(),
      version: z.string(),
    })
    .optional(),

  request: z
    .object({
      method: z.string(),
      url: z.string(),
      path: z.string(),

      query: z.unknown().optional(),
      body: z.unknown().optional(),
      headers: z.unknown().optional(),
    })
    .optional(),

  runtime: z
    .object({
      nodeVersion: z.string(),
      platform: z.string(),
      memoryUsage: z.number(),
      cpuUsage: z.number(),
      ip: z.string(),
    })
    .optional(),

  // user: z
  //   .object({
  //     id: z.string().optional(),
  //     name: z.string().optional(),
  //     email: z.string().optional(),
  //   })
  //   .optional(),

  tags: z.record(z.string(), z.string()).optional(),

  metadata: z.unknown().optional(),

  sdk: z.object({
    name: z.string(),
    version: z.string(),
  }),
});
