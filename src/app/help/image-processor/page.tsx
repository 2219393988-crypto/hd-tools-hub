import Link from "next/link";
import { imageExportSizes } from "@/data/tools";

export default function ImageProcessorHelpPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 sm:px-8">
      <div className="mx-auto grid max-w-4xl gap-6">
        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <Link href="/" className="font-medium text-slate-700 hover:text-slate-950">
            工具目录
          </Link>
          <span>/</span>
          <Link
            href="/tools/image-processor"
            className="font-medium text-slate-700 hover:text-slate-950"
          >
            图片处理工具
          </Link>
          <span>/</span>
          <span>使用说明</span>
        </nav>

        <header className="grid gap-3">
          <h1 className="text-3xl font-semibold tracking-normal">
            图片处理工具使用说明
          </h1>
          <p className="text-base leading-7 text-slate-600">
            该工具用于把一张原始图片快速裁剪成业务需要的固定尺寸，并导出 PNG。
          </p>
        </header>

        <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">操作步骤</h2>
          <ol className="grid list-decimal gap-3 pl-5 text-sm leading-6 text-slate-600">
            <li>进入图片处理工具页面，点击上传区域或右侧上传控件选择图片。</li>
            <li>在导出尺寸中选择目标尺寸。</li>
            <li>点击下载 PNG，浏览器会自动保存处理后的图片。</li>
          </ol>
        </section>

        <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">当前支持尺寸</h2>
          <div className="grid gap-3">
            {imageExportSizes.map((size) => (
              <div
                key={size.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-slate-50 p-3 text-sm"
              >
                <span className="font-medium text-slate-800">{size.name}</span>
                <span className="text-slate-500">
                  {size.width} × {size.height} · {size.note}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">裁剪规则</h2>
          <p className="text-sm leading-6 text-slate-600">
            工具会保留目标尺寸比例，优先让图片铺满画布，再从中心位置裁掉超出的部分。这个规则适合商品图、banner
            图和运营配图的快速统一尺寸。
          </p>
        </section>
      </div>
    </main>
  );
}
