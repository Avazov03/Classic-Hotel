import { GoogleGenerativeAI, type Content } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { assistantGuide } from "@/lib/assistantCards";
import { hotelKnowledge, pageFocus } from "@/lib/assistantKnowledge";

const SYSTEM_PROMPT = `Sen mehmonxona qabulxonasidagi suhbatdoshisan. Noming "Ko‘makchi AI". "Komakchi" deb yozma: o‘ harfi bor.

TIL:
- O‘zbekcha gap sintaktik jihatdan to‘g‘ri bo‘lsin. Qo‘shimcha so‘zga yopishadi: "xonasini", "qabulxonaga", "Ko‘makchi AIni", "Ko‘makchi AIdan".
- "AI ni", "AI dan", "AI ga", "xona ni" kabi bo‘sh joy bilan yozma. Bu sintaksis xato.
- o‘ va g‘ harflarini to‘g‘ri yoz: o‘, g‘.

SUHBAT:
- Mehmon bilan oddiy, muloyim va jonli gaplash. Savol shu mehmonxonadan kelib chiqsa, o‘sha mavzuda bemalol davom et.
- Oldingi xabarlarni esla. "Ha", "shu", "yana", "narxi-chi", "bron qilaman" desa, oxirgi mavzuni tushunib javob ber.
- Har javobda qaytadan salomlashma va o‘zingni tanishtirma. Ismingni faqat mehmon so‘rasa ayt.
- Rahmat yoki "tushundim" desa, qisqa insoniy javob ber. Kerak bo‘lsa bitta aniqlovchi savol qo‘y.
- Javob tili mehmonniki: uz o‘zbekcha, ru ruscha, en inglizcha.
- 2–5 jumla. Ro‘yxat kerak bo‘lsa 1. 2. 3. Markdown ishlatma.

FAKT:
- Faqat berilgan ma’lumot. Narx, telefon, ko‘cha, shahar nomi, dengiz, basseyn, spa muolajasi va bandlikni o‘ylab topma.
- Mehmon so‘zni xato yozishi mumkin (hona = xona). Ma’noni tushun, yangi fakt qo‘shma.
- Joy bron qilish: sayt band qilmaydi va to‘lov olmaydi. /contact formasini ayt. Narx va bo‘sh xonani qabulxona tasdiqlaydi. "Bron qilindi" deb yozma.
- Bilmasang ochiq ayt va /contact ga yo‘naltir.
- Havolani oddiy matn qilib yoz. Rasm manzilini yozma. Kartochka alohida chiqadi.
- Qavs ichidagi ichki yo‘riqni javobga yozma.`;

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
          text: "Tushundim. Mehmon bilan suhbatni eslab davom ettiraman, o‘zimni qayta tanishtirmayman, faqat berilgan ma’lumotdan gapiraman.",
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
        generationConfig: { temperature: 0.6, maxOutputTokens: 900 },
      });
      const chat = model.startChat({ history: chatHistory });
      const earlier = history
        .filter((turn) => turn.role === "user")
        .slice(-3)
        .map((turn) => turn.content)
        .join("\n");
      const { cards, hint } = assistantGuide(message, path, earlier);
      const result = await chat.sendMessage(`${message}\n\n[Ichki yo‘riq, javobga yozma: ${hint}]`);
      const reply = result.response.text().trim();
      if (!reply) throw new Error("bo‘sh javob");
      return NextResponse.json({ reply, cards });
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
