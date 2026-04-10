import type { TaskPriority, TaskStatus } from "@/lib/types";

export const statusOptions: Array<{ value: TaskStatus; label: string }> = [
  { value: "pending", label: "待开始" },
  { value: "in_progress", label: "进行中" },
  { value: "completed", label: "已完成" },
];

export const priorityOptions: Array<{ value: TaskPriority; label: string }> = [
  { value: "low", label: "低" },
  { value: "medium", label: "中" },
  { value: "high", label: "高" },
];

export const statusLabelMap: Record<TaskStatus, string> = Object.fromEntries(
  statusOptions.map((item) => [item.value, item.label]),
) as Record<TaskStatus, string>;

export const priorityLabelMap: Record<TaskPriority, string> = Object.fromEntries(
  priorityOptions.map((item) => [item.value, item.label]),
) as Record<TaskPriority, string>;

export function normalizeDateInput(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.trim()) {
    return "";
  }

  return value;
}

export function parseTaskFormData(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const status = String(formData.get("status") ?? "pending") as TaskStatus;
  const priority = String(formData.get("priority") ?? "medium") as TaskPriority;
  const due_date = normalizeDateInput(formData.get("due_date"));

  return {
    title,
    description,
    status,
    priority,
    due_date,
  };
}
