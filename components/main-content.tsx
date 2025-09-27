import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Star } from "lucide-react"
import { Post } from "@/lib/posts"
import Link from "next/link"
import { Footer } from "@/components/footer"

interface MainContentProps {
  posts: Post[]
}

export function MainContent({ posts }: MainContentProps) {
  // 使用传入的文章数据
  const featuredPosts = posts.slice(0, 3) // 取前3篇作为精选

  const recentProjects = [
    {
      name: "AI聊天机器人",
      description: "基于GPT的智能对话系统",
      tech: ["Python", "OpenAI API", "Streamlit"],
    },
    {
      name: "数据可视化工具",
      description: "交互式数据分析和可视化平台",
      tech: ["Python", "Plotly", "Dash"],
    },
    {
      name: "图像识别API",
      description: "基于深度学习的图像分类服务",
      tech: ["PyTorch", "FastAPI", "Docker"],
    },
  ]

  return (
    <main className="flex-1 p-8">
      {/* 头部介绍 */}
      <section className="mb-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">AI Python 技术博客</h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            分享AI、Python和数据科学的技术实践，一起探索人工智能的无限可能。
          </p>
        </div>
      </section>

      {/* 精选文章 */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">精选文章</h2>
          <Button variant="outline" className="text-sm bg-transparent">
            查看全部 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6">
          {featuredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        {post.featured && (
                          <Badge variant="default" className="bg-accent text-accent-foreground">
                            <Star className="w-3 h-3 mr-1" />
                            精选
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl mb-2 hover:text-accent transition-colors">
                        {post.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新项目 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">最新项目</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((project, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 关于我 */}
      <section id="about" className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">关于我</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              AI和Python技术爱好者，专注于编程探索和学习。
              在这里分享技术经验和解决方案，与技术社区一起成长。
            </p>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </main>
  )
}
