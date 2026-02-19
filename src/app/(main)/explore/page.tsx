import { ExploreClient } from "@/components/explore/ExploreClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore | Unstory",
  description: "Discover trending content across the campus.",
};

export default function ExplorePage() {
  return <ExploreClient />;
}
