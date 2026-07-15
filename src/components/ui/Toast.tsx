export type ToastTone = "lavender" | "pink" | "yellow" | "ink";

const TONES: Record<ToastTone, string> = {
  lavender: "var(--lavender-200)",
  pink: "var(--pink-200)",
  yellow: "var(--yellow-200)",
  ink: "var(--brown-700)",
};

export function Toast({
  message,
  tone = "lavender",
  onDismiss,
}: {
  message: string;
  tone?: ToastTone;
  onDismiss: () => void;
}) {
  const color = tone === "ink" ? "var(--yellow-50)" : "var(--brown-900)";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: TONES[tone],
        color,
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        padding: "12px 18px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        style={{ border: "none", background: "transparent", cursor: "pointer", color, opacity: 0.6 }}
      >
        ✕
      </button>
    </div>
  );
}
