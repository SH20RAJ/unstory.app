import { ExploreClient } from "@/components/explore/ExploreClient";
import { Metadata } from "next";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { desc, sql } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Explore | Unstory",
  description: "Discover trending content across the campus.",
};

export default async function ExplorePage() {
  const mediaPosts = await db.query.posts.findMany({
      where: sql`${posts.mediaUrls} IS NOT NULL AND array_length(${posts.mediaUrls}, 1) > 0`,
      orderBy: [desc(posts.createdAt)],
      limit: 30,
  });

  const exploreItems = mediaPosts.map(p => {
    // Determine aspect ratio for masonry (pseudo-random based on id or just alternating)
    const aspects = ["aspect-square", "aspect-[4/5]", "aspect-[3/4]", "aspect-video"];
    const aspect = aspects[p.id % aspects.length];

    return {
      id: p.id,
      image: p.mediaUrls?.[0] || "",
      aspect,
      metrics: {
        likes: p.likesCount || 0,
        comments: p.commentsCount || 0,
      },
      type: p.type || "image"
    };
  });

  return <ExploreClient exploreItems={exploreItems} />;
}
