"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import PremiumAuditReport from "@/components/PremiumAuditReport";

import type { PremiumAuditReport as AuditReport } from "@/lib/deepAudit/types";

export default function PremiumReportPage() {
  const searchParams = useSearchParams();

  const auditId = searchParams.get("id");

  const [report, setReport] = useState<AuditReport | null>(null);

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReport() {
      if (!auditId) {
        setError("Audit ID missing");

        setLoading(false);

        return;
      }

      try {
        const response = await fetch(`/api/get-premium-report?id=${auditId}`, {
          cache: "no-store",
        });

        const data = await response.json();

        console.log("LOADED PREMIUM REPORT:", data);

        if (!response.ok) {
          throw new Error(data.error || "Report not available");
        }

        setReport(data.report);

        setPdfUrl(data.pdfUrl || null);
      } catch (error) {
        console.error("REPORT LOAD ERROR:", error);

        setError(
          error instanceof Error ? error.message : "Unable to load report",
        );
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, [auditId]);

  if (loading) {
    return (
      <main className="unlock-page">
        <h1>Loading Your Premium Audit</h1>

        <p>Your completed AI conversion analysis is being prepared.</p>
      </main>
    );
  }

  if (error || !report) {
    return (
      <main className="unlock-page">
        <h1>Report Not Available</h1>

        <p>{error || "Your premium report could not be found."}</p>
      </main>
    );
  }

  return (
    <main className="unlock-page">
      <PremiumAuditReport report={report} pdfUrl={pdfUrl || undefined} />
    </main>
  );
}
