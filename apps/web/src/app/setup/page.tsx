import { Card, CardContent } from "@/components/ui/card";

const sql = `create extension if not exists "pgcrypto";

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

create policy "Public can view tasks" on public.tasks
for select to anon using (true);

create policy "Public can insert tasks" on public.tasks
for insert to anon with check (true);

create policy "Public can update tasks" on public.tasks
for update to anon using (true) with check (true);

create policy "Public can delete tasks" on public.tasks
for delete to anon using (true);`;

export default function SetupPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
      <Card className="w-full">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              Setup Guide
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
              Supabase 初始化说明
            </h1>
            <p className="text-sm leading-7 text-[var(--muted)]">
              把下面 SQL 粘贴到 Supabase SQL Editor 执行，然后在本地和 Vercel 配置环境变量：
              `NEXT_PUBLIC_SUPABASE_URL` 与 `NEXT_PUBLIC_SUPABASE_ANON_KEY`。
            </p>
          </div>

          <pre className="overflow-x-auto rounded-[28px] bg-[#1f241d] p-5 text-sm leading-7 text-[#f8f5ef]">
            <code>{sql}</code>
          </pre>
        </CardContent>
      </Card>
    </main>
  );
}
