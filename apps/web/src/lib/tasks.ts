import { createSupabaseServerClient } from "@/lib/supabase";
import type { TaskInput, TaskRecord } from "@/lib/types";

export async function listTasks(status?: string) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as TaskRecord[];
}

export async function getTaskById(id: string) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data as TaskRecord;
}

export async function createTask(input: TaskInput) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase 环境变量未配置。");
  }

  const { error } = await supabase.from("tasks").insert({
    title: input.title,
    description: input.description || null,
    status: input.status,
    priority: input.priority,
    due_date: input.due_date || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateTask(id: string, input: TaskInput) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase 环境变量未配置。");
  }

  const { error } = await supabase
    .from("tasks")
    .update({
      title: input.title,
      description: input.description || null,
      status: input.status,
      priority: input.priority,
      due_date: input.due_date || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteTask(id: string) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase 环境变量未配置。");
  }

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function toggleTaskStatus(id: string, currentStatus: TaskRecord["status"]) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase 环境变量未配置。");
  }

  const nextStatus = currentStatus === "completed" ? "in_progress" : "completed";

  const { error } = await supabase
    .from("tasks")
    .update({
      status: nextStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
