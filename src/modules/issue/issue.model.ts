import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    // Organization / Project
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    // Error Details
    message: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String, // TypeError, ReferenceError...
      required: true,
      trim: true,
    },

    // Error Grouping
    fingerprint: {
      type: String,
      required: true,
    },

    occurrenceCount: {
      type: Number,
      default: 1,
    },

    firstSeen: {
      type: Date,
      default: Date.now,
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["unresolved", "resolved", "ignored"],
      default: "unresolved",
    },
    resolvedAt: Date,
  },
  {
    timestamps: true,
  },
);

issueSchema.index({ projectId: 1, fingerprint: 1 }, { unique: true });
issueSchema.index({ status: 1, createdAt: -1 });
issueSchema.index({ fingerprint: 1 });

type IssueSchemaType = mongoose.InferSchemaType<typeof issueSchema>;

export type IssueModelType = Omit<
  IssueSchemaType,
  "createdAt" | "updatedAt" | "status" | "resolvedAt"
>;

export const IssueModel = mongoose.model("Issue", issueSchema);

// lastOccurrenceId: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "ErrEvent",
// },
