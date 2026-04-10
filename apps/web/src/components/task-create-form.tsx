import { createTaskAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { priorityOptions, statusOptions } from "@/lib/utils";

export function TaskCreateForm() {
  return (
    <Card className="sticky top-6">
      <CardContent className="space-y-5 p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
            New Task
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">
            创建学习任务
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            录入标题、优先级和截止日期，马上形成可展示的学习计划。
          </p>
        </div>

        <form action={createTaskAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              任务标题
            </label>
            <Input id="title" name="title" placeholder="例如：完成 React 19 学习笔记" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              任务描述
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="写下课程目标、要交付的内容或今天的进度安排。"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                状态
              </label>
              <Select id="status" name="status" defaultValue="pending">
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
              <Select id="priority" name="priority" defaultValue="medium">
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
            <Input id="due_date" name="due_date" type="date" />
          </div>

          <Button type="submit" className="w-full">
            添加任务
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
