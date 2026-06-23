import mongoose from "mongoose";

const issueEventSchema = new mongoose.Schema(
  {
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      index: true,
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    // Error Grouping
    fingerprint: {
      type: String,
      required: true,
    },

    environment: {
      type: String,
      enum: ["development", "staging", "production"],
      default: "production",
      index: true,
    },

    stack: {
      type: String,
    },

    code: {
      type: String, // ECONNREFUSED, VALIDATION_ERROR...
    },

    level: {
      type: String,
      enum: ["fatal", "error", "warning", "info"],
      default: "error",
      index: true,
    },

    // Request Information

    server: {
      _id: false,
      hostname: String,
      region: String,
    },

    ///api/orders /api/payment /api/login
    route: {
      type: String,
      index: true,
    },

    request: {
      _id: false,
      method: String,
      url: String,
      path: String,
      query: mongoose.Schema.Types.Mixed,
      body: mongoose.Schema.Types.Mixed,
      headers: mongoose.Schema.Types.Mixed,
    },

    // User Information
    user: {
      _id: false,
      id: String,
      name: String,
      email: String,
    },

    // Runtime Information
    runtime: {
      _id: false,
      nodeVersion: String,
      platform: String,
      memoryUsage: Number,
      cpuUsage: Number,
      ip: String,
    },

    // Release Tracking
    release: {
      type: String,
      index: true,
    },

    // Browser
    browser: {
      _id: false,
      name: String,
      version: String,
    },

    // Device
    device: {
      type: String,
    },

    // Tags
    tags: {
      type: Map,
      of: String,
    },

    // Extra Data
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },

    // SDK info
    sdk: {
      _id: false,
      name: String,
      version: String,
    },
  },
  { timestamps: true },
);

issueEventSchema.index(
  {
    issueId: 1,
    fingerprint: 1,
  },
  {
    unique: true,
  },
);

issueEventSchema.index({
  projectId: 1,
  createdAt: -1,
});

issueEventSchema.index({
  issueId: 1,
  createdAt: -1,
});

issueEventSchema.index({
  level: 1,
  createdAt: -1,
});

issueEventSchema.index({
  environment: 1,
  createdAt: -1,
});

// issueEventSchema.set("toJSON", {
//   transform(doc, ret: any, options) {
//     ret.id = ret._id.toString();

//     delete ret._id;
//     delete ret.__v;

//     return ret;
//   },
// });

export const IssueEventModel = mongoose.model("IssueEvent", issueEventSchema);
