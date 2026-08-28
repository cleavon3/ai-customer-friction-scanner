import DeepAuditForm from "@/components/DeepAuditForm";

export default function StoreAuditPage() {
  return (
    <main className="audit-page">
      <section className="audit-hero">
        <span className="eyebrow">PREMIUM CONVERSION AUDIT</span>

        <h1>Turn Your Store Friction Report Into A Growth Plan</h1>

        <p>
          Get a complete AI-powered conversion audit that reveals customer
          journey problems, trust gaps, product page issues, and opportunities
          to improve sales.
        </p>

        <DeepAuditForm />
      </section>

      <section className="section">
        <h2>What The Complete Audit Includes</h2>

        <div className="industry-grid">
          <div className="industry-card">
            <h3>Homepage Conversion Review</h3>

            <p>
              Identify unclear messaging, weak trust signals, and conversion
              barriers.
            </p>
          </div>

          <div className="industry-card">
            <h3>Product Page Analysis</h3>

            <p>
              Discover missing information that prevents customers from buying
              confidently.
            </p>
          </div>

          <div className="industry-card">
            <h3>Customer Journey Audit</h3>

            <p>
              Understand where visitors hesitate before completing purchases.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
