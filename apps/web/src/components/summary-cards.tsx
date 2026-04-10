import { CheckCheck, CircleDashed, LoaderCircle, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { TaskRecord } from "@/lib/types";

const items = [
  { key: "all", label: "总任务数", icon: Sparkles },
  { key: "pending", label: "待开始", icon: CircleDashed },
  { key: "in_progress", label: "进行中", icon: LoaderCircle },
  { key: "completed", label: "已完成", icon: CheckCheck },
] as const;

export function SummaryCards({ tasks }: { tasks: TaskRecord[] }) {
  const counts = {
    all: tasks.length,
    pending: tasks.filter((task) => task.status === "pending").length,
    in_progress: tasks.filter((task) => task.status === "in_progress").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.key}>
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="text-sm text-[var(--muted)]">{item.label}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">
                  {counts[item.key]}
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--background)] p-3 text-[var(--primary)]">
                <Icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
