import { FastifyReply, FastifyRequest } from "fastify";
import { CreateIssueProjectRequest } from "./issueProject.types.js";
import { createIssueProject, getIssueProject } from "./issueProject.service.js";

export const getIssueProjectController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { isAuthenticated, userId } = request.auth;

  if (!isAuthenticated || !userId) {
    return reply.code(404).send({
      message: "unAuthorized Access",
    });
  }

  const result = await getIssueProject(userId);

  return reply.code(200).send(result);
};

export const createIssueProjectController = async (
  request: FastifyRequest<CreateIssueProjectRequest>,
  reply: FastifyReply,
) => {
  const { name, backendFramework } = request.body;

  const { isAuthenticated, userId } = request.auth;

  if (!isAuthenticated || !userId) {
    return reply.code(404).send({
      message: "unAuthorized Access",
    });
  }

  const obj = { name, backendFramework };

  const result = await createIssueProject(userId, obj);

  return reply.code(201).send(result);
};
