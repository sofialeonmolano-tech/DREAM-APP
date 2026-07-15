import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { formatDuration } from "@/lib/types";

interface RoleSummary {
  role: string;
  minutes: number;
  Alto: number;
  Medio: number;
  Bajo: number;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  const { summary } = (await request.json()) as { summary: RoleSummary[] };
  if (!Array.isArray(summary) || summary.length === 0) {
    return NextResponse.json({ error: "Registra tareas primero para poder generar una recomendación." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "El servicio de recomendaciones no está configurado." }, { status: 500 });
  }

  const summaryText = summary
    .map(
      (r) =>
        `${r.role}: ${formatDuration(r.minutes)} registrados, tareas de impacto Alto=${r.Alto}, Medio=${r.Medio}, Bajo=${r.Bajo}.`,
    )
    .join("\n");

  const prompt =
    "Eres un asistente de productividad. Aquí está el tiempo e impacto de tareas por rol de un usuario con múltiples roles (ej. universidad, trabajo, proyecto propio):\n\n" +
    summaryText +
    "\n\nResponde en español, en EXACTAMENTE este formato de 3 líneas, sin nada más:\n" +
    "TITULO: (una frase corta y directa, máximo 6 palabras, tipo titular)\n" +
    "DETALLE: (2 frases explicando por qué, considerando tiempo e impacto)\n" +
    "ENFOQUE: (el nombre del rol al que debería dedicarle más atención)";

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });
    const text = completion.choices[0]?.message?.content?.trim() ?? "";

    const titleMatch = text.match(/TITULO:\s*(.+)/i);
    const detailMatch = text.match(/DETALLE:\s*(.+)/i);
    const focusMatch = text.match(/ENFOQUE:\s*(.+)/i);

    if (titleMatch && detailMatch) {
      return NextResponse.json({
        title: titleMatch[1].trim(),
        body: detailMatch[1].trim(),
        result: focusMatch ? focusMatch[1].trim() : "",
      });
    }
    return NextResponse.json({ title: "Tu recomendación", body: text, result: "" });
  } catch {
    return NextResponse.json({ error: "No se pudo generar la recomendación. Intenta de nuevo." }, { status: 502 });
  }
}
