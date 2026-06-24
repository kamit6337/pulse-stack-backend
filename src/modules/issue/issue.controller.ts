import { FastifyReply, FastifyRequest } from "fastify";
import { createNewIssue } from "./issue.service.js";

export const createNewIssueController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const sdk = request.sdk;
  const errData = request.errorBuckets;

  await createNewIssue(sdk, errData);

  return reply.code(201).send({
    success: true,
  });
};
