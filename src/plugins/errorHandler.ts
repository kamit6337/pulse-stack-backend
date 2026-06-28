import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    request.log.error(error);

    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : 500;

    const message =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error instanceof Error
          ? error.message
          : "Unknown error";

    reply.status(statusCode).send({
      success: false,
      message,
    });
  });

  fastify.setNotFoundHandler((req, reply) => {
    reply.status(404).send({
      message: "Route not found",
    });
  });
});
