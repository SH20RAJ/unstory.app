import { EventsClient } from "@/components/events/EventsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Unstory",
  description: "Find and join happenings around you.",
};

export default function EventsPage() {
  return <EventsClient />;
}
