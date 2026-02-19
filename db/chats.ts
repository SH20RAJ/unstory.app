import { USERS } from "./users";

export const CONTACTS = [
  { 
      id: USERS[0].id, 
      name: USERS[0].name, 
      avatar: USERS[0].avatar, 
      lastMessage: "See you at the event!", 
      time: "2m", 
      unreadCount: 2, 
      online: true 
  },
  { 
      id: USERS[1].id, 
      name: USERS[1].name, 
      avatar: USERS[1].avatar, 
      lastMessage: "Can you send me the notes?", 
      time: "1h", 
      online: false 
  },
  { 
      id: USERS[2].id, 
      name: USERS[2].name, 
      avatar: USERS[2].avatar, 
      lastMessage: "The project looks great.", 
      time: "3h", 
      online: true 
  },
];

export const MESSAGES = {
    [USERS[0].id]: [
        { id: "m1", content: "Hey! Are you going to the GDSC workshop?", senderId: "other", time: "10:30 AM", status: "read" },
        { id: "m2", content: "Yes, definitely! It starts at 5 PM right?", senderId: "me", time: "10:32 AM", status: "read" },
        { id: "m3", content: "See you at the event!", senderId: "other", time: "10:33 AM", status: "sent" }
    ],
    [USERS[1].id]: [
        { id: "m1", content: "Bro, did you attend the lecture?", senderId: "other", time: "Yesterday", status: "read" },
        { id: "m2", content: "Can you send me the notes?", senderId: "other", time: "Yesterday", status: "read" }
    ]
} as const;
