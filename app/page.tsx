import ScannerForm from "@/components/ScannerForm";

export default function Home() {
  return (
    <main className="landing-page">
      {/* NAVBAR */}

      <nav className="navbar">
        <div className="brand">
          <strong>AI Customer Friction Scanner</strong>

          <small>A Skill Digital Solutions product</small>
        </div>

        <a href="#scanner">Get Free Report</a>
      </nav>

      {/* HERO */}

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">AI-Powered Shopify Conversion Audit</span>

          <h1>Discover Why Customers Visit Your Shopify Store But Don't Buy</h1>

          <p className="hero-text">
            AI analyzes your store experience, identifies hidden customer
            friction points, and shows what is preventing visitors from becoming
            buyers.
          </p>

          <div className="trust-row">
            <span className="trust-item">✓ No Shopify login required</span>

            <span className="trust-item">⚡ AI conversion analysis</span>

            <span className="trust-item">⏱ Results in minutes</span>
          </div>

          <div id="scanner">
            <ScannerForm />
          </div>
        </div>
      </section>

      {/* REPORT PREVIEW */}

      <section className="score-section">
        <h2>See What Your AI Friction Report Reveals</h2>

        <p>
          Your free report identifies trust gaps, customer questions, and buying
          barriers affecting conversions.
        </p>

        <div className="score-card">
          <div className="example-score">68</div>

          <h3>Store Friction Score</h3>

          <div className="score-grid">
            <span>Trust 72/100</span>

            <span>Clarity 64/100</span>

            <span>Product Confidence 58/100</span>

            <span>Buying Guidance 70/100</span>
          </div>

          <div className="finding-box">
            <h4>Biggest Opportunity</h4>

            <strong>Product Confidence: 58/100</strong>

            <p>
              Customers may hesitate because they do not have enough information
              to confidently choose your product.
            </p>

            <b>Recommendation:</b>

            <p>Add FAQs, comparisons, reviews, and buying guidance.</p>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}

      <section className="industry-section">
        <h2>Built For Shopify Brands Selling Online</h2>

        <div className="industry-grid">
          <div className="industry-card">
            <span>BEAUTY</span>

            <h3>Beauty & Skincare</h3>

            <p>Improve trust, ingredient education, and customer confidence.</p>
          </div>

          <div className="industry-card">
            <span>FASHION</span>

            <h3>Fashion</h3>

            <p>Reduce sizing concerns and purchase hesitation.</p>
          </div>

          <div className="industry-card">
            <span>WELLNESS</span>

            <h3>Supplements</h3>

            <p>Address trust, safety, and customer objections.</p>
          </div>

          <div className="industry-card">
            <span>LIFESTYLE</span>

            <h3>Home & Lifestyle</h3>

            <p>Help shoppers understand products and decide faster.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="steps-section">
        <h2>How The AI Friction Analysis Works</h2>

        <div className="steps-grid">
          <div className="step-card">
            <h3>01. Analyze Your Store</h3>

            <p>
              AI reviews your homepage, product pages, trust signals, and
              customer journey.
            </p>
          </div>

          <div className="step-card">
            <h3>02. Detect Customer Friction</h3>

            <p>
              Find where visitors hesitate, lose confidence, or abandon
              purchases.
            </p>
          </div>

          <div className="step-card">
            <h3>03. Get Conversion Actions</h3>

            <p>Receive practical recommendations to remove buying barriers.</p>
          </div>
        </div>
      </section>

      {/* BEFORE AFTER */}

      <section className="before-after-section">
        <h2>Turn Customer Confusion Into Confidence</h2>

        <div className="before-after">
          <div className="before-card">
            <h3>Before Analysis</h3>

            <p>❌ Visitors leave with unanswered questions</p>

            <p>❌ Product pages create uncertainty</p>

            <p>❌ Customers hesitate before buying</p>
          </div>

          <div className="after-card">
            <h3>After Optimization</h3>

            <p>✓ Clearer buying decisions</p>

            <p>✓ Stronger customer trust</p>

            <p>✓ Better conversion opportunities</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="final-cta">
        <div className="cta-content">
          <span className="cta-label">FREE AI STORE ANALYSIS</span>

          <h2>Discover What Is Blocking Your Shopify Growth</h2>

          <p>
            Get your AI Customer Friction Report and uncover trust gaps, buying
            barriers, and conversion leaks.
          </p>

          <a href="#scanner" className="primary-button">
            Get My Free Friction Report
          </a>
        </div>
      </section>
    </main>
  );
}
