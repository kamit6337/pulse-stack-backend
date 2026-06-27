import z from "zod";

export const pingProjectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  url: z.url(),
  email: z.email(),
  expectCode: z.number().min(200).max(500),
  responseType: z.enum(["text", "json"]),
  expectMsg: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createPingProjectSchema = pingProjectSchema.pick({
  name: true,
  url: true,
  email: true,
  expectCode: true,
  responseType: true,
  expectMsg: true,
});
