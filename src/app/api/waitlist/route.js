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

  const from = "PlayerMax Labs <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
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
      firstName: clean(data.firstName),
      lastName: clean(data.lastName),
      email: clean(data.email),
      company: clean(data.company),
      role: clean(data.role),
      countryCode: clean(data.countryCode) || "+1",
      phone: clean(data.phone),
    };

    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.company ||
      !payload.role
    ) {
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

    const subject = `PlayerMax waitlist: ${payload.firstName} ${payload.lastName}`;
    const text = [
      "New waitlist submission",
      "",
      `First name: ${payload.firstName}`,
      `Last name: ${payload.lastName}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company}`,
      `Role: ${payload.role}`,
      `Phone: ${payload.phone ? `${payload.countryCode} ${payload.phone}` : "-"}`,
    ].join("\n");

    const html = `
      <h2>New waitlist submission</h2>
      <p><strong>First name:</strong> ${escapeHtml(payload.firstName)}</p>
      <p><strong>Last name:</strong> ${escapeHtml(payload.lastName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>
      <p><strong>Role:</strong> ${escapeHtml(payload.role)}</p>
      <p><strong>Phone:</strong> ${
        payload.phone
          ? `${escapeHtml(payload.countryCode)} ${escapeHtml(payload.phone)}`
          : "-"
      }</p>
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
