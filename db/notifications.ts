import { USERS } from "./users";

export const NOTIFICATIONS = [
  {
     id: 1,
     type: "like",
     user: USERS[1],
     content: "liked your post.",
     time: "2m ago",
     read: false
  },
  {
      id: 2,
      type: "comment",
      user: USERS[0],
      content: "commented: \"This is absolutely amazing! 🔥\"",
      time: "15m ago",
      read: false
  },
  {
      id: 3,
      type: "connection",
      user: USERS[2],
      content: "sent you a connection request.",
      time: "1h ago",
      read: true
  },
  {
      id: 4,
      type: "system",
      content: "Welcome to the new Unstory Dashboard! 🚀",
      time: "1d ago",
      read: true
  },
  {
      id: 5,
      type: "crush",
      user: { name: "Someone", avatar: "" }, // Anonymous
      content: "added you as a secret crush! 🤫",
      time: "2d ago",
      read: true
  }
];
