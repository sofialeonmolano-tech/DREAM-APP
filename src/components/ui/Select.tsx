export function Select({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: {
  label?: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-body)" }}>
      {label && (
        <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--brown-700)" }}>
          {label}
        </span>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-base)",
          padding: "11px 16px",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid var(--border-default)",
          background: "#fff",
          color: "var(--brown-900)",
          outline: "none",
          opacity: disabled ? 0.5 : 1,
          width: "100%",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
