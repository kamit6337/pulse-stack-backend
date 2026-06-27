import z from "zod";
import { createPingProjectSchema } from "./pingProject.schema.js";

export type CreatePingProjectType = z.infer<typeof createPingProjectSchema>;

export type CreatePingProjectRequest = {
  Body: CreatePingProjectType;
};
