"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { FreeAuditPreview } from "@/lib/deepAudit/types";

export default function DeepAuditForm() {
  const router = useRouter();

  const [storeUrl, setStoreUrl] = useState("");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [preview, setPreview] = useState<FreeAuditPreview | null>(null);

  const [auditId, setAuditId] = useState("");

  const reportRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {
      const response = await fetch("/api/deep-audit", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          storeUrl,

          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Audit failed");
      }

      setPreview(data.preview);

      setAuditId(data.auditId);

      setMessage("Your free audit preview is ready.");

      setTimeout(() => {
        reportRef.current?.scrollIntoView({
          behavior: "smooth",

          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error("DEEP AUDIT ERROR:", error);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="scanner-card" onSubmit={handleSubmit}>
        <h2>Start Your Store Audit</h2>

        <p>Discover the biggest conversion barriers affecting your store.</p>

        <input
          type="url"
          placeholder="https://yourstore.com"
          value={storeUrl}
          onChange={(e) => setStoreUrl(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing Store..." : "Get Free Store Audit"}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>

      {preview && (
        <div ref={reportRef}>
          <FreePreviewReport preview={preview} auditId={auditId} />
        </div>
      )}
    </>
  );
}

function FreePreviewReport({
  preview,

  auditId,
}: {
  preview: FreeAuditPreview;

  auditId: string;
}) {
  const router = useRouter();
  return (
    <section className="friction-report">
      <div className="report-header">
        <span className="eyebrow">FREE STORE AUDIT PREVIEW</span>

        <h2>Your Store Growth Score</h2>
      </div>

      <div className="score-circle">
        <strong>{preview.score}</strong>

        <span>/100</span>
      </div>

      <div className="category-grid">
        <div>
          <span>Trust</span>

          <strong>{preview.categories.trust}/100</strong>
        </div>

        <div>
          <span>Products</span>

          <strong>{preview.categories.products}/100</strong>
        </div>

        <div>
          <span>Journey</span>

          <strong>{preview.categories.journey}/100</strong>
        </div>
      </div>

      <h3>Top Conversion Opportunities</h3>

      {preview.topIssues?.map((issue, index) => (
        <div key={index} className="issue-card">
          <h4>{issue.title}</h4>

          <span className="issue-label">Why this matters</span>

          <p>{issue.impact}</p>
        </div>
      ))}

      <div className="audit-cta">
        <span className="cta-label">PREMIUM STORE AUDIT</span>

        <h3>Your Free Scan Found Conversion Barriers</h3>

        <p>
          Your store has additional opportunities hidden beyond this preview.
          Unlock the complete audit to discover exactly what is blocking more
          sales.
        </p>

        <div className="locked-benefits">
          <div>🔒 Homepage Conversion Analysis</div>

          <div>🔒 Product Page Optimization Plan</div>

          <div>🔒 Customer Journey Friction Map</div>

          <div>🔒 Priority Fix Roadmap</div>
        </div>

        <button
          className="report-button"
          onClick={() => router.push(`/unlock-audit?id=${auditId}`)}
        >
          Unlock Complete Audit
        </button>
      </div>
    </section>
  );
}
