import { createAdminClient } from "@/lib/supabase/admin";

export async function uploadPremiumReport(pdfBuffer: Buffer, fileName: string) {
  const supabase = createAdminClient();
  /*
  ==========================
  UPLOAD PDF TO PRIVATE BUCKET
  ==========================
  */

  const { error } = await supabase.storage
    .from("premium-reports")
    .upload(fileName, pdfBuffer, {
      contentType: "application/pdf",

      upsert: true,
    });

  if (error) {
    console.error("PDF UPLOAD ERROR:", error);

    throw error;
  }

  /*
  ==========================
  CREATE TEMPORARY DOWNLOAD LINK
  ==========================
  */

  const { data: signedUrlData, error: signedError } = await supabase.storage
    .from("premium-reports")
    .createSignedUrl(
      fileName,

      60 * 60 * 24 * 30, // 30 days
    );

  if (signedError) {
    console.error("SIGNED URL ERROR:", signedError);

    throw signedError;
  }

  console.log("PDF SIGNED URL CREATED");

  return signedUrlData.signedUrl;
}
