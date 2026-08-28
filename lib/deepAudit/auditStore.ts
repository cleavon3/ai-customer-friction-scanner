import { createClient } from "@/lib/supabase/server";

// ==========================
// CREATE AUDIT SESSION
// ==========================

export async function createAuditSession(data: {
  storeUrl: string;
  email: string;
  leadId: string;
  freePreviewGenerated: boolean;
  premiumUnlocked: boolean;
}) {
  const supabase = await createClient();

  const { data: session, error } = await supabase
    .from("audit_sessions")
    .insert({
      store_url: data.storeUrl,

      email: data.email,

      lead_id: data.leadId,

      free_preview_generated: data.freePreviewGenerated,

      premium_unlocked: data.premiumUnlocked,

      report_status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("CREATE AUDIT SESSION ERROR:", error);

    throw error;
  }

  return formatAuditSession(session);
}

// ==========================
// GET AUDIT SESSION
// ==========================

export async function getAuditSession(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("audit_sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("GET AUDIT SESSION ERROR:", error);

    return null;
  }

  return formatAuditSession(data);
}

// ==========================
// UNLOCK PREMIUM AUDIT
// ==========================

export async function unlockPremiumAudit(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("audit_sessions")
    .update({
      premium_unlocked: true,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("UNLOCK PREMIUM ERROR:", error);

    throw error;
  }

  console.log("PREMIUM AUDIT UNLOCKED:", data.id);

  return formatAuditSession(data);
}

// ==========================
// UPDATE REPORT STATUS
// ==========================

export async function updateReportStatus(
  id: string,
  status: "pending" | "generating" | "completed" | "failed",
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("audit_sessions")
    .update({
      report_status: status,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("UPDATE REPORT STATUS ERROR:", error);

    throw error;
  }

  console.log("REPORT STATUS UPDATED:", data.id, status);

  return formatAuditSession(data);
}

// ==========================
// FORMAT RESPONSE
// ==========================

function formatAuditSession(session: any) {
  return {
    id: session.id,

    storeUrl: session.store_url,

    email: session.email,

    leadId: session.lead_id,

    freePreviewGenerated: session.free_preview_generated,

    premiumUnlocked: session.premium_unlocked,

    reportStatus: session.report_status,

    createdAt: session.created_at,
  };
}
