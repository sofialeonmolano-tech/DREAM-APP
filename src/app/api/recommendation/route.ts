import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";
import { formatDuration, type Goal, type Impact, type Role, type Task, type Term } from "@/lib/types";

const IMPACT_RANK: Record<Impact, number> = { Alto: 3, Medio: 2, Bajo: 1 };
const TERM_RANK: Record<Term, number> = { "Corto plazo": 3, "Mediano plazo": 2, "Largo plazo": 1 };
const IMBALANCE_THRESHOLD = 25;
const FORBIDDEN_OPENER = /completamente descuidad|no has registrado nada/i;

function joinNames(names: string[]) {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

interface RoleStat {
  role: Role;
  totalMinutes: number;
  confirmedMinutes: number;
  completionPct: number | null;
  pending: Task[];
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  const { roles, goals, tasks } = (await request.json()) as { roles: Role[]; goals: Goal[]; tasks: Task[] };
  if (!Array.isArray(roles) || roles.length === 0) {
    return NextResponse.json({ error: "Crea al menos un rol para poder generar una recomendación." }, { status: 400 });
  }

  const roleStats: RoleStat[] = roles.map((role) => {
    const roleTasks = tasks.filter((t) => t.role_id === role.id);
    const totalMinutes = roleTasks.reduce((s, t) => s + t.minutes, 0);
    const confirmedMinutes = roleTasks.filter((t) => t.done).reduce((s, t) => s + t.minutes, 0);
    const pending = roleTasks
      .filter((t) => !t.done)
      .sort((a, b) => IMPACT_RANK[b.impact] - IMPACT_RANK[a.impact] || b.minutes - a.minutes);
    return {
      role,
      totalMinutes,
      confirmedMinutes,
      completionPct: totalMinutes > 0 ? Math.round((confirmedMinutes / totalMinutes) * 100) : null,
      pending,
    };
  });

  const noTaskRoles = roleStats.filter((r) => r.totalMinutes === 0);
  const withPending = roleStats.filter((r) => r.pending.length > 0);

  let target: RoleStat;
  let mode: "no_tasks" | "pending" | "all_confirmed";
  if (noTaskRoles.length > 0) {
    target = noTaskRoles[0];
    mode = "no_tasks";
  } else if (withPending.length > 0) {
    target = withPending.reduce((a, b) => ((a.completionPct ?? 0) <= (b.completionPct ?? 0) ? a : b));
    mode = "pending";
  } else {
    target = roleStats.reduce((a, b) => (a.confirmedMinutes <= b.confirmedMinutes ? a : b));
    mode = "all_confirmed";
  }

  function goalFor(roleId: string, goalId: string | null): Goal | null {
    if (goalId) {
      const g = goals.find((g) => g.id === goalId);
      if (g) return g;
    }
    const roleGoals = goals.filter((g) => g.role_id === roleId).sort((a, b) => TERM_RANK[b.term] - TERM_RANK[a.term]);
    return roleGoals[0] ?? null;
  }

  const targetTask = mode === "pending" ? target.pending[0] : null;
  const targetGoal = mode !== "all_confirmed" ? goalFor(target.role.id, targetTask?.goal_id ?? null) : null;

  const aheadRoles = roleStats.filter(
    (r) => r.role.id !== target.role.id && r.completionPct !== null && r.completionPct - (target.completionPct ?? 0) >= IMBALANCE_THRESHOLD,
  );

  const title = mode === "no_tasks" ? `Prioriza tu ${target.role.name} urgentemente` : `Prioriza tu ${target.role.name} ahora`;

  let detail: string;
  if (mode === "pending" && targetTask) {
    detail = `Confirma "${targetTask.title}" (${formatDuration(targetTask.minutes)}) — es tu tarea de mayor impacto pendiente en este rol.`;
    if (targetGoal) detail += ` Esto te acerca a tu meta de ${targetGoal.term.toLowerCase()}: ${targetGoal.name}.`;
    if (aheadRoles.length > 0) {
      detail += ` Estás invirtiendo más tiempo en ${joinNames(aheadRoles.map((r) => r.role.name))}, y descuidando ${target.role.name}.`;
    }
  } else if (mode === "no_tasks") {
    detail = `No tienes tareas registradas en ${target.role.name}.`;
    detail += targetGoal
      ? ` Crea una con impacto Alto que te acerque a tu meta de ${targetGoal.term.toLowerCase()}: ${targetGoal.name}.`
      : ` Crea una con impacto Alto para empezar a construir este rol.`;
  } else {
    detail = `Vas al día: todas tus tareas confirmadas por ahora. Registra nuevas tareas para seguir auditando tu balance entre roles.`;
  }

  const fallback = { title, body: detail, result: target.role.name };

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(fallback);
  }

  // El título y las frases con datos exactos (meta, comparación entre roles) quedan fijos
  // por código — a la IA solo se le pide la frase de apertura que abre la orden concreta,
  // así no puede inventar números ni desviarse a un tono de alarma.
  const trailingParts = detail
    .replace(
      targetTask ? `Confirma "${targetTask.title}" (${formatDuration(targetTask.minutes)}) — es tu tarea de mayor impacto pendiente en este rol.` : "",
      "",
    )
    .trim();

  const openerFacts =
    mode === "pending" && targetTask
      ? `Tarea a confirmar: "${targetTask.title}" (${formatDuration(targetTask.minutes)}), rol: ${target.role.name}.`
      : mode === "no_tasks"
        ? `El rol "${target.role.name}" no tiene ninguna tarea registrada todavía.`
        : `Todos los roles tienen sus tareas confirmadas al día; el que menos tiempo acumulado tiene es "${target.role.name}".`;

  const prompt =
    "Eres un coach de productividad directo, no un narrador de datos. Tu única tarea es escribir UNA frase de apertura (la primera oración de una recomendación), con tono natural de tú a tú, dando una orden concreta — no una descripción de datos.\n\n" +
    `Hecho: ${openerFacts}\n\n` +
    "Reglas estrictas:\n" +
    '- Nunca uses frases de alarma total tipo "completamente descuidado" o "no has registrado nada".\n' +
    "- Es una orden directa, no una descripción de lo que pasó.\n" +
    (mode === "pending" && targetTask
      ? `- Debes incluir literalmente el nombre de la tarea "${targetTask.title}" y la duración "${formatDuration(targetTask.minutes)}".\n`
      : "") +
    "- Una sola frase, máximo 20 palabras.\n\n" +
    "Responde en español, EXACTAMENTE en este formato, sin nada más:\n" +
    "FRASE: (la frase de apertura)";

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });
    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    const match = text.match(/FRASE:\s*([\s\S]+)/i);
    const candidateOpener = match?.[1]?.trim().replace(/\n+/g, " ");

    const mentionsFacts =
      mode !== "pending" ||
      !targetTask ||
      (candidateOpener?.includes(targetTask.title) && candidateOpener?.includes(formatDuration(targetTask.minutes)));
    const isClean = candidateOpener && !FORBIDDEN_OPENER.test(candidateOpener);

    if (candidateOpener && isClean && mentionsFacts) {
      const body = trailingParts ? `${candidateOpener} ${trailingParts}` : candidateOpener;
      return NextResponse.json({ title, body, result: target.role.name });
    }
    return NextResponse.json(fallback);
  } catch {
    return NextResponse.json(fallback);
  }
}
