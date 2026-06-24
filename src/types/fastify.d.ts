import type { SessionAuthObject } from "@clerk/fastify";
import "fastify";
import type { SDK_ENCRYPTION_OBJECT } from "./sdk.js";
import { CreateIssueArrayType } from "@/modules/issue/issue.types.ts";

declare module "fastify" {
  interface FastifyRequest {
    auth: SessionAuthObject;
    sdk: SDK_ENCRYPTION_OBJECT;
    errorBuckets: CreateIssueArrayType;
  }

  interface FastifyInstance {
    authenticateClerk(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<void>;
  }

  interface FastifyInstance {
    authenticateSdk(
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<void>;
  }
}
