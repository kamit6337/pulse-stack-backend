import mongoose, { InferSchemaType } from "mongoose";

const pingMonitorSchema = new mongoose.Schema(
  {
    pingProjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PingProject",
    },
    statusCode: {
      type: Number,
      default: 200,
    },
    responseType: {
      type: String,
      enum: ["text", "json"],
      required: true,
      trim: true,
    },
    responseMsg: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

pingMonitorSchema.index({
  pingProjectId: 1,
  createdAt: -1,
});

export type PingMonitorType = InferSchemaType<typeof pingMonitorSchema>;

export const PingMonitorModel = mongoose.model(
  "PingMonitor",
  pingMonitorSchema,
);
