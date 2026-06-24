import { FastifyRequest } from "fastify";
import zlib from "node:zlib";
import z from "zod";

const decompressBody = <T>(
  request: FastifyRequest,
  schema: z.ZodType<T>,
): T => {
  if (!request.body) throw new Error("Request body is not provided");

  const isBuffer = Buffer.isBuffer(request.body);

  if (!isBuffer) throw new Error("Issue in request body");

  const compressed = request.body as Buffer;

  const uncompressed = zlib.brotliDecompressSync(compressed);

  const json = JSON.parse(uncompressed.toString());

  return schema.parse(json) as T;
};

export default decompressBody;
