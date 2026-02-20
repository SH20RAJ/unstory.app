import { ArticleClient } from "@/components/article/ArticleClient";
import { Metadata } from "next";
import { db } from "@/db/drizzle";
import { posts, users } from "@/db/schema";
import { eq } from "drizzle-orm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Article | Unstory`,
    description: "Read campus stories and updates.",
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  
  if (isNaN(numericId)) {
      return <div className="p-8 text-center text-white/50">Invalid article ID</div>;
  }

  const rawPost = await db.select({
      post: posts,
      user: users,
  })
  .from(posts)
  .innerJoin(users, eq(posts.userId, users.id))
  .where(eq(posts.id, numericId))
  .limit(1);

  if (rawPost.length === 0) {
      return <div className="p-8 text-center text-white/50">Article not found</div>;
  }

  const { post, user } = rawPost[0];
  const articleDetails = post.articleDetails as Record<string, unknown>;

  const articleMap = {
      category: String(articleDetails?.category || "Campus News"),
      title: String(articleDetails?.title || "Untitled Article"),
      author: {
          name: user.nickname || user.name,
          avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
          date: new Date(post.createdAt).toLocaleDateString(),
          readTime: String(articleDetails?.readTime || "3 min read"),
      },
      coverImage: post.mediaUrls?.[0] || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop',
      content: post.content || 'No content provided.',
      stats: {
          likes: post.likesCount || 0,
          comments: post.commentsCount || 0,
      }
  };

  return <ArticleClient id={id} article={articleMap} />;
}
