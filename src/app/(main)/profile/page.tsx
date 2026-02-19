import { ProfileClient } from "@/components/profile/ProfileClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Unstory",
  description: "View and manage your student profile.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
