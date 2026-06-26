const GHL_WEBHOOKS = {
  contact: process.env.GHL_CONTACT_WEBHOOK,
  getStarted: process.env.GHL_GET_STARTED_WEBHOOK,
  guideOptIn: process.env.GHL_GUIDE_OPTIN_WEBHOOK,
  newsletter: process.env.GHL_NEWSLETTER_WEBHOOK,
  secondOpinion: process.env.GHL_SECOND_OPINION_WEBHOOK,
  realtor: process.env.GHL_REALTOR_WEBHOOK,
};

export type GHLWebhookKey = keyof typeof GHL_WEBHOOKS;

export async function sendToGHL(
  webhookKey: GHLWebhookKey,
  data: Record<string, unknown>,
) {
  const url = GHL_WEBHOOKS[webhookKey];
  // If no webhook is configured (e.g. before Mike fills these in), no-op
  // gracefully so the form still returns a success response.
  if (!url) {
    console.warn(
      `[GHL] No webhook configured for "${webhookKey}". Skipping send.`,
    );
    return;
  }
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
