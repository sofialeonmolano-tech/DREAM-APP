"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Goal, Impact, Role, Task, Term } from "@/lib/types";

type Result = { id: string | null; error: string | null };

export function useAppData() {
  const [supabase] = useState(() => createClient());
  const [roles, setRoles] = useState<Role[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    const [rolesRes, goalsRes, tasksRes] = await Promise.all([
      supabase.from("roles").select("id, name").order("created_at"),
      supabase.from("goals").select("id, name, role_id, term").order("created_at"),
      supabase.from("tasks").select("id, title, role_id, minutes, impact, goal_id, done").order("created_at"),
    ]);
    if (rolesRes.data) setRoles(rolesRes.data as Role[]);
    if (goalsRes.data) setGoals(goalsRes.data as Goal[]);
    if (tasksRes.data) setTasks(tasksRes.data as Task[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  async function addRole(name: string): Promise<Result> {
    const { data, error } = await supabase.from("roles").insert({ name }).select("id").single();
    if (error) return { id: null, error: error.code === "23505" ? "Ya tienes un rol con ese nombre." : error.message };
    await refetch();
    return { id: data.id, error: null };
  }

  async function renameRole(id: string, name: string): Promise<string | null> {
    const { error } = await supabase.from("roles").update({ name }).eq("id", id);
    if (error) return error.code === "23505" ? "Ya existe un rol con ese nombre." : error.message;
    await refetch();
    return null;
  }

  async function deleteRole(id: string) {
    await supabase.from("roles").delete().eq("id", id);
    await refetch();
  }

  async function addGoal(input: { name: string; role_id: string; term: Term }): Promise<Result> {
    const { data, error } = await supabase.from("goals").insert(input).select("id").single();
    if (error) return { id: null, error: error.message };
    await refetch();
    return { id: data.id, error: null };
  }

  async function deleteGoal(id: string) {
    await supabase.from("goals").delete().eq("id", id);
    await refetch();
  }

  async function addTask(input: {
    title: string;
    role_id: string | null;
    minutes: number;
    impact: Impact;
    goal_id: string | null;
  }): Promise<string | null> {
    const { error } = await supabase.from("tasks").insert(input);
    if (error) return error.message;
    await refetch();
    return null;
  }

  async function updateTask(
    id: string,
    input: Partial<{
      title: string;
      role_id: string | null;
      minutes: number;
      impact: Impact;
      goal_id: string | null;
      done: boolean;
    }>,
  ): Promise<string | null> {
    const { error } = await supabase.from("tasks").update(input).eq("id", id);
    if (error) return error.message;
    await refetch();
    return null;
  }

  async function deleteTask(id: string) {
    await supabase.from("tasks").delete().eq("id", id);
    await refetch();
  }

  return {
    roles,
    goals,
    tasks,
    loading,
    refetch,
    addRole,
    renameRole,
    deleteRole,
    addGoal,
    deleteGoal,
    addTask,
    updateTask,
    deleteTask,
  };
}
