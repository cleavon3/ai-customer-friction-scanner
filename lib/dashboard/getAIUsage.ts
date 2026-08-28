import { createClient } from "@/lib/supabase/server";

export async function getAIUsage() {
  const supabase = await createClient();

  const { data, error } = await supabase

    .from("ai_usage")

    .select("*")

    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);

    return [];
  }

  return data || [];
}
