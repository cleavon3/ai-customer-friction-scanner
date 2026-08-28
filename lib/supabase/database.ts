import { createClient } from "./server";

export async function saveLead(data: {
  storeName: string;

  storeUrl: string;

  ownerEmail: string;

  industry?: string;

  score: number;
}) {
  const supabase = await createClient();

  const { data: lead, error } = await supabase
    .from("leads")
    .insert({
      store_name: data.storeName,

      store_url: data.storeUrl,

      owner_email: data.ownerEmail,

      industry: data.industry,

      score: data.score,

      status: "FREE_SCAN_COMPLETED",
    })
    .select()
    .single();

  if (error) throw error;

  return lead;
}
