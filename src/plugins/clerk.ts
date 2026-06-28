import fp from "fastify-plugin";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import environment from "@/config/environment.js";

export default fp(async (fastify) => {
  fastify.register(clerkPlugin);

  fastify.decorate("authenticateClerk", async (request, reply) => {
    const user = getAuth(request);

    console.log("CLERK_PUBLISHABLE_KEY", environment.CLERK_PUBLISHABLE_KEY);
    console.log("CLERK_SECRET_KEY", environment.CLERK_SECRET_KEY);
    console.log("COOKIES", request.headers);
    console.log("USER", user);

    if (!user.isAuthenticated) {
      return reply.code(401).send({
        message: "Unauthorized",
      });
    }

    request.auth = user;
  });
});
