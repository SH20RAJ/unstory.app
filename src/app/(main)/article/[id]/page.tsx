import { ArticleClient } from "@/components/article/ArticleClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  // In real app we would fetch the article title here
  return {
    title: `Article | Unstory`,
    description: "Read campus stories and updates.",
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  return <ArticleClient id={id} />;
}
