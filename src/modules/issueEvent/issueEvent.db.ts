import { CreateIssueEventType } from "@/types/issue.js";
import { IssueEventModel } from "./issueEvent.model.js";

export const issueEventBulkInserted = (data: CreateIssueEventType[]) => {
  return IssueEventModel.insertMany(data);
};
