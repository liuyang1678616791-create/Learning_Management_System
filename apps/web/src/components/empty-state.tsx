import { BookCheck } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card className="bg-[linear-gradient(135deg,rgba(79,111,82,0.08),rgba(210,171,103,0.14))]">
      <CardContent className="flex flex-col items-start gap-4 p-8">
        <div className="rounded-2xl bg-white/80 p-3 text-[var(--primary)]">
          <BookCheck className="size-6" />
        </div>
        <div className="space-y-2">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            还没有学习任务
          </h3>
          <p className="max-w-xl text-sm text-[var(--muted)]">
            从右侧表单创建第一条任务，或者先配置 Supabase 后再开始录入正式数据。
          </p>
        </div>
        <Link
          href="/setup"
          className="text-sm font-medium text-[var(--primary)] underline-offset-4 hover:underline"
        >
          查看数据库初始化说明
        </Link>
      </CardContent>
    </Card>
  );
}
