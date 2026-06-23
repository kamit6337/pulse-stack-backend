import { FastifyRequest } from "fastify";
import zlib from "node:zlib";

const decompressBody = <T>(request: FastifyRequest): T[] => {
  const isBuffer = Buffer.isBuffer(request.body);

  if (!isBuffer) throw new Error("Issue in request body");

  const compressed = request.body as Buffer;

  const uncompressed = zlib.brotliDecompressSync(compressed);

  const payload = JSON.parse(uncompressed.toString());

  return payload as T[];
};

export default decompressBody;
