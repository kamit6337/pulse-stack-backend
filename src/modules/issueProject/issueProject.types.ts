import z from "zod";
import { createIssueProjectSchema } from "./issueProject.schema.js";

export type CreateIssueProjectRequest = {
  Body: z.infer<typeof createIssueProjectSchema>;
};
