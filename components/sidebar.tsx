import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, User, BookOpen, Code, Mail, Github, Twitter, Rss } from "lucide-react"

export function Sidebar() {
  const navItems = [
    { icon: Home, label: "首页", href: "#" },
    { icon: User, label: "关于我", href: "#about" },
    { icon: BookOpen, label: "技术文章", href: "#articles" },
    { icon: Code, label: "项目展示", href: "#projects" },
    { icon: Mail, label: "联系方式", href: "#contact" },
  ]

  const categories = [
    { name: "Python", count: 15 },
    { name: "AI/ML", count: 12 },
    { name: "Web开发", count: 8 },
    { name: "数据科学", count: 6 },
    { name: "算法", count: 4 },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-6 overflow-y-auto">
      {/* 博客标题 */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-sidebar-foreground mb-2">AI Python 技术博客</h1>
        <p className="text-sm text-muted-foreground">专注于AI和Python技术分享</p>
      </div>

      {/* 导航菜单 */}
      <nav className="mb-8">
        <h2 className="text-sm font-semibold text-sidebar-foreground mb-4">导航</h2>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                asChild
              >
                <a href={item.href}>
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 文章分类 */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-sidebar-foreground mb-4">分类</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <span className="text-sm text-sidebar-foreground">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* 社交链接 */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-sidebar-foreground mb-4">关注我</h2>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="p-2 bg-transparent">
            <Github className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="p-2 bg-transparent">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="p-2 bg-transparent">
            <Rss className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 联系信息卡片 */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">联系方式</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>📧 contact@aipython.cc</p>
          <p>🌐 aipython.cc</p>
        </div>

        {/* 二维码占位 */}
        <div className="mt-4 p-4 bg-muted rounded-lg text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">微信二维码</span>
          </div>
          <p className="text-xs text-muted-foreground">扫码添加微信</p>
        </div>
      </Card>
    </aside>
  )
}
