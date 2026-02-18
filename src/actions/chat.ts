"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getMessages(activityId?: string) {
  let query = supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  if (activityId) {
    query = query.eq("activity_id", activityId);
  } else {
    // For global/general chat or direct messages (simplified for now)
    // Fetching last 50 messages generally
    query = query.limit(50);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return data;
}

export async function sendMessage(content: string, activityId?: string) {
  const sender_id = "temp-user-id"; // TODO: Get from Stack Auth

  const { error } = await supabase.from("messages").insert({
    content,
    sender_id,
    activity_id: activityId,
  });

  if (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }

  revalidatePath("/chat");
}
