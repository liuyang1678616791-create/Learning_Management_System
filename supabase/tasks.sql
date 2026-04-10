create extension if not exists "pgcrypto";

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
for delete to anon using (true);
