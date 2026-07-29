import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 5_000;

type AccessRequest = { name?: unknown; email?: unknown; type?: unknown; problem?: unknown };

function requiredText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= MAX_FIELD_LENGTH ? value.trim() : null;
}

export async function POST(request: Request) {
  let body: AccessRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = requiredText(body.name);
  const email = requiredText(body.email);
  const businessType = requiredText(body.type);
  const problem = requiredText(body.problem);
  if (!name || !email || !EMAIL_PATTERN.test(email) || !businessType || !problem) {
    return NextResponse.json({ error: "Please complete all fields with valid values." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ACCESS_REQUEST_TO_EMAIL;
  const from = process.env.ACCESS_REQUEST_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Access request email delivery is not configured.");
    return NextResponse.json({ error: "Submission service unavailable." }, { status: 503 });
  }

  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Early access request from ${name}`,
      text: [`Name: ${name}`, `Work email: ${email}`, `Business type: ${businessType}`, "", "Where judgment gets stuck:", problem].join("\n"),
    }),
  });
  if (!delivery.ok) {
    console.error("Access request delivery failed.", delivery.status);
    return NextResponse.json({ error: "Submission delivery failed." }, { status: 502 });
  }
  return NextResponse.json({ submitted: true }, { status: 201 });
}
