# ResuMAI - AI求职助手

ResuMAI是一个基于AI的求职助手网站，帮助求职者分析自己的履历并获取个性化的职业建议。通过强大的自然语言处理和深度推理能力，ResuMAI能够提供针对性的职业规划指导。

## 🌟 功能特点

- **AI职业顾问**：输入履历、教育背景和求职目标，获取详细的职业建议
- **深度思考模式**：查看AI的思考过程，了解推荐背后的逻辑和分析
- **标准模式**：快速获取简洁的建议，适合需要快速参考的场景
- **聊天历史**：自动保存所有对话，方便随时查看和回顾
- **多语言支持**：完整支持中英文界面切换，满足不同用户的需求
- **响应式设计**：适配桌面和移动设备，随时随地获取建议

## 🚀 技术栈

- **前端框架**: Next.js 14, React 18
- **类型检查**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: i18next
- **AI服务**: DeepSeek API (聊天和推理模型)
- **构建工具**: Node.js, npm

## 🔧 开始使用

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建`.env.local`文件，添加以下内容：

```
NEXT_PUBLIC_DEEPSEEK_API_KEY=your_deepseek_api_key_here
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
npm run start
```

## 📁 项目结构

```
src/
└── app/
    ├── components/  - 可复用UI组件
    ├── services/    - API服务和数据处理
    ├── i18n/        - 国际化配置和翻译
    ├── types/       - TypeScript类型定义
    ├── chat/        - 聊天功能页面
    ├── community/   - 社区功能页面
    ├── page.tsx     - 首页
    ├── layout.tsx   - 应用布局
    └── globals.css  - 全局样式
```

## 💡 特色功能详解

### 深度思考模式

使用DeepSeek的推理模型，提供详细的思考过程，让用户了解AI如何分析他们的背景和行业趋势。

### 自动保存对话

系统会自动保存所有对话历史，无需手动操作，让用户可以随时回顾之前的建议。

### 响应式界面

无论是在桌面还是移动设备上，都能获得流畅的使用体验，界面会自动适应不同屏幕尺寸。

## 🛠️ 开发者指南

### 代码风格

项目使用ESLint和Prettier进行代码格式化，确保提交前运行：

```bash
npm run lint
```

### 添加新功能

1. 创建相关组件在`components`目录
2. 如需新页面，在对应目录创建页面组件
3. 添加相关国际化文本到`i18n/index.ts`文件

## 🤝 贡献指南

欢迎提交Pull Request或Issue来帮助改进这个项目。贡献步骤：

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交变更 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交Pull Request

## 许可证

本项目采用MIT许可证 