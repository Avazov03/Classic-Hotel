import { GoogleGenerativeAI, type Content } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { hotelKnowledge, pageFocus } from "@/lib/assistantKnowledge";

const SYSTEM_PROMPT = `Sen mehmonxona saytining rasmiy yordamchisisan. Nomining Mehmonxona AI.

VAZIFA:
- Mehmonlarga xonalar, nonushta, restoran, teras, bog‘, qabulxona va bron haqida yordam ber.
- Faqat berilgan MA'LUMOTDAGI faktlardan foydalan. Narx, telefon, ko‘cha, shahar nomi, dengiz, basseyn, spa muolajasi yoki bandlikni o‘ylab topma.
- Bilmasang: qisqa ayt va /contact formasiga yo‘naltir.
- Havolani oddiy matn qilib yoz: /rooms yoki /contact.
- Markdown ishlatma: ** * # belgilarisiz.

USLUB:
- Javobni so‘ralgan tilda ber: uz o‘zbekcha, ru ruscha, en inglizcha.
- Qisqa, muloyim, 2–6 jumla. Ro‘yxat kerak bo‘lsa 1. 2. 3.
- Mehmon hozir qaysi sahifada ekanini hisobga ol va shu sahifaga tegishli javobdan boshla.`;

const MODELS = ["gemini-3.5-flash-lite", "gemini-3.8-flash"];

type Turn = { role: "user" | "assistant"; content: string };

const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const prev = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  if (prev.length >= 8) {
    hits.set(ip, prev);
    return true;
  }
  prev.push(now);
  hits.set(ip, prev);
  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI xizmati hozircha sozlanmagan" }, { status: 503 });
  }
  if (limited(clientIp(request))) {
    return NextResponse.json(
      { error: "Juda ko‘p so‘rov. Birozdan keyin qayta yozing." },
      { status: 429 },
    );
  }

  let body: {
    message?: unknown;
    history?: unknown;
    pageContext?: { path?: unknown; locale?: unknown };
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Noto‘g‘ri so‘rov" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 2000) {
    return NextResponse.json({ error: "Savol bo‘sh yoki juda uzun" }, { status: 400 });
  }

  const history: Turn[] = Array.isArray(body.history)
    ? body.history
        .filter(
          (item): item is Turn =>
            !!item &&
            typeof item === "object" &&
            ((item as Turn).role === "user" || (item as Turn).role === "assistant") &&
            typeof (item as Turn).content === "string" &&
            (item as Turn).content.length <= 4000,
        )
        .slice(-10)
    : [];

  const path = typeof body.pageContext?.path === "string" ? body.pageContext.path.slice(0, 200) : "/";
  const locale =
    body.pageContext?.locale === "ru" || body.pageContext?.locale === "en"
      ? body.pageContext.locale
      : "uz";

  const prior: Content[] = history.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  const chatHistory: Content[] = [
    {
      role: "user",
      parts: [
        {
          text: `${hotelKnowledge()}\n\n${pageFocus(path)}\n\nJavob tili: ${locale}.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Tushundim. Faqat berilgan ma’lumotdan javob beraman, narx va telefonni o‘ylab topmayman, kerak bo‘lsa /contact ga yo‘naltiraman.",
        },
      ],
    },
    ...prior,
  ];

  const genAI = new GoogleGenerativeAI(apiKey);
  let lastMessage = "Javob olishda xatolik. Keyinroq urinib ko‘ring.";

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: { temperature: 0.4, maxOutputTokens: 800 },
      });
      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(message);
      const reply = result.response.text().trim();
      if (!reply) throw new Error("bo‘sh javob");
      return NextResponse.json({ reply });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      lastMessage = msg;
      const retry =
        msg.includes("429") ||
        msg.includes("503") ||
        msg.toLowerCase().includes("quota") ||
        msg.toLowerCase().includes("not found");
      if (!retry) break;
    }
  }

  const lower = lastMessage.toLowerCase();
  if (lower.includes("api key") || lower.includes("api_key")) {
    return NextResponse.json({ error: "AI xizmati hozircha sozlanmagan" }, { status: 503 });
  }
  if (lower.includes("429") || lower.includes("quota")) {
    return NextResponse.json(
      { error: "AI kvotasi tugagan. Birozdan keyin qayta urinib ko‘ring." },
      { status: 503 },
    );
  }
  return NextResponse.json(
    { error: "Javob olishda xatolik. Keyinroq urinib ko‘ring." },
    { status: 500 },
  );
}
