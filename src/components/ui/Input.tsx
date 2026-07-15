export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-body)" }}>
      {label && (
        <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--brown-700)" }}>
          {label}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
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
        onFocus={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-focus)")}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      />
    </label>
  );
}
