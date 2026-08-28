import { BrevoClient } from "@getbrevo/brevo";

console.log("EMAIL MODULE LOADED");

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY!,
});

const calendlyUrl =
  "https://calendly.com/cleavondigital/marketing-ai-growth-strategy-session";

export async function sendFrictionReportEmail(
  email: string,
  report: any,
  pdfUrl?: string,
) {
  console.log("SEND FREE REPORT EMAIL:", email);

  const emailPayload = {
    subject: "Your Shopify Friction Report Is Ready",

    sender: {
      name: "AI Customer Friction Scanner",
      email: process.env.BREVO_SENDER_EMAIL,
    },

    to: [
      {
        email,
      },
    ],

    htmlContent: `

    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">

      <h2>
        Your Shopify Friction Report
      </h2>


      <h1>
        ${report.score}/100
      </h1>


      <p>
        Your AI customer friction analysis is complete.
      </p>


      <h3>
        Main Issues Found
      </h3>


      <ul>

      ${report.issues
        .map(
          (issue: any) => `

          <li style="margin-bottom:15px">

            <strong>
              ${issue.title}
            </strong>

            <br/>

            ${issue.recommendation}

          </li>

          `,
        )
        .join("")}

      </ul>


      ${
        pdfUrl
          ? `
          <br/>

          <a
            href="${pdfUrl}"
            style="
            display:inline-block;
            background:#111;
            color:#fff;
            padding:12px 20px;
            text-decoration:none;
            border-radius:6px;
            "
          >
            Download My Free Friction Report
          </a>
          `
          : ""
      }


      <div
        style="
        margin-top:35px;
        padding:25px;
        background:#f5f7fb;
        border-radius:12px;
        "
      >

        <h3>
          Want Help Improving Your Store?
        </h3>


        <p>
          Book a free AI growth strategy session and review your biggest
          conversion opportunities.
        </p>


        <a
          href="${calendlyUrl}"
          target="_blank"
          style="
          display:inline-block;
          background:#2563eb;
          color:#fff;
          padding:14px 22px;
          text-decoration:none;
          border-radius:8px;
          font-weight:bold;
          "
        >
          Book My Free Strategy Call
        </a>


      </div>


    </div>

    `,
  };

  await client.transactionalEmails.sendTransacEmail(emailPayload);

  console.log("FREE REPORT EMAIL SENT");
}

export async function sendPremiumAuditEmail(
  email: string,
  report: any,
  pdfUrl: string,
) {
  console.log("SEND PREMIUM EMAIL:", email);

  const emailPayload = {
    subject: "Your Premium Shopify Intelligence Audit Is Ready",

    sender: {
      name: "AI Customer Friction Scanner",
      email: process.env.BREVO_SENDER_EMAIL,
    },

    to: [
      {
        email,
      },
    ],

    htmlContent: `


<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">


<h2>
Your Premium Shopify Intelligence Audit Is Ready
</h2>



<p>
Your AI-powered conversion analysis has been completed.
</p>



<h3>
Overall Friction Score
</h3>


<h1>
${report.overallScore}/100
</h1>



<p>
Your report includes:
</p>



<ul>

<li>
Trust & credibility analysis
</li>

<li>
Product confidence analysis
</li>

<li>
Customer journey opportunities
</li>

<li>
AI implementation roadmap
</li>

</ul>



<br/>


<a
href="${pdfUrl}"
style="
display:inline-block;
background:#111;
color:#fff;
padding:12px 20px;
text-decoration:none;
border-radius:6px;
"
>
Download My Premium Audit
</a>



<div
style="
margin-top:35px;
padding:25px;
background:#f5f7fb;
border-radius:12px;
"
>


<h3>
Ready To Turn Insights Into Growth?
</h3>


<p>
Your audit identifies conversion barriers inside your store.
Book a free strategy session to discuss opportunities.
</p>



<a
href="${calendlyUrl}"
target="_blank"
style="
display:inline-block;
background:#2563eb;
color:white;
padding:14px 22px;
text-decoration:none;
border-radius:8px;
font-weight:bold;
"
>
Book My Free Strategy Call
</a>


</div>



</div>


`,
  };

  await client.transactionalEmails.sendTransacEmail(emailPayload);

  console.log("PREMIUM EMAIL SENT");
}
