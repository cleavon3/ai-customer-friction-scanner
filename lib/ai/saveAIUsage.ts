import { createClient } from "@/lib/supabase/server";

export async function saveAIUsage({
  auditId = null,

  model,

  tokens,

  cost,
}: {
  auditId?: string | null;

  model: string;

  tokens: number;

  cost: number;
}) {
  const supabase = await createClient();

  const { error } = await supabase

    .from("ai_usage")

    .insert({
      audit_id: auditId,

      model,

      tokens,

      cost,
    });

  if (error) {
    console.error("AI USAGE SAVE ERROR:", error);

    throw error;
  }

  return {
    success: true,
  };
}
