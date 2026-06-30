import Link from "next/link";
import type { Tool } from "@/data/tools";

type ToolCardProps = {
  tool: Tool;
};

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">{tool.name}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {tool.description}
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
          {tool.status}
        </span>
      </div>

      <dl className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
        <div>
          <dt className="text-xs text-slate-400">负责人</dt>
          <dd className="mt-1 font-medium text-slate-800">{tool.owner}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400">版本</dt>
          <dd className="mt-1 font-medium text-slate-800">{tool.version}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400">更新时间</dt>
          <dd className="mt-1 font-medium text-slate-800">
            {tool.updatedAt}
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-3">
        <Link
          href={tool.href}
          className="inline-flex h-10 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          打开工具
        </Link>
        <Link
          href={tool.helpHref}
          className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          使用说明
        </Link>
      </div>
    </article>
  );
}
