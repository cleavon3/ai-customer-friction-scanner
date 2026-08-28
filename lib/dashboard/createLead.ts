import { createClient } from "@/lib/supabase/server";

export async function createLead(email: string, storeUrl: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("leads")
    .insert({
      email,

      store_url: storeUrl,

      category: "Ecommerce",

      status: "FREE_SCAN_COMPLETED",
    })
    .select()
    .single();

  if (error) {
    console.error("CREATE LEAD ERROR:", error);

    throw error;
  }

  return data;
}
