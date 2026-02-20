"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";

interface ProfileUpdateData {
    nickname?: string;
    bio?: string;
    interests?: string[];
    avatar?: string;
    socialLinks?: {
        portfolio?: string;
        github?: string;
        linkedin?: string;
    };
}

export async function updateProfile(data: ProfileUpdateData) {
    const stackUser = await stackServerApp.getUser();
    if (!stackUser) return { error: "Unauthorized" };

    try {
        // Fetch existing user to safely merge jsonb
        const existing = await db.query.users.findFirst({
            where: eq(users.id, stackUser.id)
        });

        if (!existing) return { error: "User not found" };

        let updatedSocialLinks = existing.socialLinks as object || {};
        if (data.socialLinks) {
             updatedSocialLinks = { ...updatedSocialLinks, ...data.socialLinks };
        }

        await db.update(users).set({
           ...(data.nickname !== undefined && { nickname: data.nickname }),
           ...(data.bio !== undefined && { bio: data.bio }),
           ...(data.interests !== undefined && { interests: data.interests }),
           ...(data.avatar !== undefined && { avatar: data.avatar }),
           ...(data.socialLinks !== undefined && { socialLinks: updatedSocialLinks }),
           onboarded: true
        }).where(eq(users.id, stackUser.id));

        revalidatePath('/');
        return { success: true };
    } catch(e) {
        console.error(e);
        return { error: "Failed to update profile" };
    }
}
