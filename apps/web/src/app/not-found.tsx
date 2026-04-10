import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
        404
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
        任务不存在
      </h1>
      <p className="max-w-lg text-sm leading-7 text-[var(--muted)]">
        这个任务可能已经被删除，或者当前数据库还没有同步到这条记录。
      </p>
      <Link
        href="/"
        className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white"
      >
        返回首页
      </Link>
    </main>
  );
}
