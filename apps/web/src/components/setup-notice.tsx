import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function SetupNotice() {
  return (
    <Card className="border-[#d9be8c] bg-[#fff6e1]">
      <CardContent className="space-y-3 p-6">
        <p className="text-sm font-semibold text-[#7f5b1b]">
          当前还没有读取到 Supabase 环境变量，页面会以演示模式渲染。
        </p>
        <p className="text-sm text-[#7f5b1b]">
          配置 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 后，就可以使用真实 CRUD。
        </p>
        <Link
          href="/setup"
          className="text-sm font-medium text-[#7f5b1b] underline underline-offset-4"
        >
          打开初始化说明
        </Link>
      </CardContent>
    </Card>
  );
}
