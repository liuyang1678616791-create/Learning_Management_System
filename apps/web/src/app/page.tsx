import { FilterTabs } from "@/components/filter-tabs";
import { SetupNotice } from "@/components/setup-notice";
import { SummaryCards } from "@/components/summary-cards";
import { TaskCreateForm } from "@/components/task-create-form";
import { TaskList } from "@/components/task-list";
import { hasSupabaseEnv } from "@/lib/supabase";
import { listTasks } from "@/lib/tasks";

type HomePageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const currentStatus = params.status ?? "all";
  const tasks = await listTasks(currentStatus);
  const configured = hasSupabaseEnv();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 xl:px-10">
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-5 rounded-[32px] border border-[var(--border)] bg-[var(--surface-strong)] p-8 shadow-[0_25px_80px_rgba(62,77,52,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--muted)]">
            Learning Management System
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight md:text-6xl">
              为你的课程作业准备一个能部署、能演示、能继续扩展的学习任务面板。
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
              这个版本聚焦最重要的三件事：任务列表、详情编辑、真实 CRUD。架构采用
              monorepo，主站使用 Next.js，数据层连接 Supabase，并保留一个独立的 Vite
              应用用于技术栈展示。
            </p>
          </div>
          <SummaryCards tasks={tasks} />
        </div>

        <TaskCreateForm />
      </section>

      {!configured ? <SetupNotice /> : null}

      <section className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
              学习任务列表
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              支持筛选状态、快速完成任务和跳转到详情页继续编辑。
            </p>
          </div>
          <FilterTabs current={currentStatus} />
        </div>

        <TaskList tasks={tasks} />
      </section>
    </main>
  );
}
