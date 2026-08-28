import type { AuditSession } from "@/lib/deepAudit/types";

declare global {
  var auditSessions: Map<string, AuditSession> | undefined;
}

export {};
