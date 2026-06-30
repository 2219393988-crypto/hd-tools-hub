export type ToolStatus = "可用" | "规划中" | "维护中";

export type ExportSize = {
  id: string;
  name: string;
  width: number;
  height: number;
  note: string;
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  status: ToolStatus;
  owner: string;
  version: string;
  updatedAt: string;
  href: string;
  helpHref: string;
};

export const imageExportSizes: ExportSize[] = [
  {
    id: "pc-left",
    name: "PC 左图",
    width: 800,
    height: 600,
    note: "第一版占位尺寸",
  },
  {
    id: "pc-right",
    name: "PC 右图",
    width: 800,
    height: 600,
    note: "第一版占位尺寸",
  },
  {
    id: "m-site",
    name: "M 站图",
    width: 690,
    height: 460,
    note: "移动站正式尺寸",
  },
];

export const tools: Tool[] = [
  {
    id: "image-processor",
    name: "图片处理工具",
    description: "上传图片后按指定尺寸自动居中裁剪，并导出 PNG 文件。",
    status: "可用",
    owner: "HD 产品/UI",
    version: "v0.1.0",
    updatedAt: "2026-06-30",
    href: "/tools/image-processor",
    helpHref: "/help/image-processor",
  },
];
