"use client";

import { useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useAppData } from "@/lib/useAppData";
import {
  DURATION_MINUTES,
  DURATION_OPTIONS,
  IMPACT_BADGE_COLOR,
  IMPACT_OPTIONS,
  NONE_GOAL,
  TERM_OPTIONS,
  formatDuration,
  minutesToDurationLabel,
  type Impact,
  type Term,
} from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { Dialog } from "@/components/ui/Dialog";
import { Toast } from "@/components/ui/Toast";

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M4 20l1-4 12-12 3 3-12 12-4 1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
  </svg>
);
const TrashIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ROLE_CARD_COLORS = ["var(--lavender-400)", "var(--pink-300)", "var(--yellow-200)"];

export function Dashboard({ user }: { user: User }) {
  const supabase = createClient();
  const { roles, goals, tasks, loading, addRole, renameRole, deleteRole, addGoal, deleteGoal, addTask, updateTask, deleteTask } =
    useAppData();

  const [toastMessage, setToastMessage] = useState("");
  function flashToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2600);
  }

  // --- Roles ---
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleError, setNewRoleError] = useState("");
  const [roleDrafts, setRoleDrafts] = useState<Record<string, string>>({});
  const [roleErrors, setRoleErrors] = useState<Record<string, string>>({});

  async function handleAddRole() {
    const name = newRoleName.trim();
    if (!name) {
      setNewRoleError("Escribe un nombre para el rol.");
      return;
    }
    const { error } = await addRole(name);
    if (error) {
      setNewRoleError(error);
      return;
    }
    setNewRoleName("");
    setNewRoleError("");
    setShowAddRole(false);
    flashToast("Rol creado.");
  }

  async function commitRoleRename(id: string, current: string) {
    const draft = (roleDrafts[id] ?? current).trim();
    if (draft === current) return;
    if (!draft) {
      setRoleErrors((prev) => ({ ...prev, [id]: "El nombre no puede estar vacío." }));
      return;
    }
    const error = await renameRole(id, draft);
    setRoleErrors((prev) => ({ ...prev, [id]: error ?? "" }));
  }

  const [confirmDeleteRoleId, setConfirmDeleteRoleId] = useState<string | null>(null);
  const confirmDeleteRole = roles.find((r) => r.id === confirmDeleteRoleId) ?? null;
  const affectedTaskCount = confirmDeleteRole ? tasks.filter((t) => t.role_id === confirmDeleteRole.id).length : 0;

  function requestDeleteRole(id: string) {
    if (roles.length <= 1) {
      flashToast("No puedes eliminar el último rol.");
      return;
    }
    setConfirmDeleteRoleId(id);
  }

  async function confirmDeleteRoleNow() {
    if (!confirmDeleteRoleId) return;
    await deleteRole(confirmDeleteRoleId);
    setConfirmDeleteRoleId(null);
    flashToast("Rol eliminado.");
  }

  // --- Goals ---
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalRole, setNewGoalRole] = useState("");
  const [newGoalTerm, setNewGoalTerm] = useState<Term>(TERM_OPTIONS[0]);
  const [newGoalError, setNewGoalError] = useState("");

  const roleNames = roles.map((r) => r.name);
  const effectiveNewGoalRole = newGoalRole || roles[0]?.name || "";

  async function handleAddGoal() {
    const name = newGoalName.trim();
    if (!name) {
      setNewGoalError("Escribe un nombre para la meta.");
      return;
    }
    const role = roles.find((r) => r.name === effectiveNewGoalRole);
    if (!role) {
      setNewGoalError("Selecciona un rol válido.");
      return;
    }
    const { error } = await addGoal({ name, role_id: role.id, term: newGoalTerm });
    if (error) {
      setNewGoalError(error);
      return;
    }
    setNewGoalName("");
    setNewGoalError("");
    setShowAddGoal(false);
    flashToast("Meta creada.");
  }

  async function handleDeleteGoal(id: string) {
    await deleteGoal(id);
    flashToast("Meta eliminada.");
  }

  // --- Task form (add) ---
  const [showAddTask, setShowAddTask] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formDurationLabel, setFormDurationLabel] = useState<(typeof DURATION_OPTIONS)[number]>(DURATION_OPTIONS[0]);
  const [formImpact, setFormImpact] = useState<Impact>("Medio");
  const [formGoal, setFormGoal] = useState(NONE_GOAL);
  const [formTitleError, setFormTitleError] = useState("");

  const effectiveFormRole = formRole || roles[0]?.name || "";
  const currentFormRole = roles.find((r) => r.name === effectiveFormRole);
  const formGoalOptions = [NONE_GOAL, ...goals.filter((g) => currentFormRole && g.role_id === currentFormRole.id).map((g) => g.name)];

  async function handleSaveTask() {
    if (!formTitle.trim()) {
      setFormTitleError("Escribe un título para la tarea.");
      return;
    }
    const role = roles.find((r) => r.name === effectiveFormRole) ?? roles[0] ?? null;
    const goal = formGoal !== NONE_GOAL ? goals.find((g) => g.name === formGoal && g.role_id === role?.id) : null;
    const error = await addTask({
      title: formTitle.trim(),
      role_id: role ? role.id : null,
      minutes: DURATION_MINUTES[formDurationLabel],
      impact: formImpact,
      goal_id: goal ? goal.id : null,
    });
    if (error) {
      setFormTitleError(error);
      return;
    }
    setFormTitle("");
    setFormTitleError("");
    setFormDurationLabel(DURATION_OPTIONS[0]);
    setFormImpact("Medio");
    setFormGoal(NONE_GOAL);
    setShowAddTask(false);
    flashToast("Tarea registrada.");
  }

  // --- Task edit dialog ---
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editDurationLabel, setEditDurationLabel] = useState<(typeof DURATION_OPTIONS)[number]>(DURATION_OPTIONS[0]);
  const [editImpact, setEditImpact] = useState<Impact>("Medio");
  const [editGoal, setEditGoal] = useState(NONE_GOAL);
  const [editTitleError, setEditTitleError] = useState("");

  const currentEditRole = roles.find((r) => r.name === editRole);
  const editGoalOptions = [NONE_GOAL, ...goals.filter((g) => currentEditRole && g.role_id === currentEditRole.id).map((g) => g.name)];

  function openEditTaskDialog(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const role = roles.find((r) => r.id === task.role_id);
    const goal = goals.find((g) => g.id === task.goal_id);
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditRole(role ? role.name : roles[0]?.name ?? "");
    setEditDurationLabel(minutesToDurationLabel(task.minutes));
    setEditImpact(task.impact);
    setEditGoal(goal ? goal.name : NONE_GOAL);
    setEditTitleError("");
    setDialogOpen(true);
  }

  async function handleSaveEditTask() {
    if (!editTitle.trim() || !editingId) {
      setEditTitleError("Escribe un título para la tarea.");
      return;
    }
    const role = roles.find((r) => r.name === editRole);
    const goal = editGoal !== NONE_GOAL ? goals.find((g) => g.name === editGoal && g.role_id === role?.id) : null;
    const error = await updateTask(editingId, {
      title: editTitle.trim(),
      role_id: role ? role.id : null,
      minutes: DURATION_MINUTES[editDurationLabel],
      impact: editImpact,
      goal_id: goal ? goal.id : null,
    });
    if (error) {
      setEditTitleError(error);
      return;
    }
    setDialogOpen(false);
    flashToast("Tarea actualizada.");
  }

  async function handleDeleteTask(id: string) {
    await deleteTask(id);
    flashToast("Tarea eliminada.");
  }

  async function handleToggleDone(id: string, done: boolean) {
    await updateTask(id, { done: !done });
  }

  // --- Recomendación IA ---
  const [recommendation, setRecommendation] = useState<{ title: string; body: string; result: string } | null>(null);
  const [recommendationError, setRecommendationError] = useState("");
  const [recommendationLoading, setRecommendationLoading] = useState(false);

  async function generateRecommendation() {
    const assigned = tasks.filter((t) => t.role_id);
    if (assigned.length === 0) {
      setRecommendationError("Registra tareas primero para poder generar una recomendación.");
      setRecommendation(null);
      return;
    }
    setRecommendationLoading(true);
    setRecommendationError("");
    setRecommendation(null);

    const summary = roles.map((r) => {
      const rTasks = assigned.filter((t) => t.role_id === r.id);
      const minutes = rTasks.reduce((s, t) => s + t.minutes, 0);
      const counts = { Alto: 0, Medio: 0, Bajo: 0 };
      rTasks.forEach((t) => (counts[t.impact] += 1));
      return { role: r.name, minutes, ...counts };
    });

    try {
      const res = await fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setRecommendation({ title: data.title, body: data.body, result: data.result });
    } catch {
      setRecommendationError("No se pudo generar la recomendación. Intenta de nuevo.");
    } finally {
      setRecommendationLoading(false);
    }
  }

  // --- Balance ---
  const assignedTasks = tasks.filter((t) => t.role_id);
  const totalMinutes = assignedTasks.reduce((s, t) => s + t.minutes, 0);
  const roleStats = useMemo(
    () =>
      roles.map((role, i) => {
        const minutes = assignedTasks.filter((t) => t.role_id === role.id).reduce((s, t) => s + t.minutes, 0);
        const pct = totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0;
        return {
          name: role.name,
          pct,
          durationLabel: minutes > 0 ? formatDuration(minutes) : "Sin tiempo",
          bg: ROLE_CARD_COLORS[i % ROLE_CARD_COLORS.length],
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roles, tasks],
  );

  const userName = (user.user_metadata?.name as string) || user.email || "Sofi";

  async function logout() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return <div style={{ textAlign: "center", padding: 60, color: "var(--text-secondary)" }}>Cargando…</div>;
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--text-secondary)", maxWidth: 560 }}>
            Hola, {userName}. Define tus propios roles, registra tareas con su impacto y deja que la IA te diga a cuál dedicarle más
            tiempo.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button variant="ghost" size="md" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </div>

      {roles.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
          {roleStats.map((r) => (
            <div
              key={r.name}
              style={{
                borderRadius: "var(--radius-lg)",
                padding: 22,
                background: r.bg,
                boxShadow: "var(--shadow-md)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--brown-900)" }}>
                  {r.name}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--brown-900)" }}>
                  {r.pct}%
                </span>
              </div>
              <div style={{ height: 10, borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.55)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--brown-900)",
                    width: `${r.pct}%`,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--brown-800)" }}>
                {r.durationLabel} registrados
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Roles */}
      <Card tint="lavender" padding="24px">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 600, color: "var(--text-primary)" }}>
              Tus roles
            </span>
            <IconButton
              variant={showAddRole ? "ink" : "ghost"}
              size={40}
              label="Agregar rol"
              onClick={() => {
                setShowAddRole((v) => !v);
                setNewRoleError("");
              }}
            >
              <PlusIcon />
            </IconButton>
          </div>

          {roles.length === 0 && (
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
              Aún no tienes roles. Presiona + para crear el primero — universidad, tu trabajo, tu proyecto propio, lo que sea que
              quieras balancear.
            </span>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
            {roles.map((role) => (
              <div key={role.id} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "var(--lavender-400)",
                    borderRadius: "var(--radius-lg)",
                    padding: "14px 10px 14px 18px",
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--brown-900)", flex: "none" }} />
                  <div style={{ flex: 1 }}>
                    <Input
                      value={roleDrafts[role.id] ?? role.name}
                      onChange={(e) => setRoleDrafts((prev) => ({ ...prev, [role.id]: e.target.value }))}
                    />
                  </div>
                  <IconButton variant="ghost" size={36} label="Guardar nombre" onClick={() => commitRoleRename(role.id, role.name)}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>✓</span>
                  </IconButton>
                  <IconButton variant="ghost" size={36} label="Eliminar rol" onClick={() => requestDeleteRole(role.id)}>
                    <TrashIcon />
                  </IconButton>
                </div>
                {roleErrors[role.id] && (
                  <span style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", color: "var(--brown-700)", paddingLeft: 16 }}>
                    {roleErrors[role.id]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {showAddRole && (
            <>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(255,255,255,0.5)", borderRadius: "var(--radius-lg)", padding: 14 }}>
                <div style={{ flex: 1 }}>
                  <Input placeholder="Nombre del nuevo rol" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} />
                </div>
                <Button variant="secondary" size="md" onClick={handleAddRole}>
                  Agregar rol
                </Button>
              </div>
              {newRoleError && (
                <span style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", color: "var(--brown-700)" }}>
                  {newRoleError}
                </span>
              )}
            </>
          )}
        </div>
      </Card>

      {/* Metas */}
      <Card tint="pink" padding="24px">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 600, color: "var(--text-primary)" }}>
              Metas
            </span>
            {roles.length > 0 && (
              <IconButton
                variant={showAddGoal ? "ink" : "ghost"}
                size={40}
                label="Agregar meta"
                onClick={() => {
                  setShowAddGoal((v) => !v);
                  setNewGoalError("");
                }}
              >
                <PlusIcon />
              </IconButton>
            )}
          </div>

          {goals.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
              {goals.map((g) => {
                const role = roles.find((r) => r.id === g.role_id);
                return (
                  <div
                    key={g.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: "var(--pink-300)",
                      borderRadius: "var(--radius-lg)",
                      padding: "16px 14px 16px 18px",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--brown-900)", flex: "none", marginTop: 2 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontSize: "var(--text-lg)", color: "var(--brown-900)", fontWeight: 700 }}>{g.name}</span>
                      <span
                        style={{
                          fontSize: "var(--text-xs)",
                          fontWeight: "var(--weight-semibold)",
                          letterSpacing: "var(--tracking-wide)",
                          textTransform: "uppercase",
                          color: "var(--brown-700)",
                        }}
                      >
                        {role ? role.name : "Sin rol"} · {g.term}
                      </span>
                    </div>
                    <IconButton variant="ghost" size={34} label="Eliminar meta" onClick={() => handleDeleteGoal(g.id)}>
                      <TrashIcon size={15} />
                    </IconButton>
                  </div>
                );
              })}
            </div>
          ) : (
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
              Sin metas todavía. Presiona + para crear una y vincularla a tus tareas (opcional).
            </span>
          )}

          {showAddGoal && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr auto",
                  gap: 10,
                  alignItems: "end",
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: "var(--radius-lg)",
                  padding: 14,
                }}
              >
                <Input label="Nombre de la meta" placeholder="Ej. Terminar el MVP" value={newGoalName} onChange={(e) => setNewGoalName(e.target.value)} />
                <Select label="Rol" options={roleNames} value={effectiveNewGoalRole} onChange={(e) => setNewGoalRole(e.target.value)} />
                <Select label="Plazo" options={[...TERM_OPTIONS]} value={newGoalTerm} onChange={(e) => setNewGoalTerm(e.target.value as Term)} />
                <Button variant="secondary" size="md" onClick={handleAddGoal}>
                  Agregar
                </Button>
              </div>
              {newGoalError && (
                <span style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", color: "var(--brown-700)" }}>
                  {newGoalError}
                </span>
              )}
            </>
          )}
        </div>
      </Card>

      {/* Registrar tarea */}
      <Card tint="yellow" padding="24px">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 600, color: "var(--text-primary)" }}>
              Registrar tarea
            </span>
            {roles.length > 0 && (
              <IconButton
                variant={showAddTask ? "ink" : "ghost"}
                size={40}
                label="Nueva tarea"
                onClick={() => {
                  setShowAddTask((v) => !v);
                  setFormTitleError("");
                }}
              >
                <PlusIcon />
              </IconButton>
            )}
          </div>

          {roles.length === 0 && (
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>Crea un rol arriba antes de registrar tareas.</span>
          )}

          {showAddTask && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "rgba(255,255,255,0.5)", borderRadius: "var(--radius-lg)", padding: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
                <Input label="Título de la tarea" placeholder="Ej. Terminar propuesta del proyecto" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
                <Select label="Rol" options={roleNames} value={effectiveFormRole} onChange={(e) => { setFormRole(e.target.value); setFormGoal(NONE_GOAL); }} />
              </div>
              {formTitleError && (
                <span style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", color: "var(--brown-700)" }}>{formTitleError}</span>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Select label="Duración" options={[...DURATION_OPTIONS]} value={formDurationLabel} onChange={(e) => setFormDurationLabel(e.target.value as (typeof DURATION_OPTIONS)[number])} />
                <Select label="Impacto" options={[...IMPACT_OPTIONS]} value={formImpact} onChange={(e) => setFormImpact(e.target.value as Impact)} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "end" }}>
                <Select label="Meta (opcional)" options={formGoalOptions} value={formGoal} onChange={(e) => setFormGoal(e.target.value)} />
                <Button variant="primary" size="md" onClick={handleSaveTask}>
                  Guardar tarea
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Lista de tareas */}
      <Card tint="none" padding="0">
        <div style={{ padding: "22px 22px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--text-primary)" }}>
            Tareas registradas
          </span>
          <Badge color="ink">{tasks.length} {tasks.length === 1 ? "tarea" : "tareas"}</Badge>
        </div>

        {tasks.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "8px 22px 22px" }}>
            {tasks.map((t) => {
              const role = roles.find((r) => r.id === t.role_id);
              const goal = goals.find((g) => g.id === t.goal_id);
              return (
                <div
                  key={t.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 16px 14px 18px",
                    borderRadius: "var(--radius-lg)",
                    background: t.done ? "var(--yellow-100)" : "var(--yellow-200)",
                    flexWrap: "wrap",
                  }}
                >
                  <Checkbox checked={t.done} onChange={() => handleToggleDone(t.id, t.done)} />
                  <Badge color="ink">{role ? role.name : "Sin rol"}</Badge>
                  <Badge color={IMPACT_BADGE_COLOR[t.impact]}>{t.impact}</Badge>
                  <span
                    style={{
                      flex: 1,
                      minWidth: 160,
                      fontSize: "var(--text-base)",
                      fontWeight: "var(--weight-medium)",
                      color: t.done ? "var(--brown-400)" : "var(--brown-900)",
                      textDecoration: t.done ? "line-through" : "none",
                    }}
                  >
                    {t.title}
                  </span>
                  {goal && <span style={{ fontSize: "var(--text-xs)", color: "var(--brown-700)", whiteSpace: "nowrap" }}>🎯 {goal.name}</span>}
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--brown-700)", whiteSpace: "nowrap" }}>{formatDuration(t.minutes)}</span>
                  <IconButton variant="ghost" size={34} label="Editar tarea" onClick={() => openEditTaskDialog(t.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton variant="ghost" size={34} label="Eliminar tarea" onClick={() => handleDeleteTask(t.id)}>
                    <TrashIcon />
                  </IconButton>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ padding: "40px 22px 44px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="4" stroke="var(--border-strong)" strokeWidth="1.6" />
              <path d="M8 12h8M12 8v8" stroke="var(--border-strong)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", maxWidth: 320 }}>
              Registra tu primera tarea para ver tu balance entre roles.
            </span>
          </div>
        )}
      </Card>

      {/* Recomendación IA */}
      <div style={{ borderRadius: 28, background: "var(--brown-900)", padding: "26px 28px", display: "flex", flexDirection: "column", gap: 18, boxShadow: "var(--shadow-md)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "var(--yellow-50)",
              color: "var(--brown-900)",
              borderRadius: "var(--radius-pill)",
              padding: "6px 14px",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--weight-semibold)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
            }}
          >
            Recomendación IA
          </span>
          {recommendation && (
            <span style={{ fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--brown-300)" }}>
              Generado ahora
            </span>
          )}
        </div>

        {recommendationError && (
          <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--pink-300)" }}>{recommendationError}</span>
        )}

        {recommendation && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--yellow-50)" }}>
              {recommendation.title}
            </h3>
            <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--brown-200)" }}>
              {recommendation.body}
            </p>
            {recommendation.result && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid var(--brown-700)", paddingTop: 14 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--brown-400)", flex: "none" }}>
                    Enfoque
                  </span>
                  <span style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--yellow-50)" }}>{recommendation.result}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {!recommendation && !recommendationError && !recommendationLoading && (
          <span style={{ fontSize: "var(--text-sm)", color: "var(--brown-300)" }}>
            Genera una recomendación basada en el tiempo e impacto de tus tareas por rol.
          </span>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="secondary" size="md" onClick={generateRecommendation} disabled={recommendationLoading}>
            {recommendationLoading ? "Generando…" : "Generar recomendación"}
          </Button>
        </div>
      </div>

      <Dialog open={confirmDeleteRoleId !== null} title="Eliminar rol" onClose={() => setConfirmDeleteRoleId(null)}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 4 }}>
          <span style={{ fontSize: "var(--text-base)", color: "var(--text-primary)" }}>
            {confirmDeleteRole &&
              (affectedTaskCount > 0
                ? `Eliminar "${confirmDeleteRole.name}" dejará ${affectedTaskCount} ${affectedTaskCount === 1 ? "tarea sin rol" : "tareas sin rol"} (no se borran, pero salen del balance). ¿Confirmas?`
                : `¿Eliminar el rol "${confirmDeleteRole.name}"?`)}
          </span>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Button variant="ghost" size="md" onClick={() => setConfirmDeleteRoleId(null)}>
              Cancelar
            </Button>
            <Button variant="primary" size="md" onClick={confirmDeleteRoleNow}>
              Eliminar rol
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog open={dialogOpen} title="Editar tarea" onClose={() => setDialogOpen(false)}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 4 }}>
          <Input label="Título de la tarea" placeholder="Ej. Terminar propuesta del proyecto" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          {editTitleError && (
            <span style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", color: "var(--brown-700)" }}>{editTitleError}</span>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Select label="Rol" options={roleNames} value={editRole} onChange={(e) => { setEditRole(e.target.value); setEditGoal(NONE_GOAL); }} />
            <Select label="Impacto" options={[...IMPACT_OPTIONS]} value={editImpact} onChange={(e) => setEditImpact(e.target.value as Impact)} />
          </div>
          <Select label="Duración" options={[...DURATION_OPTIONS]} value={editDurationLabel} onChange={(e) => setEditDurationLabel(e.target.value as (typeof DURATION_OPTIONS)[number])} />
          <Select label="Meta (opcional)" options={editGoalOptions} value={editGoal} onChange={(e) => setEditGoal(e.target.value)} />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Button variant="ghost" size="md" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" size="md" onClick={handleSaveEditTask}>
              Guardar cambios
            </Button>
          </div>
        </div>
      </Dialog>

      {toastMessage && (
        <div style={{ position: "fixed", bottom: 28, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 120 }}>
          <Toast message={toastMessage} tone="lavender" onDismiss={() => setToastMessage("")} />
        </div>
      )}
    </div>
  );
}
