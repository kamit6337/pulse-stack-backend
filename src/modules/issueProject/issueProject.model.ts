import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  },
);

issueProjectSchema.index({ userId: 1, name: 1 }, { unique: true });
issueProjectSchema.index({ userId: 1, createdAt: -1 });

export const IssueProjectModel = mongoose.model(
  "IssueProject",
  issueProjectSchema,
);
