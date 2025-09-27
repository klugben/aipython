import { getPostData, getAllPostIds } from "@/lib/posts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const postIds = getAllPostIds()
  return postIds.map((id) => ({
    slug: id.split('/').pop() || id, // 使用文件名作为slug
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // 根据slug查找对应的文章
  const allPostIds = getAllPostIds()
  const fullId = allPostIds.find(id =>
    id.split('/').pop() === params.slug || id === params.slug
  )

  if (!fullId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const post = getPostData(fullId)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首页
            </Button>
          </Link>
        </div>

        {/* 文章卡片 */}
        <Card>
          <CardHeader className="pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              {post.featured && (
                <Badge variant="default">精选</Badge>
              )}
            </div>
            <CardTitle className="text-3xl font-bold leading-tight mb-4">
              {post.title}
            </CardTitle>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              {post.author && (
                <div>作者：{post.author}</div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {/* 文章摘要 */}
            <div className="text-lg text-muted-foreground mb-8 p-4 bg-muted/30 rounded-lg border-l-4 border-accent">
              {post.excerpt}
            </div>

            {/* 文章内容 */}
            <div className="prose prose-gray max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {post.content || '文章内容正在加载...'}
              </div>
            </div>

            {/* 标签 */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}