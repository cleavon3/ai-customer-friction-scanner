"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AuditSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const auditId = searchParams.get("id");

  const [status, setStatus] = useState(
    "Your payment has been confirmed. We are preparing your premium audit.",
  );

  const [emailVisible, setEmailVisible] = useState(false);

  const generationStarted = useRef(false);
  const checking = useRef(false);

  useEffect(() => {
    if (!auditId) return;

    let cancelled = false;

    const emailTimer = setTimeout(() => {
      if (!cancelled) {
        setEmailVisible(true);
      }
    }, 5000);

    async function startPremiumReport() {
      if (generationStarted.current) return;

      generationStarted.current = true;

      try {
        console.log("STARTING PREMIUM REPORT GENERATION");

        const response = await fetch("/api/premium-report", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            auditId,
          }),
        });

        const data = await response.json();

        console.log("PREMIUM REPORT RESPONSE:", data);
      } catch (error) {
        console.error("PREMIUM REPORT START ERROR:", error);
      }
    }

    async function checkStatus() {
      if (cancelled || checking.current) return;

      checking.current = true;

      try {
        const response = await fetch(`/api/audit-status?id=${auditId}`, {
          cache: "no-store",
        });

        const data = await response.json();

        console.log("AUDIT STATUS CHECK:", data);

        if (data.reportStatus === "completed") {
          setStatus("Your premium audit is ready. Opening your report...");

          setTimeout(() => {
            router.replace(`/premium-report?id=${auditId}`);
          }, 1500);

          return;
        }

        if (data.reportStatus === "generating") {
          setStatus(
            "Our AI engine is analysing your store, customer journey, and conversion opportunities.",
          );
        }

        if (
          data.reportStatus === "pending" ||
          data.reportStatus === undefined
        ) {
          setStatus("Payment confirmed. Starting your premium audit...");
        }
      } catch (error) {
        console.error("AUDIT STATUS ERROR:", error);
      } finally {
        checking.current = false;
      }

      if (!cancelled) {
        setTimeout(checkStatus, 5000);
      }
    }

    /*
    =========================
    WAIT 5 SECONDS THEN START
    =========================
    */

    const startTimer = setTimeout(async () => {
      await startPremiumReport();

      checkStatus();
    }, 5000);

    return () => {
      cancelled = true;

      clearTimeout(emailTimer);

      clearTimeout(startTimer);
    };
  }, [auditId, router]);

  return (
    <main className="unlock-page">
      <section className="unlock-hero">
        <span className="eyebrow">PAYMENT CONFIRMED</span>

        <h1>Your Premium Audit Is Being Prepared</h1>

        <p>{status}</p>

        <div className="premium-price-card">
          <h2>AI Customer Friction Scanner</h2>

          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              borderRadius: "12px",
              background: "#f7f7f7",
              textAlign: "left",
            }}
          >
            <strong>✓ Payment received</strong>

            <br />

            <span>Your Shopify intelligence report is being created.</span>
          </div>

          {emailVisible && (
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                background: "#ffffff",
              }}
            >
              <h3>✉ Report Delivery</h3>

              <p>
                Your secure PDF download link will be sent to your email once
                your audit is complete.
              </p>
            </div>
          )}

          <div
            style={{
              marginTop: "25px",
              textAlign: "left",
            }}
          >
            <p>Preparing your report:</p>

            <p>✓ Payment verified</p>

            <p>✓ Website analysis started</p>

            <p>◌ AI conversion analysis in progress</p>

            <p>◌ PDF report preparation</p>
          </div>
        </div>
      </section>
    </main>
  );
}
