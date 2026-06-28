import { createIssueProjectDB, getIssueProjectDB } from "./issueProject.db.js";
import { CreateIssueProjectSchemaType } from "./issueProject.types.js";

export const createIssueProject = async (
  userId: string,
  data: CreateIssueProjectSchemaType,
) => {
  const result = await createIssueProjectDB({ ...data, userId });

  return result;
};

export const getIssueProject = async (userId: string) => {
  const result = await getIssueProjectDB(userId);

  return result;
};
