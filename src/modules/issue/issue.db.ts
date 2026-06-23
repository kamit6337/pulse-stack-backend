import { ErrorBucket } from "@/types/issue.js";
import { IssueModel, IssueModelType } from "./issue.model.js";
import { Types } from "mongoose";

type ProcessedErrors = {
  bucket: ErrorBucket;
  fingerprint: string;
};

export const createUpdateIssueDB = (data: IssueModelType) => {
  const {
    projectId,
    fingerprint,
    name,
    message,
    firstSeen,
    lastSeen,
    occurrenceCount,
  } = data;

  return IssueModel.findOneAndUpdate(
    {
      projectId,
      fingerprint,
    },
    {
      $setOnInsert: {
        projectId,
        fingerprint,
        name,
        message,
        firstSeen: new Date(firstSeen),
        lastSeen: new Date(lastSeen),
      },

      $inc: {
        occurrenceCount: occurrenceCount,
      },

      $set: {
        lastSeen: new Date(lastSeen),
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
};

export const createUpdateIssueBulkWriteDB = (
  processedErrors: ProcessedErrors[],
  projectId: string,
) => {
  const projectObjectId = new Types.ObjectId(projectId);

  return IssueModel.bulkWrite(
    processedErrors.map((processedError) => {
      const {
        error: { name, message },
        count,
        lastSeen,
        firstSeen,
      } = processedError.bucket;

      const fingerprint = processedError.fingerprint;

      return {
        updateOne: {
          filter: {
            projectId: projectObjectId,
            fingerprint: fingerprint,
          },

          update: {
            $setOnInsert: {
              projectId: projectObjectId,
              fingerprint,
              name,
              message,
              firstSeen: new Date(firstSeen),
            },

            $inc: {
              occurrenceCount: count,
            },

            $set: {
              lastSeen: new Date(lastSeen),
            },
          },

          upsert: true,
        },
      };
    }),
  );
};
