import { DatingClient } from "@/components/dating/DatingClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dating | Unstory",
  description: "Find your match on campus.",
};

export default function DatingPage() {
  return <DatingClient />;
}
