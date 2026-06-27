import { FastifyPluginAsync } from "fastify";
import { createPingProjectSchema } from "./pingProject.schema.js";
import {
  createPingProjectController,
  getPingProjectByUserIdController,
} from "./pingProject.controller.js";

export const pingProjectRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    "/",
    { schema: createPingProjectSchema },
    createPingProjectController,
  );

  fastify.get("/", getPingProjectByUserIdController);
};
