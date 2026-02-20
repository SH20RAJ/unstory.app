"use server";

import { db } from "@/db/drizzle";
import { communities } from "@/db/schema";
import { eq, or } from "drizzle-orm";

export async function getAllCommunities() {
  return await db.query.communities.findMany();
}

export async function getCommunityBySlugOrId(slug: string) {
  const numericId = parseInt(slug, 10);
  
  return await db.query.communities.findFirst({
      where: isNaN(numericId)
          ? eq(communities.slug, slug)
          : or(eq(communities.slug, slug), eq(communities.id, numericId))
  });
}
