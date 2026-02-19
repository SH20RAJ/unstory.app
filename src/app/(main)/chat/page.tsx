import { ChatClient } from "@/components/chat/ChatClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat | Unstory",
  description: "Connect with friends and classmates.",
};

export default function ChatPage() {
  return <ChatClient />;
}
