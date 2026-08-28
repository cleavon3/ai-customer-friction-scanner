import { createClient } from "@/lib/supabase/server";

export async function getDashboardLeads() {
  const supabase = await createClient();

  const { data, error } = await supabase

    .from("leads")

    .select(
      `
      id,
      email,
      store_url,
      category,
      friction_score,
      status,
      created_at,
      reports(
        id,
        score,
        created_at
      )
    `,
    )

    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("DASHBOARD DATA ERROR:", error);

    return [];
  }

  return (
    data?.map((lead) => ({
      id: lead.id,

      storeName: lead.store_url,

      storeUrl: lead.store_url,

      ownerEmail: lead.email,

      industry: lead.category,

      score: lead.friction_score,

      status: lead.status,

      createdAt: lead.created_at,

      audits: lead.reports || [],
    })) || []
  );
}
