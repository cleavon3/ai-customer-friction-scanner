import { Suspense } from "react";

import AuditSuccessClient from "./AuditSuccessClient";

export default function AuditSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="unlock-page">
          <section className="unlock-hero">
            <h1>Loading payment confirmation...</h1>
          </section>
        </main>
      }
    >
      <AuditSuccessClient />
    </Suspense>
  );
}
