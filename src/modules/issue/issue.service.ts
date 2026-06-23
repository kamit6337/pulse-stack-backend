import { ErrorBucket } from "@/types/issue.js";
import { SDK_ENCRYPTION_OBJECT } from "@/types/sdk.js";
import generateFingerPrint from "@/utils/generateFingerPrint.js";
import { createUpdateIssueBulkWriteDB } from "./issue.db.js";

export const createNewIssue = async (
  sdk: SDK_ENCRYPTION_OBJECT,
  errData: ErrorBucket[],
) => {
  const results = await createUpdateIssueBulkWriteDB(
    errData,
    sdk.projectId,
    generateFingerPrint,
  );

  console.log("RESULTS", results);

  return {
    message: "Error Saved Successfully",
  };
};
