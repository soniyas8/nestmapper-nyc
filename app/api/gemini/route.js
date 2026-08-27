import { GEMINI_MODEL, gemini } from "@/lib/gemini";
import {
  customerPreferencesSchema,
  formatPreferencesForGemini,
  formatValidationErrors,
} from "@/lib/customer-preferences";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  NYC_RECOMMENDATION_SCHEMA,
  NYC_RECOMMENDATION_SYSTEM_INSTRUCTION,
} from "@/lib/recommendation-prompt";

const MAX_BODY_BYTES = 8_000;

function isSameOrigin(request) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "https";

  return Boolean(origin && host && origin === `${protocol}://${host}`);
}

function rateLimitHeaders(rateLimit) {
  return {
    "Cache-Control": "no-store",
    "X-RateLimit-Limit": "5",
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
  };
}

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return Response.json(
      { error: "Requests must come from this application." },
      { status: 403 },
    );
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json(
      { error: "Content-Type must be application/json." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);

  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  const rateLimit = checkRateLimit(getClientIp(request));
  const headers = rateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Too many requests. Please wait and try again." },
      {
        status: 429,
        headers: {
          ...headers,
          "Retry-After": String(
            Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  try {
    const rawBody = await request.text();

    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return Response.json(
        { error: "Request is too large." },
        { status: 413, headers },
      );
    }

    let body;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return Response.json(
        { error: "Request body must be valid JSON." },
        { status: 400, headers },
      );
    }

    const validation = customerPreferencesSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        {
          error: "Customer preferences are invalid.",
          fields: formatValidationErrors(validation.error),
        },
        { status: 400, headers },
      );
    }

    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: formatPreferencesForGemini(validation.data),
      config: {
        systemInstruction: NYC_RECOMMENDATION_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: NYC_RECOMMENDATION_SCHEMA,
      },
    });

    const result = JSON.parse(response.text);

    return Response.json(
      { model: GEMINI_MODEL, result },
      { headers },
    );
  } catch (error) {
    console.error("Gemini request failed:", error);

    return Response.json(
      { error: "Gemini could not process the request." },
      { status: 502, headers },
    );
  }
}
