"use server";

import { db } from "@/db/drizzle";
import { notifications } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getUserNotifications(userId: string) {
    const recentNotifs = await db.query.notifications.findMany({
        where: eq(notifications.userId, userId),
        orderBy: [desc(notifications.createdAt)],
        limit: 20
    });

    return recentNotifs;
}
