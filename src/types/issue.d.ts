export type ErrorBucket = {
  error: CreateIssueType;
  count: number;
  firstSeen: number;
  lastSeen: number;
};

type User = {
  id: string;
  name: string;
  email: string;
};

type CreateIssueEventType = Omit<CreateIssueType, "name" | "message"> & {
  issueId: string;
  projectId: string;
  user: User;
  fingerprint: string;
};

export type CreateIssueType = {
  message: string;
  name: string;
  environment: "development" | "staging" | "production";
  stack?: string;
  code?: string;
  level: "fatal" | "error" | "warning" | "info";
  server?: {
    hostname: string;
    region: string;
  };
  route?: string;

  request?: {
    method: string;
    url: string;
    path: string;

    query?: any;
    body?: any;
    headers: any;
  };

  runtime: {
    nodeVersion: string;
    platform: string;
    memoryUsage: number;
    cpuUsage: number;
    ip?: string;
  };
  release?: string;

  browser?: {
    name: string;
    version: string;
  };
  device?: string;

  tags?: Record<string, string>;

  metadata?: any;

  sdk: {
    name: string;
    version: string;
  };
};
