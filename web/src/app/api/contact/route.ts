import { NextResponse } from "next/server";

type ContactPayload = Record<string, string | undefined>;

function pick(body: ContactPayload, keys: string[]) {
  for (const key of keys) {
    const v = body[key]?.trim();
    if (v) return v;
  }
  return "";
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Support both React ContactForm fields and baseline Webflow names
  const name = pick(body, ["name", "Contact-V1-Name", "Contact V1 Name"]);
  const email = pick(body, ["email", "Contact-V1-email", "Contact V1 email"]);
  const message = pick(body, [
    "message",
    "Contact-V1-Message",
    "Contact V1 Message",
    "Contact-V1-query",
    "Contact V1 query",
  ]);
  const phone = pick(body, ["phone", "Contact-V1-Phone-No", "Contact V1 Phone No"]);
  const topic = pick(body, ["topic"]) || "reservation";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
  }

  // Persistence / email provider can be wired here later.
  console.info("[contact]", {
    name,
    email,
    phone: phone || null,
    topic,
    message,
  });

  return NextResponse.json({ ok: true });
}