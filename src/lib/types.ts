export type Impact = "Alto" | "Medio" | "Bajo";
export type Term = "Corto plazo" | "Mediano plazo" | "Largo plazo";

export interface Role {
  id: string;
  name: string;
}

export interface Goal {
  id: string;
  name: string;
  role_id: string | null;
  term: Term;
}

export interface Task {
  id: string;
  title: string;
  role_id: string | null;
  minutes: number;
  impact: Impact;
  goal_id: string | null;
  done: boolean;
}

export const IMPACT_OPTIONS: Impact[] = ["Alto", "Medio", "Bajo"];
export const IMPACT_BADGE_COLOR: Record<Impact, "pink" | "yellow" | "lavender"> = {
  Alto: "pink",
  Medio: "yellow",
  Bajo: "lavender",
};

export const TERM_OPTIONS: Term[] = ["Corto plazo", "Mediano plazo", "Largo plazo"];

export const NONE_GOAL = "Ninguna";

export const DURATION_OPTIONS = ["30 minutos", "1 hora", "2 horas", "3 horas"] as const;
export const DURATION_MINUTES: Record<(typeof DURATION_OPTIONS)[number], number> = {
  "30 minutos": 30,
  "1 hora": 60,
  "2 horas": 120,
  "3 horas": 180,
};

export function minutesToDurationLabel(mins: number): (typeof DURATION_OPTIONS)[number] {
  let best: (typeof DURATION_OPTIONS)[number] = DURATION_OPTIONS[0];
  let bestDiff = Infinity;
  for (const label of DURATION_OPTIONS) {
    const diff = Math.abs(DURATION_MINUTES[label] - mins);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = label;
    }
  }
  return best;
}

export function formatDuration(mins: number): string {
  mins = Math.round(mins);
  if (mins < 60) return mins + " min";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? h + "h " + m + "m" : h + "h";
}
