export const USERS = [
  {
    id: "user-1",
    name: "Tanya Sharma",
    username: "tanyaux",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    bio: "Passionate developer, coffee addict, and amateur photographer. Building the future one commit at a time. 💻☕️📸",
    college: "BIT Mesra",
    verified: true,
    online: true,
  },
  {
    id: "user-2",
    name: "Rohan Das",
    username: "rohandas",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    bio: "Tech enthusiast and open source contributor.",
    college: "IIT Bombay",
    verified: false,
    online: false,
  },
  {
    id: "user-3",
    name: "Aditya Kumar",
    username: "adityak",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    bio: "Design thinking and UX research.",
    college: "NID",
    verified: true,
    online: true,
  },
  {
    id: "current-user",
    name: "Shaswat Raj",
    username: "shaswat",
    avatar: "https://github.com/shadcn.png",
    bio: "Full stack developer based in Bangalore.",
    college: "BIT Mesra",
    verified: true,
    online: true,
  }
];

export const CURRENT_USER = USERS.find(u => u.id === "current-user");

export const COMMUNITIES = [
  { name: "Coding Club", count: 142, image: "bg-blue-600" },
  { name: "Debate Soc", count: 89, image: "bg-red-500" },
  { name: "Robotics", count: 56, image: "bg-purple-500" },
];
