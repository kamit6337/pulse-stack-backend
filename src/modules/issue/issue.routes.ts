import { FastifyPluginAsync } from "fastify";
import { createNewIssueController } from "./issue.controller.js";

const issueRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (request, reply) => {
    return reply.code(201).send({
      message: "Issue here",
    });
  });

  fastify.addContentTypeParser(
    "application/octet-stream",
    { parseAs: "buffer" },
    async (_: any, body: any) => body,
  );

  fastify.post("/", createNewIssueController);
};

export default issueRoutes;
