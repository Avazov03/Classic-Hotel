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
    return NextResponse.json(
      { ok: false, error: "Noto‘g‘ri JSON" },
      { status: 400 },
    );
  }

  // React ContactForm + Webflow baseline field names
  const name = pick(body, ["name", "Aloqa-V1-Name", "Aloqa V1 Name"]);
  const email = pick(body, ["email", "Aloqa-V1-email", "Aloqa V1 email"]);
  const message = pick(body, [
    "message",
    "Aloqa-V1-Xabar",
    "Aloqa V1 Xabar",
    "Aloqa-V1-query",
    "Aloqa V1 query",
  ]);
  const phone = pick(body, ["phone", "Aloqa-V1-Phone-No", "Aloqa V1 Phone No"]);
  const topic = pick(body, ["topic"]) || "reservation";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Ism, email va xabar majburiy." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Email noto‘g‘ri." },
      { status: 400 },
    );
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