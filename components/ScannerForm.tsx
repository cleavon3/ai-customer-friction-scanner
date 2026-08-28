"use client";

import { useState } from "react";

import FrictionReport from "./FrictionReport";

type Report = {
  score: number;

  categories: {
    trust: number;

    clarity: number;

    productConfidence: number;

    buyingGuidance: number;
  };

  issues: {
    title: string;

    problem: string;

    impact: string;

    recommendation: string;
  }[];
};

export default function ScannerForm() {
  const [storeUrl, setStoreUrl] = useState("");

  const [email, setEmail] = useState("");

  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const [analysisStep, setAnalysisStep] = useState("");

  const [message, setMessage] = useState("");

  const [report, setReport] = useState<Report | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    setReport(null);

    setMessage("");

    setAnalysisStep("Connecting to store...");

    try {
      setTimeout(() => {
        setAnalysisStep("Scanning customer experience signals...");
      }, 1000);

      setTimeout(() => {
        setAnalysisStep("Checking trust and buying barriers...");
      }, 2000);

      setTimeout(() => {
        setAnalysisStep("Generating AI friction report...");
      }, 3000);

      const response = await fetch(
        "/api/analyze-store",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            storeUrl,

            email,

            category,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setReport(data.report);

      setAnalysisStep("Report completed");

      setMessage("Your friction analysis is ready.");

      setTimeout(() => {
        document

          .getElementById("friction-result")

          ?.scrollIntoView({
            behavior: "smooth",

            block: "start",
          });
      }, 300);
    } catch (error) {
      console.error("SCANNER ERROR:", error);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage(
          "This does not appear to be an ecommerce store. Please enter a Shopify store URL..",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="scanner-card" onSubmit={handleSubmit}>
        <h2>Get Your Free Shopify Conversion Leak Report</h2>

        <p>
          Discover trust gaps, customer objections, and buying barriers reducing
          conversions.
        </p>

        <div className="report-benefits">
          <span>✓ Customer friction score</span>

          <span>✓ Trust gap analysis</span>

          <span>✓ Product confidence review</span>

          <span>✓ Conversion improvements</span>
        </div>

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

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select store category</option>

          <option>Beauty & Skincare</option>

          <option>Fashion</option>

          <option>Supplements</option>

          <option>Home & Lifestyle</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "AI Analyzing..." : "Get My Free Friction Report"}
        </button>

        {loading && (
          <div className="ai-loader">
            <div className="loader-ring"></div>

            <p>{analysisStep}</p>

            <div className="scan-steps">
              <span>✓ Homepage analysis</span>

              <span>✓ Trust signal detection</span>

              <span>✓ Customer friction scoring</span>
            </div>
          </div>
        )}

        {message && <p className="form-message">{message}</p>}
      </form>

      {report && <FrictionReport report={report} />}
    </>
  );
}
