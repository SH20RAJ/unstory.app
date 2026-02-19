export interface DatingProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  university: string;
  major: string;
  images: string[];
  interests: string[];
  distance: string;
}

export const DATING_PROFILES: DatingProfile[] = [
  {
    id: "d-1",
    name: "Aanya",
    age: 20,
    bio: "Caffeine dependent life form. ☕ trying to debug my life.",
    university: "BIT Mesra",
    major: "Computer Science",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80"
    ],
    interests: ["Coding", "Coffee", "Sci-Fi"],
    distance: "2 miles away"
  },
  {
    id: "d-2",
    name: "Priya",
    age: 21,
    bio: "Architecture student. I design buildings and break hearts. jk unless?",
    university: "NIFT",
    major: "Architecture",
    images: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80",
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=800&q=80"
    ],
    interests: ["Art", "Travel", "Photography"],
    distance: "5 miles away"
  },
  {
    id: "d-3",
    name: "Riya",
    age: 19,
    bio: "Just here to find someone to go to library with. 📚",
    university: "BIT Mesra",
    major: "Biotech",
    images: [
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80",
    ],
    interests: ["Books", "Nature", "Music"],
    distance: "1 mile away"
  },
   {
    id: "d-4",
    name: "Sanya",
    age: 22,
    bio: "MBA student. Business in the front, party in the back.",
    university: "IIM Ranchi",
    major: "Finance",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    ],
    interests: ["Finance", "Stocks", "Party"],
    distance: "10 miles away"
  }
];
