"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import { imageExportSizes } from "@/data/tools";

type SourceImage = {
  fileName: string;
  url: string;
  width: number;
  height: number;
  element: HTMLImageElement;
};

function getCropRect(sourceWidth: number, sourceHeight: number, targetWidth: number, targetHeight: number) {
  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = targetWidth / targetHeight;

  if (sourceRatio > targetRatio) {
    const width = sourceHeight * targetRatio;
    return {
      sx: (sourceWidth - width) / 2,
      sy: 0,
      sw: width,
      sh: sourceHeight,
    };
  }

  const height = sourceWidth / targetRatio;
  return {
    sx: 0,
    sy: (sourceHeight - height) / 2,
    sw: sourceWidth,
    sh: height,
  };
}

export function ImageProcessor() {
  const [source, setSource] = useState<SourceImage | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState(imageExportSizes[0].id);
  const [message, setMessage] = useState("请先上传 JPG、PNG 或 WebP 图片。");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedSize = useMemo(
    () => imageExportSizes.find((size) => size.id === selectedSizeId) ?? imageExportSizes[0],
    [selectedSizeId],
  );

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("请选择图片文件。");
      return;
    }

    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      setSource((current) => {
        if (current?.url) {
          URL.revokeObjectURL(current.url);
        }
        return {
          fileName: file.name.replace(/\.[^/.]+$/, ""),
          url,
          width: image.naturalWidth,
          height: image.naturalHeight,
          element: image,
        };
      });
      setMessage("图片已加载，可以选择尺寸并下载。");
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setMessage("图片读取失败，请换一张图片重试。");
    };
    image.src = url;
  }

  function downloadPng() {
    if (!source) {
      setMessage("请先上传图片。");
      fileInputRef.current?.click();
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = selectedSize.width;
    canvas.height = selectedSize.height;

    const context = canvas.getContext("2d");
    if (!context) {
      setMessage("当前浏览器不支持图片导出。");
      return;
    }

    const crop = getCropRect(
      source.width,
      source.height,
      selectedSize.width,
      selectedSize.height,
    );

    context.drawImage(
      source.element,
      crop.sx,
      crop.sy,
      crop.sw,
      crop.sh,
      0,
      0,
      selectedSize.width,
      selectedSize.height,
    );

    const link = document.createElement("a");
    link.download = `${source.fileName}-${selectedSize.id}-${selectedSize.width}x${selectedSize.height}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setMessage(`已导出 ${selectedSize.name} PNG。`);
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="grid min-h-[420px] place-items-center rounded-lg border border-dashed border-slate-300 bg-white p-4">
        {source ? (
          <div className="grid w-full gap-4">
            <div className="overflow-hidden rounded-md bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source.url}
                alt="已上传图片预览"
                className="max-h-[520px] w-full object-contain"
              />
            </div>
            <p className="text-sm text-slate-500">
              原图尺寸：{source.width} × {source.height}
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex min-h-56 w-full flex-col items-center justify-center gap-3 rounded-md bg-slate-50 px-4 text-center transition hover:bg-slate-100"
          >
            <span className="text-lg font-medium text-slate-800">上传图片</span>
            <span className="max-w-sm text-sm leading-6 text-slate-500">
              支持 JPG、PNG、WebP。上传后可以选择 PC 左图、PC 右图或 M 站图尺寸导出。
            </span>
          </button>
        )}
      </div>

      <aside className="grid content-start gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="image-file">
            上传图片
          </label>
          <input
            ref={fileInputRef}
            id="image-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full cursor-pointer rounded-md border border-slate-300 text-sm text-slate-600 file:mr-4 file:border-0 file:bg-slate-950 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800"
          />
        </div>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium text-slate-700">导出尺寸</legend>
          {imageExportSizes.map((size) => (
            <label
              key={size.id}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 p-3 transition has-[:checked]:border-slate-950 has-[:checked]:bg-slate-50"
            >
              <input
                type="radio"
                name="export-size"
                value={size.id}
                checked={selectedSizeId === size.id}
                onChange={() => setSelectedSizeId(size.id)}
                className="mt-1"
              />
              <span className="grid gap-1">
                <span className="font-medium text-slate-900">{size.name}</span>
                <span className="text-sm text-slate-500">
                  {size.width} × {size.height} · {size.note}
                </span>
              </span>
            </label>
          ))}
        </fieldset>

        <div className="rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-600">
          当前会按 {selectedSize.width} × {selectedSize.height} 的比例自动居中裁剪。
        </div>

        <button
          type="button"
          onClick={downloadPng}
          className="h-11 rounded-md bg-slate-950 px-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          下载 PNG
        </button>

        <p className="text-sm leading-6 text-slate-500">{message}</p>
      </aside>
    </section>
  );
}
