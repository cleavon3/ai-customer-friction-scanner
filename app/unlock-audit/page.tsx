"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UnlockAuditPage() {
  const searchParams = useSearchParams();

  const auditId = searchParams.get("id");

  const [email, setEmail] = useState("");

  const [processing, setProcessing] = useState(false);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();

    console.log("CUSTOMER EMAIL:", email);

    if (!auditId) {
      console.error("Missing audit ID");

      return;
    }

    const customerEmail = email.trim();

    if (!customerEmail) {
      alert("Please enter your email address");

      return;
    }

    if (processing) {
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          auditId,

          email: customerEmail,
        }),
      });

      const data = await response.json();

      console.log("STRIPE CHECKOUT RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.error || "Checkout creation failed");
      }

      if (!data.checkoutUrl) {
        throw new Error("Stripe checkout URL missing");
      }

      window.location.assign(data.checkoutUrl);
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);

      setProcessing(false);
    }
  }

  return (
    <main className="unlock-page">
      <section className="unlock-hero">
        <span className="eyebrow">PREMIUM STORE INTELLIGENCE AUDIT</span>

        <h1>Turn Your Store Friction Into A Conversion Growth Plan</h1>

        <p>
          Your free scan identified potential conversion barriers. Unlock the
          complete AI-powered audit and conversion roadmap.
        </p>

        <form onSubmit={handleCheckout} className="premium-price-card">
          <h2>Complete Store Audit</h2>

          <div className="price">$49</div>

          <p>One-time payment</p>

          <label className="email-label">
            Where should we send your audit?
          </label>

          <label className="email-label">Email address</label>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
          />

          <button type="submit" className="report-button" disabled={processing}>
            {processing ? "Redirecting to Stripe..." : "Continue To Checkout"}
          </button>
        </form>
      </section>

      <section className="section">
        <h2>What You Unlock</h2>

        <div className="industry-grid">
          <div className="industry-card">
            <h3>Homepage Analysis</h3>

            <p>
              Identify messaging problems, trust gaps, and missed conversion
              opportunities.
            </p>
          </div>

          <div className="industry-card">
            <h3>Product Page Optimization</h3>

            <p>
              Discover missing information preventing customers from buying.
            </p>
          </div>

          <div className="industry-card">
            <h3>Customer Journey Map</h3>

            <p>Understand where visitors hesitate before purchasing.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
