"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function AuthCard() {
  const supabase = createClient();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const activeTabStyle: React.CSSProperties = {
    flex: 1,
    padding: "9px 12px",
    borderRadius: "var(--radius-pill)",
    border: "none",
    background: "#fff",
    color: "var(--brown-900)",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-semibold)",
    fontSize: "var(--text-sm)",
    cursor: "pointer",
    boxShadow: "var(--shadow-sm)",
  };
  const inactiveTabStyle: React.CSSProperties = {
    ...activeTabStyle,
    background: "transparent",
    color: "var(--brown-700)",
    fontWeight: "var(--weight-medium)",
    boxShadow: "none",
  };

  async function submit() {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError("Ingresa tu correo.");
      return;
    }
    if (!password || password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    setError("");

    if (isRegisterMode) {
      if (!name.trim()) {
        setError("Ingresa tu nombre.");
        setLoading(false);
        return;
      }
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: { data: { name: name.trim() } },
      });
      setLoading(false);
      if (signUpError) {
        setError(
          signUpError.message.toLowerCase().includes("already")
            ? "Ese correo ya tiene una cuenta. Inicia sesión en vez de registrarte."
            : signUpError.message,
        );
        return;
      }
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("Ese correo ya tiene una cuenta. Inicia sesión en vez de registrarte.");
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });
      setLoading(false);
      if (signInError) {
        setError("Correo o contraseña incorrectos.");
      }
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 }}>
      <Card tint="lavender" padding="26px">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.6)", borderRadius: "var(--radius-pill)", padding: 4 }}>
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(false);
                setError("");
              }}
              style={!isRegisterMode ? activeTabStyle : inactiveTabStyle}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(true);
                setError("");
              }}
              style={isRegisterMode ? activeTabStyle : inactiveTabStyle}
            >
              Crear cuenta
            </button>
          </div>

          {isRegisterMode && (
            <Input label="Nombre" placeholder="Ej. Sofi" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <Input label="Correo" type="email" placeholder="tu@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <span style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", color: "var(--brown-700)" }}>
              {error}
            </span>
          )}

          <Button variant="primary" size="md" disabled={loading} onClick={submit} testId="auth-submit">
            {loading ? "Un momento…" : isRegisterMode ? "Crear cuenta" : "Iniciar sesión"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
