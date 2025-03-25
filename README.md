# ResuMAI - AI求职助手

ResuMAI是一个基于AI的求职助手网站，帮助求职者分析自己的履历并获取职业建议。

## 功能特点

- **AI对话功能**：用户可以输入自己的求职信息，AI会生成对应的求职建议
- **社区交流**：用户可以在社区页面分享求职经验和讨论
- **多语言支持**：支持中英文切换

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- i18next (国际化)
- DeepSeek API (AI对话)

## 开始使用

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

## 项目结构

- `src/app/components` - React组件
- `src/app/services` - 服务API
- `src/app/i18n` - 国际化配置
- `src/app/types` - TypeScript类型定义

## 贡献指南
欢迎提交Pull Request或Issue来帮助改进这个项目。 