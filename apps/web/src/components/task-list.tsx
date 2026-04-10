import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, CheckCircle2, Circle, Clock3 } from "lucide-react";
import { toggleTaskStatusAction } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import type { TaskRecord } from "@/lib/types";
import { priorityLabelMap, statusLabelMap } from "@/lib/utils";

function statusTone(status: TaskRecord["status"]) {
  if (status === "completed") return "bg-[#e2f3dd] text-[#2e6b29]";
  if (status === "in_progress") return "bg-[#e8f0ff] text-[#2f5ac7]";
  return "bg-[#f2ebdf] text-[#80593c]";
}

function priorityTone(priority: TaskRecord["priority"]) {
  if (priority === "high") return "bg-[#fde4de] text-[#9b3d2f]";
  if (priority === "medium") return "bg-[#fff0cb] text-[#9f6700]";
  return "bg-[#e3efe3] text-[#33653a]";
}

export function TaskList({ tasks }: { tasks: TaskRecord[] }) {
  if (!tasks.length) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="space-y-5 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={statusTone(task.status)}>{statusLabelMap[task.status]}</Badge>
                  <Badge className={priorityTone(task.priority)}>
                    优先级 {priorityLabelMap[task.priority]}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                    {task.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                    {task.description || "这条任务还没有补充说明。"}
                  </p>
                </div>
              </div>
              <div className="rounded-3xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--muted)]">
                <p>创建于 {format(new Date(task.created_at), "yyyy-MM-dd")}</p>
                <p className="mt-1">
                  截止日期 {task.due_date ? format(new Date(task.due_date), "yyyy-MM-dd") : "未设置"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                {task.status === "completed" ? (
                  <CheckCircle2 className="size-4 text-[#2e6b29]" />
                ) : task.status === "in_progress" ? (
                  <Clock3 className="size-4 text-[#2f5ac7]" />
                ) : (
                  <Circle className="size-4 text-[#80593c]" />
                )}
                <span>{statusLabelMap[task.status]}，继续保持节奏。</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <form action={toggleTaskStatusAction}>
                  <input type="hidden" name="id" value={task.id} />
                  <input type="hidden" name="status" value={task.status} />
                  <Button type="submit" variant="secondary">
                    {task.status === "completed" ? "标记为进行中" : "标记为完成"}
                  </Button>
                </form>
                <Link
                  href={`/tasks/${task.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
                >
                  查看详情
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
