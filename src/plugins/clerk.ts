import fp from "fastify-plugin";
import { clerkPlugin, getAuth } from "@clerk/fastify";

export default fp(async (fastify) => {
  fastify.register(clerkPlugin);

  fastify.decorate("authenticateClerk", async (request, reply) => {
    const user = getAuth(request);

    // if (!user.isAuthenticated) {
    //   return reply.code(401).send({
    //     message: "Unauthorized",
    //   });
    // }

    request.auth = user;
  });
});
