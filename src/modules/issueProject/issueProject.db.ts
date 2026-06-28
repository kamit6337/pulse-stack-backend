import {
  CreateIssueProjectType,
  IssueProjectModel,
} from "./issueProject.model.js";

export const getIssueProjectDB = (userId: string) => {
  return IssueProjectModel.find({
    userId,
  }).sort({ createdAt: -1 });
};

export const createIssueProjectDB = (data: CreateIssueProjectType) => {
  return IssueProjectModel.create({
    userId: data.userId,
    name: data.name,
    backendFramework: data.backendFramework,
  });
};
