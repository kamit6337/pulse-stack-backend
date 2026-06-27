import { IssueProjectModel } from "./issueProject.model.js";

export const getIssueProjectDB = (userId: string) => {
  return IssueProjectModel.find({
    userId,
  }).sort({ createdAt: -1 });
};

export const createIssueProjectDB = (userId: string, name: string) => {
  return IssueProjectModel.create({
    userId,
    name,
  });
};
