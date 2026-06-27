import { createIssueProjectDB, getIssueProjectDB } from "./issueProject.db.js";

export const createIssueProject = async (userId: string, name: string) => {
  const result = await createIssueProjectDB(userId, name);

  return result;
};

export const getIssueProject = async (userId: string) => {
  const result = await getIssueProjectDB(userId);

  return result;
};
