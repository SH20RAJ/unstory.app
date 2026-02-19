export interface Story {
  name: string;
  img: string;
  isLive?: boolean;
}

export const STORIES: Story[] = [
  { name: "Your Story", img: "bg-zinc-800", isLive: false },
  { name: "GDSC", img: "bg-blue-500", isLive: true },
  { name: "P-Soc", img: "bg-purple-600", isLive: true },
  { name: "IEEE", img: "bg-blue-700" },
  { name: "Rotaract", img: "bg-pink-600" },
  { name: "E-Cell", img: "bg-orange-500" },
  { name: "Robotics", img: "bg-red-600" },
  { name: "Audio", img: "bg-yellow-500" },
];
