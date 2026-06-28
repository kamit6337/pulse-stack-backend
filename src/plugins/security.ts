import environment from "@/config/environment.js";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
  await fastify.register(import("@fastify/helmet"), {
    global: true,
  });

  await fastify.register(import("@fastify/cors"), {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      environment.CLIENT_URL || "http://localhost:3000",
    ],
    credentials: true,
  });

  await fastify.register(import("@fastify/compress"));
});
