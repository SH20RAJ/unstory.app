"use server";

import { db } from "@/db/drizzle";
import { users, posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getCollegeByDomainOrSlug(identifier: string) {
    const college = await db.query.colleges.findFirst({
        where: (fields, { eq, or }) => or(
            eq(fields.slug, identifier),
            eq(fields.emailDomain, identifier)
        )
    });

    if (!college) return null;

    // Get basic stats
    const enrolledUsers = await db.query.users.findMany({
        where: eq(users.collegeId, college.id),
        limit: 10,
    });

    // Optionally fetch posts linked to this college's users
    // This requires a join
    const recentPosts = await db.select({
        post: posts,
        user: users,
    })
    .from(posts)
    .innerJoin(users, eq(posts.userId, users.id))
    .where(eq(users.collegeId, college.id))
    .orderBy(desc(posts.createdAt))
    .limit(10);

    return {
        ...college,
        enrolledUsers,
        recentPosts,
        stats: {
            students: enrolledUsers.length, // this is just a subset count, ideally do a count()
        }
    };
}
