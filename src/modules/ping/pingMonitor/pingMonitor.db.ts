import mongoose from "mongoose";
import { PingMonitorModel } from "./pingMonitor.model.js";

export const getPingMonitorByPages = (
  projectId: mongoose.Types.ObjectId,
  page = 1,
  limit = 10,
) => {
  const skip = (page - 1) * limit;

  return PingMonitorModel.find({
    pingProjectId: projectId,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};
