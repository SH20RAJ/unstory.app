import { ConnectClient } from "@/components/connect/ConnectClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect | Unstory",
  description: "Discover new people and make connections.",
};

export default function ConnectPage() {
  return <ConnectClient />;
}
