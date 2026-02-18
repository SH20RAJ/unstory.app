"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getActivities() {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    console.log("No activities found or error, returning mock data");
    return [
      {
        id: "1",
        title: "Midnight Coding Club",
        type: "Tech",
        date: "2024-03-20",
        time: "11:00 PM",
        location: "Library Basement",
        description: "Join us for a late-night coding session. Pizza and caffeine provided!"
      },
      {
         id: "2",
         title: "Weekend Hike: Bear Mountain",
         type: "Outdoors",
         date: "2024-03-22",
         time: "08:00 AM",
         location: "Campus Main Gate",
         description: "A refreshing hike to Bear Mountain. Beginner friendly."
      },
      {
        id: "3",
        title: "Jazz Night Jam Session",
        type: "Music",
         date: "2024-03-21",
        time: "07:30 PM",
        location: "Student Center Lounge",
        description: "Open mic for jazz musicians and enthusiasts."
      }
    ];
  }

  return data;
}

export async function createActivity(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  // TODO: Get real user ID from Stack Auth session
  const creator_id = "temp-user-id"; 

  const { error } = await supabase.from("activities").insert({
    title,
    description,
    type,
    date,
    time,
    location,
    creator_id,
  });

  if (error) {
    console.error("Error creating activity:", error);
    throw new Error("Failed to create activity");
  }

  revalidatePath("/home");
  revalidatePath("/events");
}
