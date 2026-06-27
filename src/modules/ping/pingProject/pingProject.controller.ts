import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePingProjectRequest } from "./pingProject.types.js";
import {
  createPingProject,
  getPingProjectByUserId,
} from "./pingProject.service.js";

export const createPingProjectController = async (
  request: FastifyRequest<CreatePingProjectRequest>,
  reply: FastifyReply,
) => {
  const body = request.body;

  const { isAuthenticated, userId } = request.auth;

  if (!isAuthenticated || !userId) {
    return reply.code(500).send({
      message: "UN-Authorized Access",
    });
  }

  const newProject = await createPingProject({ ...body, userId });

  return reply.code(201).send(newProject);
};

export const getPingProjectByUserIdController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { isAuthenticated, userId } = request.auth;

  if (!isAuthenticated || !userId) {
    return reply.code(500).send({
      message: "UN-Authorized Access",
    });
  }

  const projects = await getPingProjectByUserId(userId);

  return reply.send(projects);
};
