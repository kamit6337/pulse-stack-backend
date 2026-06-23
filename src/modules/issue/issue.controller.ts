import { FastifyReply, FastifyRequest } from "fastify";
import decompressBody from "./decompressBody.js";
import { ErrorBucket } from "@/types/issue.js";
import { createNewIssue } from "./issue.service.js";

export const createNewIssueController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const sdk = request.sdk;

  if (!request.body) {
    return reply.code(404).send({
      message: "Body is not present",
    });
  }

  const errData = decompressBody<ErrorBucket>(request);

  await createNewIssue(sdk, errData);

  return reply.code(201).send({
    success: true,
  });
};
