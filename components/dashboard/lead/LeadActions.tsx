"use client";

import { useRouter } from "next/navigation";

type Props = {
  leadId: string;
  status: string;
};

const actions = [
  {
    label: "Report Sent",
    status: "REPORT_SENT",
  },

  {
    label: "Strategy Call Booked",
    status: "STRATEGY_CALL_BOOKED",
  },

  {
    label: "Audit Purchased",
    status: "AUDIT_PURCHASED",
  },

  {
    label: "Implementation Client",
    status: "IMPLEMENTATION_CLIENT",
  },
];

export default function LeadActions({ leadId, status }: Props) {
  const router = useRouter();

  async function updateStatus(newStatus: string) {
    await fetch("/api/dashboard/update-status", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        leadId,

        status: newStatus,
      }),
    });

    router.refresh();
  }

  return (
    <section className="dashboard-card">
      <h2>Lead Actions</h2>

      <div className="lead-actions">
        {actions.map((action) => (
          <button
            key={action.status}
            onClick={() => updateStatus(action.status)}
            disabled={status === action.status}
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}
