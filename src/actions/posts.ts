"use server";

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";

interface PostCreateData {
    content: string;
    mediaUrls?: string[];
    type?: string; 
}

export async function createPost(data: PostCreateData) {
    const stackUser = await stackServerApp.getUser();
    if (!stackUser) return { error: "Unauthorized" };

    try {
        const type = data.type || (data.mediaUrls && data.mediaUrls.length > 0 ? "image" : "text");
        
        const [newPost] = await db.insert(posts).values({
            userId: stackUser.id,
            content: data.content,
            mediaUrls: data.mediaUrls || [],
            type: type,
            likesCount: 0,
            commentsCount: 0,
            sharesCount: 0,
        }).returning();

        // Revalidate feed pages
        revalidatePath("/home");
        revalidatePath("/");
        revalidatePath("/profile");

        return { success: true, post: newPost };
    } catch(e) {
        console.error("Failed to create post:", e);
        return { error: "Failed to create post." };
    }
}
