import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/data/tools";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8">
        <header className="grid gap-3">
          <p className="text-sm font-medium text-slate-500">HD Tools Hub</p>
          <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
            线上工具平台
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-600">
            这里集中管理面向业务和设计团队的线上工具。第一版先上线图片处理工具，后续可以继续扩展更多工具卡片和独立页面。
          </p>
        </header>

        <section className="grid gap-4" aria-label="工具目录">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </section>
      </div>
      </main>
  );
}
