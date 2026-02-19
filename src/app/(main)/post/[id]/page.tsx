import { PostClient } from "@/components/post/PostClient";
import { Metadata } from "next";

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
  return <PostClient postId={Number(id)} />;
}
