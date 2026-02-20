import { ArticleClient } from "@/components/article/ArticleClient";
import { Metadata } from "next";
import { getArticleById } from "@/actions/posts.actions";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

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

  const articleMap = await getArticleById(numericId);

  if (!articleMap) {
      return <div className="p-8 text-center text-white/50">Article not found</div>;
  }

  return (
    <DashboardLayout showRightSidebar={false}>
      <ArticleClient id={id} article={articleMap} />
    </DashboardLayout>
  );
}
