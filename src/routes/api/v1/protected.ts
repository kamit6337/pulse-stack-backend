import { issueProjectRoutes } from "@/modules/issueProject/issueProject.routes.js";
import { pingRoutes } from "@/modules/ping/ping.routes.js";
import userRoutes from "@/modules/user/user.routes.js";
import { FastifyPluginAsync } from "fastify";

const protectedRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("preHandler", fastify.authenticateClerk);

  fastify.register(userRoutes, {
    prefix: "/users",
  });

  fastify.register(pingRoutes, {
    prefix: "/ping",
  });

  fastify.register(issueProjectRoutes, {
    prefix: "/issues/project",
  });
};

export default protectedRoutes;
