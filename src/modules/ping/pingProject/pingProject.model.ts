//   name: z.string().min(3, "Name is Required"),
//     url: z.url(),
//     email: z.email(),
//     expectCode: z.number().min(200).max(600).optional(),
//     responseType: z.enum(["text", "json"]),
//     expectText: z.string().optional(),
//     expectJson: z.string().optional(),

import mongoose, { InferSchemaType } from "mongoose";

const pingProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    expectCode: {
      type: Number,
      default: 200,
    },
    responseType: {
      type: String,
      enum: ["text", "json"],
      required: true,
      trim: true,
    },
    expectMsg: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

pingProjectSchema.index(
  {
    userId: 1,
    name: 1,
    url: 1,
  },
  {
    unique: true,
  },
);

pingProjectSchema.index({ userId: 1, createdAt: -1 });

pingProjectSchema.index({ userId: 1 });

export type PindProjectSchemaType = InferSchemaType<typeof pingProjectSchema>;

export type PingProjectType = Omit<
  PindProjectSchemaType,
  "createdAt" | "updatedAt"
>;

export const PingProjectModel = mongoose.model(
  "PingProject",
  pingProjectSchema,
);
