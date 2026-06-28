import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3000),

  MONGODB_URI: z.string().min(1),

  CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
  CLERK_SECRET_KEY: z.string().startsWith("sk_"),
  ENCRYPTION_KEY: z.string(),
  ENCRYPTION_EXPIRE_IN: z.coerce.number().optional(),
  CLIENT_URL: z.url().optional(),
});

const environment = envSchema.parse(process.env);

export default environment;
