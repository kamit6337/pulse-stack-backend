import { CreateIssueEventType, ErrorBucket } from "@/types/issue.js";
import { SDK_ENCRYPTION_OBJECT } from "@/types/sdk.js";
import generateFingerPrint from "@/utils/generateFingerPrint.js";
import { createUpdateIssueBulkWriteDB } from "./issue.db.js";
import { issueEventBulkInserted } from "../issueEvent/issueEvent.db.js";
import mongoose from "mongoose";

export const createNewIssue = async (
  sdk: SDK_ENCRYPTION_OBJECT,
  errData: ErrorBucket[],
) => {
  const processedErrors = errData.map((err) => ({
    bucket: err,
    fingerprint: generateFingerPrint(
      sdk.projectId,
      err.error.name,
      err.error.message,
    ),
  }));

  const issueCreatedUpdated = await createUpdateIssueBulkWriteDB(
    processedErrors,
    sdk.projectId,
  );

  console.log("RESULTS", issueCreatedUpdated);

  // BulkWriteResult {
  //   insertedCount: 0,
  //   matchedCount: 0,
  //   modifiedCount: 0,
  //   deletedCount: 0,
  //   upsertedCount: 2,
  //   upsertedIds: {
  //     '0': new ObjectId('6a3a6b0485f7bbfa043bccd1'),
  //     '1': new ObjectId('6a3a6b0485f7bbfa043bccd2')
  //   },
  //   insertedIds: {}
  // }

  const issueEventArr: CreateIssueEventType[] = [];

  for (const [key, value] of Object.entries(issueCreatedUpdated.upsertedIds)) {
    if (!key || !value) continue;

    const issueId = (value as mongoose.Types.ObjectId).toString();

    const fingerprint = processedErrors[Number(key)].fingerprint;
    const bucket = processedErrors[Number(key)].bucket;

    if (!fingerprint && !bucket) continue;

    const { name, message, ...eventData } = bucket.error;

    const obj: CreateIssueEventType = {
      issueId,
      projectId: sdk.projectId,
      user: {
        id: sdk.id,
        name: sdk.name,
        email: sdk.email,
      },
      fingerprint,
      ...eventData,
    };

    issueEventArr.push(obj);
  }

  const addIssueEvents = await issueEventBulkInserted(issueEventArr);

  console.log("ADD ISSUE EVENTS", addIssueEvents);

  return {
    message: "Error Saved Successfully",
  };
};
