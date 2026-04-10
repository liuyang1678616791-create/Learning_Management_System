import Link from "next/link";
import { cn } from "@repo/ui/cn";

const tabs = [
  { key: "all", label: "全部" },
  { key: "pending", label: "待开始" },
  { key: "in_progress", label: "进行中" },
  { key: "completed", label: "已完成" },
];

export function FilterTabs({ current }: { current: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.key === "all" ? "/" : `/?status=${tab.key}`}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition",
            current === tab.key
              ? "bg-[var(--primary)] text-white"
              : "bg-white text-[var(--foreground)] ring-1 ring-[var(--border)] hover:bg-[#f7f1e6]",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
