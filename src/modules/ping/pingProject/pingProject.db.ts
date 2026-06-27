import { PingProjectModel, PingProjectType } from "./pingProject.model.js";

export const createPingProjectDB = (data: PingProjectType) => {
  return PingProjectModel.create({
    name: data.name,
    url: data.url,
    email: data.email,
    expectCode: data.expectCode,
    responseType: data.responseType,
    expectMsg: data.expectMsg,
  });
};

export const getPingProjectByUserIdDB = (userId: string) => {
  return PingProjectModel.find({
    userId,
  }).sort({ createdAt: -1 });
};
