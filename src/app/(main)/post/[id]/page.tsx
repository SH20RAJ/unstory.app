import { PostClient } from "@/components/post/PostClient";
import { Metadata } from "next";
import { getSinglePost } from "@/actions/posts.actions";
import { Post } from "@/components/dashboard/feed/FeedPost";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Post ${id} | Unstory`,
    description: "View post details, comments, and interactions.",
  };
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  
  if (isNaN(numericId)) {
      return <div className="p-8 text-center text-white/50">Invalid post ID</div>;
  }

  const rawPost = await getSinglePost(numericId);
  
  if (!rawPost) {
      return <div className="p-8 text-center text-white/50">Post not found</div>;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedPost = {
      id: rawPost.post.id,
      user: {
          name: rawPost.user.nickname || rawPost.user.name,
          username: rawPost.user.username || 'user',
          avatar: rawPost.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${rawPost.user.username}`,
          verified: !!rawPost.user.verified,
          collegeSafeName: rawPost.college?.name,
      },
      time: new Date(rawPost.post.createdAt).toLocaleDateString(),
      type: rawPost.post.type as "text" | "image" | "video" | "poll" | "event" | "article",
      content: rawPost.post.content || '',
      image: rawPost.post.mediaUrls?.[0],
      poll: rawPost.post.pollDetails as any, 
      event: rawPost.post.eventDetails as any,
      article: rawPost.post.articleDetails as any,
      likes: rawPost.post.likesCount || 0,
      comments: rawPost.post.commentsCount || 0,
      shares: rawPost.post.sharesCount || 0,
  };

  return <PostClient post={mappedPost as Post} />;
}
