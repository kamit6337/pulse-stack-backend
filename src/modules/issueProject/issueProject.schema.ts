import z from "zod";

export const issueProjectSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  backendFramework: z.enum(["nodejs", "expressjs", "fastify"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createIssueProjectSchema = issueProjectSchema.pick({
  name: true,
  backendFramework: true,
});
