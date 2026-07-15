export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ink" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const PADDINGS: Record<ButtonSize, string> = {
  sm: "8px 14px",
  md: "11px 20px",
  lg: "14px 26px",
};

const FONT_SIZES: Record<ButtonSize, string> = {
  sm: "var(--text-sm)",
  md: "var(--text-base)",
  lg: "var(--text-lg)",
};

const VARIANTS: Record<ButtonVariant, React.CSSProperties> = {
  primary: { background: "var(--accent-primary)", color: "var(--brown-900)" },
  secondary: { background: "var(--accent-secondary)", color: "var(--brown-900)" },
  tertiary: { background: "var(--accent-tertiary)", color: "var(--brown-900)" },
  ink: { background: "var(--accent-ink)", color: "var(--yellow-50)" },
  ghost: {
    background: "transparent",
    color: "var(--brown-700)",
    border: "1.5px solid var(--border-default)",
  },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  testId,
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  testId?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(0.96)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: "var(--weight-semibold)",
        fontSize: FONT_SIZES[size],
        padding: PADDINGS[size],
        borderRadius: "var(--radius-pill)",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "transform 0.12s ease, background 0.15s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        ...VARIANTS[variant],
      }}
    >
      {children}
    </button>
  );
}
