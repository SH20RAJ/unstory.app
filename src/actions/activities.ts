"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getActivities() {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching activities:", error);
    return [];
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
