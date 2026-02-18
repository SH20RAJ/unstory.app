"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Initial mock data to ensure UI works before DB is fully connected

export async function getSecretCrushes() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("secret_crushes")
    .select("crush_id, created_at")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching crushes:", error);
    return [];
  }

  return data;
}

export async function getRemainingCrushCount() {
    const crushes = await getSecretCrushes();
    return 5 - crushes.length;
}

export async function addSecretCrush(crushId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
      throw new Error("Unauthorized");
  }

  const currentCrushes = await getSecretCrushes();
  if (currentCrushes.length >= 5) {
    return { success: false, message: "You have reached the limit of 5 secret crushes." };
  }

  // Check if already crushed
  if (currentCrushes.some((c: { crush_id: string }) => c.crush_id === crushId)) {
      return { success: false, message: "Already in your crush list." };
  }

  // Add crush
  const { error } = await supabase
    .from("secret_crushes")
    .insert({ user_id: user.id, crush_id: crushId });

  if (error) {
    console.error("Error adding crush:", error);
    return { success: false, message: "Failed to add crush." };
  }

  // Check for Match (Reciprocal Crush)
  const { data: reciprocal } = await supabase
    .from("secret_crushes")
    .select("*")
    .eq("user_id", crushId)
    .eq("crush_id", user.id)
    .single();

  if (reciprocal) {
      // IT'S A MATCH!
      // Notify both users
      await supabase.from("notifications").insert([
          {
              user_id: user.id,
              type: "match",
              content: "It's a Match! Someone you crushed on likes you back!",
              is_read: false
          },
          {
              user_id: crushId,
              type: "match",
              content: "It's a Match! Someone you crushed on likes you back!",
              is_read: false
          }
      ]);
      return { success: true, message: "Crush added! It's a match! 🎉" };
  }

  revalidatePath("/dating");
  return { success: true, message: "Added to secret crushes." };
}

export async function removeSecretCrush(crushId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, message: "Unauthorized" };

    const { error } = await supabase
        .from("secret_crushes")
        .delete()
        .eq("user_id", user.id)
        .eq("crush_id", crushId);

    if (error) {
        return { success: false, message: "Failed to remove." };
    }

    revalidatePath("/dating");
    return { success: true, message: "Removed." };
}
