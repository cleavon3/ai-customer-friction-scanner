import { createClient } from "@/lib/supabase/server";

export async function savePayment(
  leadId: string,
  amount: number,
  currency: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("payments")
    .insert({
      lead_id: leadId,

      amount,

      currency,

      product: "Premium Audit",

      status: "paid",
    })
    .select()
    .single();

  if (error) {
    console.error("PAYMENT SAVE ERROR:", error);

    throw error;
  }

  return data;
}
