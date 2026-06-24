import { CreateIssueType } from "@/modules/issue/issue.model.ts";
import type { CreateIssueEventType } from "@/modules/issueEvent/issueEvent.model.ts";

// export type ErrorBucket = {
//   name: string;
//   message: string;
//   count: number;
//   firstSeen: number;
//   lastSeen: number;
//   error: CreateIssueEventType;
// };

type User = {
  id: string;
  name: string;
  email: string;
};

// export type CreateIssueEventType = {
//   environment: "development" | "staging" | "production";
//   stack?: string;
//   code?: string;
//   level: "fatal" | "error" | "warning" | "info";
//   server?: {
//     hostname: string;
//     region: string;
//   };
//   route?: string;

//   request?: {
//     method: string;
//     url: string;
//     path: string;

//     query?: any;
//     body?: any;
//     headers: any;
//   };

//   runtime: {
//     nodeVersion: string;
//     platform: string;
//     memoryUsage: number;
//     cpuUsage: number;
//     ip?: string;
//   };

//   release?: string;

//   browser?: {
//     name: string;
//     version: string;
//   };

//   device?: string;

//   tags?: Record<string, string> | null | undefined;

//   metadata?: any;

//   sdk: {
//     name: string;
//     version: string;
//   };
// };
