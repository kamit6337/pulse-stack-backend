import { z } from "zod";
import { createIssueEventSchema } from "../issueEvent/issueEvent.schema.js";

export const createIssueSchema = z.object({
  name: z.string(),
  message: z.string(),
  occurrenceCount: z.coerce.number(),
  firstSeen: z.string(),
  lastSeen: z.string(),
  error: createIssueEventSchema,
});

export const createIssueArraySchema = z.array(createIssueSchema);
