export type IconButtonVariant = "ghost" | "filled" | "ink";

const VARIANTS: Record<IconButtonVariant, React.CSSProperties> = {
  ghost: { background: "transparent", color: "var(--brown-700)" },
  filled: { background: "var(--lavender-100)", color: "var(--brown-800)" },
  ink: { background: "var(--accent-ink)", color: "var(--yellow-50)" },
};

export function IconButton({
  children,
  variant = "ghost",
  size = 40,
  disabled = false,
  onClick,
  label,
}: {
  children: React.ReactNode;
  variant?: IconButtonVariant;
  size?: number;
  disabled?: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "background 0.15s ease",
        flex: "none",
        ...VARIANTS[variant],
      }}
    >
      {children}
    </button>
  );
}
