import { ConnectClient } from "@/components/connect/ConnectClient";
import { Metadata } from "next";
import { stackServerApp } from "@/stack/server";
import { getSuggestedUsers } from "@/actions/users.actions";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const metadata: Metadata = {
  title: "Connect | Unstory",
  description: "Discover new people and make connections.",
};

export default async function ConnectPage() {
  const stackUser = await stackServerApp.getUser();
  const mappedUsers = await getSuggestedUsers(stackUser?.id);

  return (
    <DashboardLayout>
      <ConnectClient suggestedUsers={mappedUsers} />
    </DashboardLayout>
  );
}
