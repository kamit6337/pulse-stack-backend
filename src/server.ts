import Fastify from "fastify";
import environment from "./config/environment.js";
import app from "./app.js";

const start = async () => {
  const fastify = Fastify({
    logger: environment.NODE_ENV === "development",
    trustProxy: true,
    bodyLimit: 1024 * 1024, // 1 MB
  });

  await fastify.register(app);

  await fastify.listen({
    port: environment.PORT,
    host: "0.0.0.0",
  });

  console.log("Server running");
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
