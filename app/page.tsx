import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { getAllPosts } from "@/lib/posts"

export default function HomePage() {
  // 在服务端获取文章数据
  const posts = getAllPosts()

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <MainContent posts={posts} />
    </div>
  )
}
