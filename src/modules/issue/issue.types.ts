import z from "zod";
import { createIssueArraySchema } from "./issue.schema.js";

export type CreateIssueRequest = {
  Body: z.infer<typeof createIssueArraySchema>;
};
