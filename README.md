# hd-tools-hub

HD Tools Hub 是一个线上网站版工具平台，第一版包含图片处理工具。

## 技术栈

- Next.js：网站框架，负责页面路由、构建和本地预览。
- TypeScript：给代码加类型提示，减少参数和数据结构写错的概率。
- Tailwind CSS：用 class 写样式，适合快速搭建后台/工具类页面。
- pnpm：包管理工具，负责安装依赖和运行脚本。

## 常用命令

```bash
pnpm dev
```

启动本地预览服务。启动后访问 `http://localhost:3000`。

```bash
pnpm lint
```

检查代码规范和常见写法问题。

```bash
pnpm build
```

模拟线上构建，确认项目可以被正式部署。

## 页面

- `/`：工具目录首页，展示工具卡片、状态、负责人、版本、更新时间和入口按钮。
- `/tools/image-processor`：图片处理工具，支持上传图片、选择尺寸、居中裁剪、下载 PNG。
- `/help/image-processor`：图片处理工具使用说明。

## 关键文件

- `src/data/tools.ts`：工具目录数据和图片导出尺寸配置。后续加工具或改尺寸，优先看这里。
- `src/components/ToolCard.tsx`：首页工具卡片组件。
- `src/app/page.tsx`：首页。
- `src/app/tools/image-processor/page.tsx`：图片处理工具页面外壳。
- `src/app/tools/image-processor/ImageProcessor.tsx`：图片上传、裁剪和下载逻辑。
- `src/app/help/image-processor/page.tsx`：使用说明页面。
- `src/app/globals.css`：全局样式。

## 后续扩展工具的方式

1. 在 `src/data/tools.ts` 里新增一条工具数据。
2. 在 `src/app/tools/新工具名/page.tsx` 里创建工具页面。
3. 如需说明页，在 `src/app/help/新工具名/page.tsx` 里创建说明页面。
4. 跑 `pnpm lint` 和 `pnpm build`，确认没有问题。
