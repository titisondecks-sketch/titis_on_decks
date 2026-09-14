/* The booking pipeline - this site's first serverless function.
   Vercel deploys every file in /api as a standalone function, right
   next to the static Vite build.

   One POST does three things:
     1. notification mail to the collective (BOOKING_TO), with Reply-To
        set to the requester so answering is a single click
     2. a styled confirmation to the requester, in the site's warm
        night look and in the language the site was in
     3. a Telegram ping to every chat in TELEGRAM_CHAT_IDS

   Env (Vercel project settings - never in the repo):
     RESEND_API_KEY      required for any sending
     BOOKING_TO          recipient - kai@elita.de while testing,
                         glittawicca@proton.me once the girls take over
     BOOKING_FROM        optional - "TiTis on Decks <booking@titisondecks.com>"
                         once the domain is verified at Resend. Defaults
                         to Resend's onboarding sender, which only
                         delivers to the account owner's own address.
     TELEGRAM_BOT_TOKEN  optional - from @BotFather
     TELEGRAM_CHAT_IDS   optional - comma-separated chat ids

   Unconfigured -> 503, and the form on the site falls back to a plain
   mailto draft. */

import { BANNER_B64 } from './_banner.js'

const RESEND_URL = 'https://api.resend.com/emails'

const COPY = {
  de: {
    subject: 'Angekommen - deine Booking-Anfrage bei TiTis on Decks',
    hello: (name) => `Danke, ${name}!`,
    lines: [
      'Deine Anfrage ist bei uns gelandet. Wir hören sie uns in Ruhe an und melden uns persönlich - meistens innerhalb weniger Tage.',
      'Bis dahin: dreh die Sets laut.',
    ],
    echo: 'Das hast du uns geschickt',
    values: 'Unterschiedliche Sounds · Unterschiedliche Charaktere · Eine gemeinsame Frequenz',
    fields: { date: 'Datum', place: 'Ort', message: 'Nachricht' },
  },
  pt: {
    subject: 'Chegou - o teu pedido de booking aos TiTis on Decks',
    hello: (name) => `Obrigada, ${name}!`,
    lines: [
      'O teu pedido aterrou connosco. Vamos ouvi-lo com calma e responder pessoalmente - normalmente em poucos dias.',
      'Até lá: põe os sets bem alto.',
    ],
    echo: 'O que nos enviaste',
    values: 'Sons diferentes · Personalidades diferentes · Uma frequência partilhada',
    fields: { date: 'Data', place: 'Local', message: 'Mensagem' },
  },
  en: {
    subject: 'Landed - your booking request with TiTis on Decks',
    hello: (name) => `Thank you, ${name}!`,
    lines: [
      'Your request has landed with us. We will listen properly and get back to you personally - usually within a few days.',
      'Until then: play the sets loud.',
    ],
    echo: 'What you sent us',
    values: 'Different sounds · Different characters · One shared frequency',
    fields: { date: 'Date', place: 'Place', message: 'Message' },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method-not-allowed' })

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {}
  if (body.website) return res.status(200).json({ ok: true }) // honeypot: swallow bots silently

  const f = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    date: clean(body.date, 120),
    place: clean(body.place, 160),
    message: clean(body.message, 4000),
  }
  const lang = ['de', 'pt', 'en'].includes(body.lang) ? body.lang : 'en'
  if (!f.name || !f.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    return res.status(400).json({ error: 'invalid' })
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.BOOKING_TO
  if (!key || !to) return res.status(503).json({ error: 'not-configured' })
  const from = process.env.BOOKING_FROM || 'TiTis on Decks <onboarding@resend.dev>'

  const notify = await sendMail(key, {
    from,
    to,
    reply_to: f.email,
    subject: `Booking-Anfrage - ${f.name}${f.date ? ` (${f.date})` : ''}`,
    text: notifyText(f, lang),
  })
  if (!notify.ok) return res.status(502).json({ error: 'send-failed' })

  // best effort - a lost confirmation or ping must not fail the booking
  const c = COPY[lang]
  await Promise.allSettled([
    sendMail(key, {
      from,
      to: f.email,
      reply_to: to, // replying to the confirmation reaches the collective
      subject: c.subject,
      html: confirmationHtml(c, f),
      text: confirmationText(c, f),
      // the glowing banner rides inside the mail - shows even where
      // clients block remote images
      attachments: [{ filename: 'titis-on-decks.jpg', content: BANNER_B64, content_id: 'titis-banner' }],
    }),
    ...telegramPings(f, lang),
  ])

  return res.status(200).json({ ok: true })
}

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

function safeJson(s) {
  try { return JSON.parse(s) } catch { return {} }
}

async function sendMail(key, payload) {
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) console.error('resend', res.status, await res.text().catch(() => ''))
  return res
}

function notifyText(f, lang) {
  return [
    `Neue Booking-Anfrage über titisondecks.com (${lang.toUpperCase()})`,
    '',
    `Name: ${f.name}`,
    `E-Mail: ${f.email}`,
    f.date ? `Datum: ${f.date}` : null,
    f.place ? `Ort: ${f.place}` : null,
    '',
    f.message,
    '',
    'Einfach auf diese Mail antworten - die Anfragende ist als Reply-To gesetzt.',
  ].filter((l) => l !== null).join('\n')
}

