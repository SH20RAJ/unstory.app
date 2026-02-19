import { NotificationsClient } from "@/components/notifications/NotificationsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications | Unstory",
  description: "Stay updated with your latest interactions.",
};

export default function NotificationsPage() {
  return <NotificationsClient />;
}
