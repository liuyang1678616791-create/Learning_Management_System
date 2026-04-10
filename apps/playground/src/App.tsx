const items = [
  "pnpm workspace",
  "Turborepo task orchestration",
  "Next.js 15 main app",
  "Vite side app",
  "Supabase-backed CRUD design",
];

export default function App() {
  return (
    <main className="shell">
      <section className="panel">
        <p className="eyebrow">Workspace Playground</p>
        <h1>这个 Vite 应用用于展示仓库具备多应用工作区结构。</h1>
        <p className="copy">
          作业的主交付在 `apps/web`，这里保留一个轻量的 React + Vite 应用，证明仓库确实采用
          monorepo 组织多个前端入口。
        </p>
        <div className="grid">
          {items.map((item) => (
            <article key={item} className="tile">
              {item}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