function confirmationText(c, f) {
  return [
    c.hello(f.name),
    '',
    ...c.lines,
    '',
    `${c.echo}:`,
    f.date ? `${c.fields.date}: ${f.date}` : null,
    f.place ? `${c.fields.place}: ${f.place}` : null,
    `${c.fields.message}: ${f.message}`,
    '',
    c.values,
    'https://www.titisondecks.com',
  ].filter((l) => l !== null).join('\n')
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/* Inline-styled table mail. Email clients strip webfonts and
   stylesheets, and dark modes re-tint every color (amber -> gray,
   links -> default blue) - so the design leans on what survives
   adaptation: structure, borders, spacing, weight, letterspacing.
   Explicit colors everywhere for the clients that do respect them;
   the brand image is a bonus on top (alt="" keeps the blocked-image
   state clean instead of echoing stray alt text). */
function confirmationHtml(c, f) {
  const P = 'font-family:Arial,Helvetica,sans-serif;'
  const M = "font-family:'Courier New',Courier,monospace;"
  const para = (t) =>
    `<p style="${P}margin:16px 0 0;color:#fff4e0;font-size:15px;line-height:1.75;">${escapeHtml(t)}</p>`
  const rows = [
    f.date ? [c.fields.date, f.date] : null,
    f.place ? [c.fields.place, f.place] : null,
    [c.fields.message, f.message],
  ].filter(Boolean)
  const echo = rows
    .map(
      ([k, v], i) =>
        `<p style="${M}margin:0 0 3px;color:#b8ff2e;font-size:11px;letter-spacing:2px;text-transform:uppercase;"><strong>${escapeHtml(k)}</strong></p>` +
        `<p style="${P}margin:0 0 ${i === rows.length - 1 ? 0 : 16}px;color:#fff4e0;font-size:15px;line-height:1.65;">${escapeHtml(v).replace(/\n/g, '<br>')}</p>`
    )
    .join('')

  return `<!doctype html><html><body style="margin:0;padding:0;background:#120a03;" bgcolor="#120a03">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#120a03;" bgcolor="#120a03">
<tr><td align="center" style="padding:36px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

<tr><td style="padding:0 0 2px;"><img src="cid:titis-banner" width="560" alt="TITIS ON DECKS - One. Shared. Frequency." style="display:block;width:100%;height:auto;border-radius:8px;"></td></tr>
<tr><td style="height:2px;line-height:2px;font-size:2px;background:#ff7a2e;" bgcolor="#ff7a2e">&nbsp;</td></tr>

<tr><td style="padding:30px 8px 0;">
<p style="${P}margin:0;color:#ffb32e;font-size:23px;font-weight:bold;"><strong>${escapeHtml(c.hello(f.name))}</strong></p>
${c.lines.map(para).join('')}
</td></tr>

<tr><td style="padding:28px 8px 0;">
<p style="${M}margin:0 0 10px;color:#f4ff3d;font-size:11px;letter-spacing:3px;text-transform:uppercase;">${escapeHtml(c.echo)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1b1008;border:1px solid #4a2e12;border-radius:8px;" bgcolor="#1b1008">
<tr><td style="padding:20px 22px;">${echo}</td></tr>
</table>
</td></tr>

<tr><td style="padding:30px 8px 0;">
<p style="${P}margin:0;color:#fff4e0;font-size:15px;font-weight:bold;"><strong>Lutzi &amp; Glitta</strong></p>
<p style="${P}margin:3px 0 0;color:#d8b487;font-size:13px;">TiTis on Decks</p>
</td></tr>

<tr><td style="padding:28px 8px 44px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top:1px solid #4a2e12;padding-top:20px;">
<p style="${M}margin:0;font-size:12px;"><a href="https://soundcloud.com/titisondecks" style="color:#ffb32e;font-weight:bold;">SoundCloud</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="https://www.instagram.com/titis_on_decks/" style="color:#ffb32e;font-weight:bold;">Instagram</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="https://www.titisondecks.com" style="color:#ffb32e;font-weight:bold;">titisondecks.com</a></p>
<p style="${M}margin:14px 0 0;color:#d8b487;font-size:10px;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(c.values)}</p>
</td></tr></table>
</td></tr>

</table></td></tr></table></body></html>`
}

function telegramPings(f, lang) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chats = (process.env.TELEGRAM_CHAT_IDS || '').split(',').map((c) => c.trim()).filter(Boolean)
  if (!token || chats.length === 0) return []
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const text = [
    `\u{1F3A7} <b>Booking-Anfrage</b> (${lang.toUpperCase()})`,
    '',
    `<b>${esc(f.name)}</b> · ${esc(f.email)}`,
    f.date ? `\u{1F4C5} ${esc(f.date)}` : null,
    f.place ? `\u{1F4CD} ${esc(f.place)}` : null,
    '',
    esc(f.message),
  ].filter((l) => l !== null).join('\n')
  return chats.map((chat_id) =>
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text, parse_mode: 'HTML' }),
    }).catch((err) => console.error('telegram', err))
  )
}
