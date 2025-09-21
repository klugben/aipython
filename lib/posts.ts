import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
  author: string
  cover?: string
  content?: string
  slug: string
}

export function getAllPostIds(): string[] {
  const allFiles: string[] = []

  function getFilesRecursively(dir: string): void {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        getFilesRecursively(fullPath)
      } else if (file.endsWith('.md')) {
        // 获取相对于 content/posts 的路径
        const relativePath = path.relative(postsDirectory, fullPath)
        allFiles.push(relativePath.replace(/\.md$/, ''))
      }
    }
  }

  if (fs.existsSync(postsDirectory)) {
    getFilesRecursively(postsDirectory)
  }

  return allFiles
}

export function getAllPosts(): Post[] {
  const postIds = getAllPostIds()
  const allPostsData = postIds.map((id) => {
    return getPostData(id)
  })

  // 按日期排序
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured)
}

export function getPostData(id: string): Post {
  const fullPath = path.join(postsDirectory, `${id}.md`)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${id}`)
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // 生成slug
  const slug = id.split('/').pop() || id

  return {
    id,
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    readTime: data.readTime || '',
    category: data.category || '',
    tags: data.tags || [],
    featured: data.featured || false,
    author: data.author || '',
    cover: data.cover || '',
    content
  }
}

export async function getPostDataWithHTML(id: string): Promise<Post> {
  const post = getPostData(id)

  // 将markdown转换为HTML
  const processedContent = await remark()
    .use(html)
    .process(post.content || '')

  const contentHtml = processedContent.toString()

  return {
    ...post,
    content: contentHtml
  }
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post =>
    post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post =>
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = new Set(allPosts.map(post => post.category))
  return Array.from(categories).filter(Boolean)
}

export function getTags(): string[] {
  const allPosts = getAllPosts()
  const tags = new Set(allPosts.flatMap(post => post.tags))
  return Array.from(tags).filter(Boolean)
}