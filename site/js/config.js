/* ==========================================================================
   Andreis Service — Central configuration
   --------------------------------------------------------------------------
   One place for all business contact data and lead-integration settings.
   Replace the placeholder values below with the real credentials before
   going live. Until real endpoints are configured the form runs in safe
   "mock" mode: validation, success state and UX work fully, and the lead
   payload is logged to the browser console instead of being sent.
   ========================================================================== */

window.ANDREIS_CONFIG = {

  /* ----- Public business contact details (used across the UI) ----- */
  contact: {
    // International format without spaces for tel:/wa.me links.
    phoneDisplay: "+49 176 70756221",
    phoneHref: "+4917670756221",
    whatsappNumber: "4917670756221",          // wa.me/<number>
    telegramUser: "AndreisService",           // t.me/<user>
    email: "andreis.service@gmail.com",
    instagram: "https://www.instagram.com/andreisservice?igsh=MTI1Y3Fyc2Ywdm14bA==",
    serviceArea: "Berlin & Brandenburg"
  },

  /* ----- Pre-filled WhatsApp / Telegram message ----- */
  prefill: {
    de: "Hallo Andreis Service, ich interessiere mich fur eine Montage. Ich wurde gerne eine Ersteinschatzung erhalten.",
    en: "Hello Andreis Service, I am interested in an installation and would like to receive a preliminary estimate."
  },

  /* ----- Lead delivery integration -----------------------------------
     TELEGRAM:
       Set enabled = true, then fill botToken + chatId. The form sends a
       formatted message to your Telegram chat via the Bot API.
       Note: putting a bot token in client-side code exposes it publicly.
       For production prefer routing through your own backend / serverless
       endpoint and set `endpoint` below instead.

     EMAIL:
       Set enabled = true and provide an `endpoint` that accepts a JSON
       POST (e.g. a serverless function, Formspree, your own PHP mailer).
  -------------------------------------------------------------------- */
  integrations: {

    // Option A — your own backend/serverless endpoint (recommended).
    // Receives the full JSON lead payload via POST. Leave empty to skip.
    endpoint: "",

    telegram: {
      enabled: false,
      botToken: "REPLACE_WITH_TELEGRAM_BOT_TOKEN",
      chatId: "REPLACE_WITH_TELEGRAM_CHAT_ID"
    },

    email: {
      enabled: false,
      // A JSON-accepting mail endpoint (e.g. Formspree form id URL).
      endpoint: "REPLACE_WITH_EMAIL_ENDPOINT"
    }
  }
};

/* ==========================================================================
   Lead submission handler
   Returns a Promise that resolves on success and rejects on failure.
   ========================================================================== */
window.submitLead = async function submitLead(payload) {
  const cfg = window.ANDREIS_CONFIG;
  const tasks = [];

  // 1) Generic backend endpoint
  if (cfg.integrations.endpoint) {
    tasks.push(fetch(cfg.integrations.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }));
  }

  // 2) Telegram Bot API
  const tg = cfg.integrations.telegram;
  if (tg.enabled && tg.botToken && !tg.botToken.startsWith("REPLACE")) {
    const text = formatLeadAsText(payload);
    tasks.push(fetch(`https://api.telegram.org/bot${tg.botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: tg.chatId, text, parse_mode: "HTML" })
    }));
  }

  // 3) Dedicated email endpoint
  const mail = cfg.integrations.email;
  if (mail.enabled && mail.endpoint && !mail.endpoint.startsWith("REPLACE")) {
    tasks.push(fetch(mail.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }));
  }

  // No integration configured → safe mock mode.
  if (tasks.length === 0) {
    console.info("[Andreis Service] Lead captured (mock mode — configure js/config.js to deliver):", payload);
    await new Promise((r) => setTimeout(r, 650)); // simulate network latency
    return { ok: true, mock: true };
  }

  const results = await Promise.allSettled(tasks);
  const anyOk = results.some((r) => r.status === "fulfilled" && (!r.value || r.value.ok !== false));
  if (!anyOk) throw new Error("All lead delivery attempts failed.");
  return { ok: true, mock: false };
};

/* Human-readable lead text (used for Telegram / logging). */
function formatLeadAsText(p) {
  const line = (label, val) => (val ? `<b>${label}:</b> ${escapeHtml(String(val))}\n` : "");
  return (
    "🛠 <b>Neue Anfrage — Andreis Service</b>\n\n" +
    line("Typ", p.formType) +
    line("Name", p.name) +
    line("Telefon", p.phone) +
    line("Email", p.email) +
    line("Service", p.service) +
    line("Adresse", p.address) +
    line("Link", p.link) +
    line("Termin", p.date) +
    line("Budget", p.budget) +
    line("Dateien", p.files) +
    line("Kommentar", p.comment) +
    line("Sprache", p.lang)
  );
}

function escapeHtml(s) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}
