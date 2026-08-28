import { createClient } from "@/lib/supabase/server";

export async function updateLeadStatus(leadId: string, status: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("leads")
    .update({
      status,
    })
    .eq("id", leadId);

  if (error) {
    console.error("STATUS UPDATE ERROR:", error);

    throw error;
  }

  return true;
}
