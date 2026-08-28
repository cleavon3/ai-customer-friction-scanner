export type AuditContext = {
  storeUrl: string;

  homepage: string;

  storeSignals: object;

  productAnalysis: object;

  customerJourney: object;

  productCount: number;

  policyPages: string[];
};

export function buildAuditPrompt(auditData: AuditContext) {
  return `


You are a senior ecommerce conversion strategist.

Analyze this ecommerce store and create a realistic conversion intelligence report.



Your goal:

- Identify customer friction
- Evaluate buying confidence
- Detect trust gaps
- Analyze product clarity
- Analyze customer journey problems
- Recommend practical improvements



SCORING FRAMEWORK:

You must score realistically.

Score ranges:

90-100:
Exceptional ecommerce experience.
Very strong trust, product clarity, and customer journey.
Almost no major friction.

75-89:
Strong store experience with some improvement opportunities.

60-74:
Average experience with noticeable conversion barriers.

40-59:
Weak customer experience with significant friction.

Below 40:
Major trust, clarity, or journey problems.


Important rules:

- Do not give 100 unless the store demonstrates exceptional excellence across all areas.
- A store can have strong products but weak trust.
- A store can have strong branding but poor conversion clarity.
- Missing reviews, guarantees, testimonials, policies, or buying guidance should reduce scores.
- Scores must match your findings.
- If you identify problems, scores must reflect those problems.

EXECUTIVE SUMMARY REQUIREMENTS:

Create a consultant-style business summary.

Do not write generic statements.

Explain:

- what is working
- what is limiting conversions
- the biggest revenue opportunity
- the main customer hesitation point


ACTION ROADMAP REQUIREMENTS:

Create a prioritized improvement roadmap.

Rank improvements by business impact.

Each roadmap item must include:

- Priority number
- Improvement title
- Current problem
- Conversion impact
- Recommended action
- Suggested timeframe


Think like a senior ecommerce growth consultant advising a business owner.

Return ONLY valid JSON.

Use exactly this structure:



{

"scores":{

"trust":0,

"products":0,

"journey":0,

"overall":0,

"reasoning":"Explain why these scores were given"

},



"executiveSummary":

"Short business summary explaining the biggest opportunities",





"trust":{

"strengths":[
""
],

"weaknesses":[
""
],

"findings":[

{

"title":"",

"description":"",

"impact":"",

"recommendation":"",

"priority":"High"

}

]

},





"products":{

"strengths":[
""
],

"weaknesses":[
""
],

"findings":[

{

"title":"",

"description":"",

"impact":"",

"recommendation":"",

"priority":"High"

}

]

},





"journey":{

"insights":[
""
],

"findings":[

{

"title":"",

"description":"",

"impact":"",

"recommendation":"",

"priority":"High"

}

]

},





"actionPlan":[

"First priority improvement",

"Second priority improvement",

"Third priority improvement"

]

}





Store Data:



${JSON.stringify(auditData, null, 2)}



`;
}
