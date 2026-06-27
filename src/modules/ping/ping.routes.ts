import { FastifyPluginAsync } from "fastify";
import { pingProjectRoutes } from "./pingProject/pingProject.routes.js";

export const pingRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(pingProjectRoutes, {
    prefix: "/project",
  });
};
