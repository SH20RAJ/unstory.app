import { ExploreClient } from "@/components/explore/ExploreClient";
import { Metadata } from "next";
import { getExploreMediaPosts } from "@/actions/posts.actions";

export const metadata: Metadata = {
  title: "Explore | Unstory",
  description: "Discover trending content across the campus.",
};

export default async function ExplorePage() {
  const exploreItems = await getExploreMediaPosts();
  return <ExploreClient exploreItems={exploreItems} />;
}
