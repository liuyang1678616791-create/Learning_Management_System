import { deleteTaskAction, updateTaskAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { TaskRecord } from "@/lib/types";
import { priorityOptions, statusOptions } from "@/lib/utils";

export function TaskEditForm({ task }: { task: TaskRecord }) {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
            Task Editor
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">
            编辑任务
          </h1>
        </div>

        <form action={updateTaskAction} className="space-y-4">
          <input type="hidden" name="id" value={task.id} />

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              任务标题
            </label>
            <Input id="title" name="title" defaultValue={task.title} required />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              任务描述
            </label>
            <Textarea id="description" name="description" defaultValue={task.description ?? ""} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                状态
              </label>
              <Select id="status" name="status" defaultValue={task.status}>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">
                优先级
              </label>
              <Select id="priority" name="priority" defaultValue={task.priority}>
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="due_date" className="text-sm font-medium">
              截止日期
            </label>
            <Input
              id="due_date"
              name="due_date"
              type="date"
              defaultValue={task.due_date ? task.due_date.slice(0, 10) : ""}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit">保存修改</Button>
          </div>
        </form>

        <form action={deleteTaskAction}>
          <input type="hidden" name="id" value={task.id} />
          <Button type="submit" variant="danger">
            删除任务
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
