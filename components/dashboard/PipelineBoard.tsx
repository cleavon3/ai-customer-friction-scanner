"use client";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { useState } from "react";

type Lead = {
  id: string;
  storeName: string;
  score: number;
  status: string;
};

const statuses = [
  {
    key: "NEW_LEAD",
    label: "New Lead",
  },

  {
    key: "FREE_SCAN_COMPLETED",
    label: "Free Scan Completed",
  },

  {
    key: "REPORT_SENT",
    label: "Report Sent",
  },

  {
    key: "STRATEGY_CALL_BOOKED",
    label: "Strategy Call Booked",
  },

  {
    key: "AUDIT_PURCHASED",
    label: "Audit Purchased",
  },

  {
    key: "IMPLEMENTATION_CLIENT",
    label: "Implementation Client",
  },
];

export default function PipelineBoard({ leads }: { leads: Lead[] }) {
  const router = useRouter();

  const [updating, setUpdating] = useState("");

  async function updateStatus(leadId: string, status: string) {
    setUpdating(leadId);

    await fetch("/api/dashboard/update-status", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        leadId,

        status,
      }),
    });

    setUpdating("");

    router.refresh();
  }

  return (
    <section className="dashboard-card">
      <div className="card-header">
        <div>
          <h2>Sales Pipeline</h2>

          <p>Move leads through your customer journey.</p>
        </div>
      </div>

      <div className="pipeline-board">
        {statuses.map((stage) => (
          <div key={stage.key} className="pipeline-column">
            <div className="pipeline-header">
              <h3>{stage.label}</h3>

              <span>
                {leads.filter((lead) => lead.status === stage.key).length}
              </span>
            </div>

            {leads

              .filter((lead) => lead.status === stage.key)

              .map((lead) => (
                <Link
                  key={lead.id}
                  href={`/dashboard/leads/${lead.id}`}
                  className="pipeline-card"
                >
                  <strong>{lead.storeName}</strong>

                  <p>Score: {lead.score}/100</p>

                  <select
                    value={lead.status}
                    disabled={updating === lead.id}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                  >
                    {statuses.map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </Link>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}
