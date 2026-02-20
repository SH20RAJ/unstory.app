import { DatingClient } from "@/components/dating/DatingClient";
import { Metadata } from "next";
import { stackServerApp } from "@/stack/server";
import { getDatingProfiles } from "@/actions/dating.actions";

export const metadata: Metadata = {
  title: "Dating | Unstory",
  description: "Find your match on campus.",
};

export default async function DatingPage() {
  const stackUser = await stackServerApp.getUser();
  const profiles = await getDatingProfiles(stackUser?.id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <DatingClient profiles={profiles as any} />;
}
