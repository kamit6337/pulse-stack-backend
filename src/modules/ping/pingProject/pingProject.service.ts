import {
  createPingProjectDB,
  getPingProjectByUserIdDB,
} from "./pingProject.db.js";
import { CreatePingProjectType } from "./pingProject.types.js";

export const createPingProject = async (
  data: CreatePingProjectType & { userId: string },
) => {
  const project = await createPingProjectDB(data);

  return project;
};

export const getPingProjectByUserId = async (userId: string) => {
  const projects = await getPingProjectByUserIdDB(userId);
  return projects;
};
