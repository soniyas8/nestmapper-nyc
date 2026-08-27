import { GEMINI_MODEL, gemini } from "@/lib/gemini";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (typeof prompt !== "string" || !prompt.trim()) {
      return Response.json(
        { error: "A non-empty prompt is required." },
        { status: 400 },
      );
    }

    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt.trim(),
    });

    return Response.json({ model: GEMINI_MODEL, text: response.text });
  } catch (error) {
    console.error("Gemini request failed:", error);

    return Response.json(
      { error: "Gemini could not process the request." },
      { status: 502 },
    );
  }
}
