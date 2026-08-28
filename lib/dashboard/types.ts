export interface DashboardLead {
  id: string;

  storeName: string;

  storeUrl: string;

  ownerEmail: string;

  industry: string;

  score: number;

  status:
    | "NEW_LEAD"
    | "FREE_SCAN_COMPLETED"
    | "REPORT_SENT"
    | "STRATEGY_CALL_BOOKED"
    | "AUDIT_PURCHASED"
    | "IMPLEMENTATION_CLIENT";

  createdAt: string;

  auditCount: number;
}

export interface AIUsageStats {
  totalScans: number;

  successfulReports: number;

  failedScans: number;

  apiCost: number;

  averageCost: number;
}
