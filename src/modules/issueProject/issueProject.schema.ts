import z from "zod";

export const issueProjectSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createIssueProjectSchema = issueProjectSchema.pick({
  name: true,
});
