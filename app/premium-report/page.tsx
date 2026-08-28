import { Suspense } from "react";

import PremiumReportClient from "./PremiumReportClient";

export default function PremiumReportPage() {
  return (
    <Suspense
      fallback={
        <main className="unlock-page">
          <section className="unlock-hero">
            <h1>Loading your premium audit...</h1>

            <p>Preparing your report.</p>
          </section>
        </main>
      }
    >
      <PremiumReportClient />
    </Suspense>
  );
}
