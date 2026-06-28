import mongoose, { InferSchemaType } from "mongoose";

const issueProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    backendFramework: {
      type: String,
      enum: ["nodejs", "expressjs", "fastify"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

issueProjectSchema.index({ userId: 1, name: 1 }, { unique: true });
issueProjectSchema.index({ userId: 1, createdAt: -1 });

type IssueProjectSchemaType = InferSchemaType<typeof issueProjectSchema>;

export type CreateIssueProjectType = Omit<
  IssueProjectSchemaType,
  "createdAt" | "updatedAt"
>;

export const IssueProjectModel = mongoose.model(
  "IssueProject",
  issueProjectSchema,
);
