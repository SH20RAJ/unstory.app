import { CreateClient } from "@/components/create/CreateClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create | Unstory",
  description: "Share your moments, stories, and events.",
};

export default function CreatePage() {
  return <CreateClient />;
}
