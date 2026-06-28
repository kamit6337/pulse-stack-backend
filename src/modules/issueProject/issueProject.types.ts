import z from "zod";
import { createIssueProjectSchema } from "./issueProject.schema.js";

export type CreateIssueProjectSchemaType = z.infer<
  typeof createIssueProjectSchema
>;

export type CreateIssueProjectRequest = {
  Body: CreateIssueProjectSchemaType;
};
