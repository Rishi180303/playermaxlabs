import { NextResponse } from "next/server";

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendViaResend({ to, subject, text, html }) {
  const apiKey = clean(process.env.RESEND_API_KEY);
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "PlayerMax Labs <onboarding@resend.dev>",
      to,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend error: ${details || "failed to send email."}`);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    const payload = {
      name: clean(data.name),
      email: clean(data.email),
      note: clean(data.note),
    };

    if (!payload.name || !payload.email || !payload.note) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const notifyEmail = clean(process.env.WAITLIST_NOTIFY_EMAIL);
    if (!notifyEmail) {
      return NextResponse.json(
        { error: "WAITLIST_NOTIFY_EMAIL is not configured." },
        { status: 500 }
      );
    }

    const subject = `PlayerMax contact: ${payload.name}`;
    const text = [
      "New contact request",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Note: ${payload.note}`,
    ].join("\n");

    const html = `
      <h2>New contact request</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Note:</strong><br/>${escapeHtml(payload.note).replaceAll(
        "\n",
        "<br/>"
      )}</p>
    `;

    await sendViaResend({
      to: notifyEmail,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
