import { FastifyPluginAsync } from "fastify";
import {
  createIssueProjectController,
  getIssueProjectController,
} from "./issueProject.controller.js";
import { createIssueProjectSchema } from "./issueProject.schema.js";

export const issueProjectRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", getIssueProjectController);

  fastify.post(
    "/",
    { schema: createIssueProjectSchema },
    createIssueProjectController,
  );
};
