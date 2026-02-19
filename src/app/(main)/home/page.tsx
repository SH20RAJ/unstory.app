import { HomeClient } from "@/components/home/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Unstory",
  description: "Your daily feed of campus stories and updates.",
};

export default function HomePage() {
  return <HomeClient />;
}
