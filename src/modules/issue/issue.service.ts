import { SDK_ENCRYPTION_OBJECT } from "@/types/sdk.js";
import generateFingerPrint from "@/utils/generateFingerPrint.js";
import { createUpdateIssueBulkWriteDB, ProcessedErrors } from "./issue.db.js";
import { issueEventBulkInserted } from "../issueEvent/issueEvent.db.js";
import mongoose, { Types } from "mongoose";
import { IssueEventType } from "../issueEvent/issueEvent.model.js";
import { CreateIssueArrayType } from "./issue.types.js";

export const createNewIssue = async (
  sdk: SDK_ENCRYPTION_OBJECT,
  errData: CreateIssueArrayType,
) => {
  const processedErrors = errData.map((err) => {
    return {
      bucket: err,
      fingerprint: generateFingerPrint(sdk.projectId, err.name, err.message),
    };
  });

  const issueCreatedUpdated = await createUpdateIssueBulkWriteDB(
    processedErrors,
    sdk.projectId,
  );

  console.log("RESULTS", issueCreatedUpdated);

  //   upsertedIds: {
  //     '0': new ObjectId('6a3a6b0485f7bbfa043bccd1'),
  //     '1': new ObjectId('6a3a6b0485f7bbfa043bccd2')

  const issueEventArr: IssueEventType[] = [];

  console.log("processedErrors", processedErrors);

  for (const [key, value] of Object.entries(issueCreatedUpdated.upsertedIds)) {
    if (!key || !value) continue;

    const issueId = (value as mongoose.Types.ObjectId).toString();

    const fingerprint = processedErrors[Number(key)].fingerprint;
    const bucket = processedErrors[Number(key)].bucket;

    if (!fingerprint && !bucket) continue;

    const { error } = bucket;

    const obj: IssueEventType = {
      issueId: issueId as unknown as Types.ObjectId,
      projectId: sdk.projectId as unknown as Types.ObjectId,
      fingerprint,
      environment: error.environment,
      code: error.code,
      level: error.level,
      server: error.server,
      route: error.route,
      request: error.request,
      user: {
        id: sdk.id,
        name: sdk.name,
        email: sdk.email,
      },
      runtime: error.runtime,
      release: error.release,
      browser: error.browser,
      device: error.device,
      tags: error.tags,
      metadata: error.metadata,
      sdk: error.sdk,
    };

    issueEventArr.push(obj);
  }

  console.log("issueEventArr", issueEventArr);

  const addIssueEvents = await issueEventBulkInserted(issueEventArr);

  console.log("ADD ISSUE EVENTS", addIssueEvents);

  return {
    message: "Error Saved Successfully",
  };
};
