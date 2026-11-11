import { services } from "@/lib/services";

const MAX_BODY_BYTES = 16_384;
const frequencies = ["Varje vecka", "Varannan vecka", "Var fjärde vecka"];
const errorResponse = (error: string, status: number) => Response.json({ error }, { status });
const contactError = "Det gick inte att skicka förfrågan. Försök igen eller kontakta oss via telefon eller e-post.";

async function readBody(request: Request): Promise<unknown> {
  if (!request.body) throw new Error("Missing body");
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error("Body too large");
    }
    body += decoder.decode(value, { stream: true });
  }
  return JSON.parse(body + decoder.decode());
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return errorResponse("Ogiltigt format på förfrågan.", 415);
  }

  let body: unknown;
  try {
    body = await readBody(request);
  } catch {
    return errorResponse("Förfrågan kunde inte läsas eller är för stor.", 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return errorResponse("Kontrollera uppgifterna och försök igen.", 400);
  }
  const fields = body as Record<string, unknown>;
  const singleLine = (key: string, max: number, required = false): string | null => {
    const value = fields[key];
    if (value === undefined && !required) return "";
    if (typeof value !== "string" || value.length > max || /[\r\n\x00-\x1f\x7f]/.test(value)) return null;
    const trimmed = value.trim();
    return required && !trimmed ? null : trimmed;
  };
  const name = singleLine("name", 100, true);
  const email = singleLine("email", 254, true);
  const phone = singleLine("phone", 40, true);
  const location = singleLine("location", 100, true);
  const slug = singleLine("service", 50, true);
  const area = singleLine("area", 10);
  const frequency = singleLine("frequency", 30);
  const message = fields.message === undefined ? "" : fields.message;
  const service = services.find((item) => item.slug === slug);
  if (
    !name || !email || !phone || !location || !service || area === null || frequency === null ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
    (area !== "" && (!/^\d+$/.test(area) || !Number.isSafeInteger(Number(area)) || Number(area) < 1 || service.slug === "dodsbo")) ||
    (frequency !== "" && (service.slug !== "hemstadning" || !frequencies.includes(frequency))) ||
    typeof message !== "string" || message.length > 3000 || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(message)
  ) {
    return errorResponse("Kontrollera uppgifterna och försök igen.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_EMAIL_FROM;
  const to = process.env.QUOTE_EMAIL_TO;
  if (!apiKey || !from || !to) {
    console.error("Quote email is not configured.");
    return errorResponse("Offertformuläret är inte tillgängligt just nu. Kontakta oss via telefon eller e-post.", 503);
  }

  const text = [
    `Tjänst: ${service.name}`, `Namn: ${name}`, `E-post: ${email}`,
    `Telefon: ${phone}`, `Ort: ${location}`,
    ...(area ? [`Storlek: ${area} m²`] : []),
    ...(frequency ? [`Frekvens: ${frequency}`] : []),
    ...(message.trim() ? [`Meddelande:\n${message.trim()}`] : []),
  ].join("\n");
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Offertförfrågan: ${service.name}`, text }),
      cache: "no-store",
    });
  } catch {
    console.error("Quote email provider could not be reached.");
    return errorResponse(contactError, 502);
  }
  if (!response.ok) {
    console.error(`Quote email provider rejected request (status ${response.status}).`);
    return errorResponse(contactError, 502);
  }
  return Response.json({ ok: true });
}
