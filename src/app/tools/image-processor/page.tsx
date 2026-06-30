import Link from "next/link";
import { ImageProcessor } from "./ImageProcessor";

export default function ImageProcessorPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-6">
        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <Link href="/" className="font-medium text-slate-700 hover:text-slate-950">
            工具目录
          </Link>
          <span>/</span>
          <span>图片处理工具</span>
        </nav>

        <header className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold tracking-normal">
              图片处理工具
            </h1>
            <Link
              href="/help/image-processor"
              className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-white"
            >
              使用说明
            </Link>
          </div>
          <p className="max-w-3xl text-base leading-7 text-slate-600">
            上传一张图片，选择导出尺寸后，系统会按目标比例自动居中裁剪，并下载为 PNG。
          </p>
        </header>

        <ImageProcessor />
      </div>
    </main>
  );
}
