export function Checkbox({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: 7,
          border: checked ? "none" : "1.5px solid var(--border-strong)",
          background: checked ? "var(--accent-primary)" : "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s ease",
        }}
      >
        {checked && <span style={{ color: "var(--brown-900)", fontSize: 13, fontWeight: 700 }}>✓</span>}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ display: "none" }} />
    </label>
  );
}
