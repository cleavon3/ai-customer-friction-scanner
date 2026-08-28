import { Suspense } from "react";

import UnlockAuditClient from "./UnlockAuditClient";

export default function UnlockAuditPage() {
  return (
    <Suspense
      fallback={
        <main className="unlock-page">
          <section className="unlock-hero">
            <h1>Loading Premium Audit...</h1>

            <p>Preparing your checkout.</p>
          </section>
        </main>
      }
    >
      <UnlockAuditClient />
    </Suspense>
  );
}
