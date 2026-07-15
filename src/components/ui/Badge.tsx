export type BadgeColor = "lavender" | "pink" | "yellow" | "ink";

const COLORS: Record<BadgeColor, { bg: string; fg: string }> = {
  lavender: { bg: "var(--lavender-200)", fg: "var(--brown-900)" },
  pink: { bg: "var(--pink-200)", fg: "var(--brown-900)" },
  yellow: { bg: "var(--yellow-200)", fg: "var(--brown-900)" },
  ink: { bg: "var(--brown-700)", fg: "var(--yellow-50)" },
};

export function Badge({
  children,
  color = "lavender",
}: {
  children: React.ReactNode;
  color?: BadgeColor;
}) {
  const c = COLORS[color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: c.bg,
        color: c.fg,
        fontFamily: "var(--font-body)",
        fontWeight: "var(--weight-semibold)",
        fontSize: "var(--text-xs)",
        padding: "4px 10px",
        borderRadius: "var(--radius-pill)",
      }}
    >
      {children}
    </span>
  );
}
