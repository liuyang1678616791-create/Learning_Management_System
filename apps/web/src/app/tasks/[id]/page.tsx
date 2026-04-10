import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Flag, Layers3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TaskEditForm } from "@/components/task-edit-form";
import { getTaskById } from "@/lib/tasks";
import { priorityLabelMap, statusLabelMap } from "@/lib/utils";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 xl:px-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]"
      >
        <ArrowLeft className="size-4" />
        返回首页
      </Link>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#e8f0ff] text-[#2f5ac7]">{statusLabelMap[task.status]}</Badge>
                <Badge className="bg-[#fff0cb] text-[#9f6700]">
                  优先级 {priorityLabelMap[task.priority]}
                </Badge>
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
                {task.title}
              </h1>
              <p className="text-sm leading-7 text-[var(--muted)]">
                {task.description || "这条任务当前还没有更详细的说明。"}
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-3 rounded-3xl bg-[var(--background)] p-4">
                <CalendarDays className="size-5 text-[var(--primary)]" />
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Due Date</p>
                  <p className="text-sm font-medium">
                    {task.due_date ? task.due_date.slice(0, 10) : "未设置截止日期"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-3xl bg-[var(--background)] p-4">
                <Flag className="size-5 text-[var(--primary)]" />
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Priority</p>
                  <p className="text-sm font-medium">{priorityLabelMap[task.priority]}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-3xl bg-[var(--background)] p-4">
                <Layers3 className="size-5 text-[var(--primary)]" />
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Status</p>
                  <p className="text-sm font-medium">{statusLabelMap[task.status]}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <TaskEditForm task={task} />
      </div>
    </main>
  );
}
