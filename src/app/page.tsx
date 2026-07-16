"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { AuthCard } from "@/components/AuthCard";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setCheckedAuth(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", position: "relative" }}>
      <div style={{ paddingTop: 40, paddingBottom: 32, textAlign: "center" }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-5xl)", color: "var(--brown-900)" }}>
          Aims&amp;dream
        </h1>
        <span style={{ display: "block", marginTop: 6, fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-medium)", color: "var(--text-secondary)" }}>
          Sé productivo
        </span>
      </div>

      <div style={{ padding: "0 24px 96px" }}>
        {!checkedAuth ? null : user ? <Dashboard user={user} /> : <AuthCard />}
      </div>
    </div>
  );
}
