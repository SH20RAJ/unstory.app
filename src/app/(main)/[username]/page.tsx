import { PublicProfileClient } from "@/components/profile/PublicProfileClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const decodedName = decodeURIComponent(username).replace('@', '');
  return {
    title: `${decodedName} | Unstory`,
    description: `View ${decodedName}'s profile on Unstory.`,
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  return <PublicProfileClient username={username} />;
}
