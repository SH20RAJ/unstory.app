import { ConnectClient } from "@/components/connect/ConnectClient";
import { Metadata } from "next";
import { stackServerApp } from "@/stack/server";
import { getSuggestedUsers } from "@/actions/users.actions";

export const metadata: Metadata = {
  title: "Connect | Unstory",
  description: "Discover new people and make connections.",
};

export default async function ConnectPage() {
  const stackUser = await stackServerApp.getUser();
  const mappedUsers = await getSuggestedUsers(stackUser?.id);

  return <ConnectClient suggestedUsers={mappedUsers} />;
}
