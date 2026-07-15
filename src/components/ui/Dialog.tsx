export function Dialog({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(55,34,24,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)",
          padding: "var(--space-8)",
          maxWidth: 420,
          width: "90%",
          fontFamily: "var(--font-body)",
        }}
      >
        {title && (
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--text-2xl)",
              margin: "0 0 12px",
              color: "var(--brown-900)",
            }}
          >
            {title}
          </h2>
        )}
        <div style={{ color: "var(--brown-700)", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
