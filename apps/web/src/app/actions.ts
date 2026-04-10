"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTask, deleteTask, toggleTaskStatus, updateTask } from "@/lib/tasks";
import { parseTaskFormData } from "@/lib/utils";

function assertTitle(title: string) {
  if (!title) {
    throw new Error("任务标题不能为空。");
  }
}

export async function createTaskAction(formData: FormData) {
  const input = parseTaskFormData(formData);
  assertTitle(input.title);

  await createTask(input);
  revalidatePath("/");
}

export async function updateTaskAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const input = parseTaskFormData(formData);

  if (!id) {
    throw new Error("缺少任务 ID。");
  }

  assertTitle(input.title);
  await updateTask(id, input);
  revalidatePath("/");
  revalidatePath(`/tasks/${id}`);
  redirect(`/tasks/${id}`);
}

export async function deleteTaskAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("缺少任务 ID。");
  }

  await deleteTask(id);
  revalidatePath("/");
  redirect("/");
}

export async function toggleTaskStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const currentStatus = String(formData.get("status") ?? "pending") as
    | "pending"
    | "in_progress"
    | "completed";

  if (!id) {
    throw new Error("缺少任务 ID。");
  }

  await toggleTaskStatus(id, currentStatus);
  revalidatePath("/");
  revalidatePath(`/tasks/${id}`);
}
