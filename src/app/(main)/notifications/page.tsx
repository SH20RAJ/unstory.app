import {
  NotificationsClient,
  NotificationUI,
} from "@/components/notifications/NotificationsClient";
import { Metadata } from "next";
import { getUserNotifications } from "@/actions/notifications.actions";
import { stackServerApp } from "@/stack/server";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const metadata: Metadata = {
  title: "Notifications | Unstory",
  description: "Stay updated with your latest interactions.",
};

export default async function NotificationsPage() {
  const user = await stackServerApp.getUser();
  if (!user) return <NotificationsClient notices={[]} />;

  const rawNotifs = await getUserNotifications(user.id);
  const notices: NotificationUI[] = rawNotifs.map((n) => ({
    id: n.id.toString(),
    type: n.type,
    content: n.message || "",
    time: new Date(n.createdAt).toLocaleDateString(),
    read: n.read || false,
    user: {
      name: n.title || "User",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${n.id}`,
    },
  }));

  return (
    <DashboardLayout>
      <NotificationsClient notices={notices} />
    </DashboardLayout>
  );
}
