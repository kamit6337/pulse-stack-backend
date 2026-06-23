import { ErrorBucket } from "@/types/issue.js";
import { IssueModel, IssueModelType } from "./issue.model.js";
import { Types } from "mongoose";

export const createIssueDB = (data: IssueModelType) => {
  return IssueModel.create({
    projectId: data.projectId,
    name: data.name,
    message: data.message,
    fingerprint: data.fingerprint,
    occurrenceCount: data.occurrenceCount,
    firstSeen: data.firstSeen,
    lastSeen: data.lastSeen,
  });
};

export const findIssueFromFingerPrintDB = (
  projectId: string,
  fingerprint: string,
) => {
  return IssueModel.exists({
    projectId,
    fingerprint,
  });
};

export const updateIssueIncCountDB = (
  projectId: string,
  fingerprint: string,
  count: number,
  lastSeen: number,
) => {
  const newDate = new Date(lastSeen);

  return IssueModel.findOneAndUpdate(
    {
      projectId,
      fingerprint,
    },
    {
      $inc: {
        occurrenceCount: count,
      },
      $set: {
        lastSeen: newDate,
      },
    },
  );
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
  errData: ErrorBucket[],
  projectId: string,
  generateFingerPrint: (
    projectId: string,
    name: string,
    message: string,
  ) => string,
) => {
  const projectObjectId = new Types.ObjectId(projectId);

  return IssueModel.bulkWrite(
    errData.map((err) => {
      const {
        error: { name, message },
        count,
        lastSeen,
        firstSeen,
      } = err;

      const fingerprint = generateFingerPrint(projectId, name, message);

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
