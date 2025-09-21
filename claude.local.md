# Vercel 快速部署个人博客操作流程

## 项目信息
- **项目类型**: Next.js 博客应用
- **框架版本**: Next.js 14.2.16
- **UI组件**: Radix UI + Tailwind CSS
- **包管理器**: pnpm

## 1. 本地开发环境准备

### 安装依赖
```bash
# 使用 pnpm 安装依赖
pnpm install

# 或使用 npm
npm install
```

### 本地运行测试
```bash
# 开发模式
pnpm dev
# 访问 http://localhost:3000

# 构建测试
pnpm build
pnpm start
```

## 2. 代码仓库准备

### Git 初始化（如果尚未初始化）
```bash
git init
git add .
git commit -m "Initial commit: Next.js blog setup"
```

### 推送到 GitHub
```bash
# 创建 GitHub 仓库后
git remote add origin https://github.com/username/your-blog-repo.git
git branch -M main
git push -u origin main
```

## 3. Vercel 部署步骤

### 方式一：通过 Vercel Dashboard（推荐）

1. **登录 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择 GitHub 仓库
   - 选择你的博客仓库

3. **配置部署设置**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build (自动检测)
   Output Directory: .next (自动检测)
   Install Command: npm install (自动检测)
   ```

4. **环境变量配置**（如果需要）
   - 在 "Environment Variables" 部分添加
   - 例如：`NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app`

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成（通常 1-3 分钟）

### 方式二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 在项目根目录部署
vercel

# 生产环境部署
vercel --prod
```

## 4. 自动部署配置

### GitHub 集成
- Vercel 自动监听 GitHub 仓库变化
- 每次 `git push` 到 main 分支自动触发部署
- Pull Request 会创建预览部署

### 分支策略
```
main 分支 → 生产环境部署
develop 分支 → 预览环境部署
feature/* 分支 → PR 预览部署
```

## 5. 域名配置

### 使用 Vercel 免费域名
- 自动分配：`your-project-name.vercel.app`
- 可在 Project Settings → Domains 中查看

### 自定义域名
1. **添加域名**
   - Project Settings → Domains
   - 输入自定义域名（如：blog.yourdomain.com）

2. **DNS 配置**
   ```
   类型: CNAME
   名称: blog (或 @ 用于根域名)
   值: cname.vercel-dns.com
   ```

3. **SSL 证书**
   - Vercel 自动提供免费 SSL 证书
   - 自动续期

## 6. 性能优化配置

### next.config.mjs 优化
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片优化
  images: {
    domains: ['your-image-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // 压缩
  compress: true,

  // 静态导出（如果需要）
  // output: 'export',

  // 分析包大小
  bundleAnalyzer: {
    enabled: process.env.ANALYZE === 'true',
  }
}

export default nextConfig
```

### Vercel 项目设置
```json
{
  "functions": {
    "app/api/**/*.js": {
      "maxDuration": 10
    }
  },
  "regions": ["hkg1", "sin1"]
}
```

## 7. 监控和分析

### Vercel Analytics
```bash
# 已安装在 package.json 中
"@vercel/analytics": "latest"
```

### 使用 Analytics
```javascript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 8. 部署检查清单

### 部署前检查
- [ ] ✅ 本地 `pnpm build` 构建成功
- [ ] ✅ 代码已推送到 GitHub
- [ ] ✅ 环境变量已配置
- [ ] ✅ next.config.mjs 配置正确

### 部署后验证
- [ ] ✅ 网站能正常访问
- [ ] ✅ 所有页面路由正常
- [ ] ✅ 图片和静态资源加载正常
- [ ] ✅ 移动端响应式正常
- [ ] ✅ SEO 标签正确

## 9. 常见问题解决

### 构建失败
```bash
# 查看详细错误日志
vercel logs your-deployment-url

# 常见解决方案
1. 检查 TypeScript 类型错误
2. 清理 node_modules 重新安装
3. 检查 next.config.mjs 语法
```

### 域名解析问题
```bash
# 检查 DNS 设置
nslookup your-domain.com

# 等待 DNS 传播（最多 48 小时）
```

### 性能优化
```bash
# 分析包大小
ANALYZE=true pnpm build

# 检查 Core Web Vitals
访问 Vercel Analytics Dashboard
```

## 10. 维护和更新

### 定期维护
```bash
# 更新依赖
pnpm update

# 安全检查
pnpm audit

# 提交更新
git add .
git commit -m "chore: update dependencies"
git push
```

### 备份策略
- GitHub 仓库作为代码备份
- Vercel 自动保留部署历史
- 定期导出重要内容数据

---

**最后更新**: 2025-09-21
**维护者**: AI Assistant
**适用版本**: Next.js 14.x + Vercel