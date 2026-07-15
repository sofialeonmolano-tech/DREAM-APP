export type CardTint = "pink" | "yellow" | "lavender" | "none";

const TINTS: Record<CardTint, string> = {
  pink: "var(--pink-50)",
  yellow: "var(--yellow-50)",
  lavender: "var(--lavender-50)",
  none: "var(--surface-card)",
};

export function Card({
  children,
  padding = "var(--space-6)",
  tint = "none",
}: {
  children: React.ReactNode;
  padding?: string;
  tint?: CardTint;
}) {
  return (
    <div
      style={{
        background: TINTS[tint],
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        padding,
        border: "1px solid var(--border-subtle)",
      }}
    >
      {children}
    </div>
  );
}
