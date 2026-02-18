export const MOCK_PROFILES = [
    {
        id: "user-1", // Added IDs for linking
        name: "Aisha",
        age: 21,
        university: "Uni One",
        major: "Design",
        bio: "Looking for someone to explore art galleries with.",
        interests: ["Art", "Coffee", "UX"],
        image: "bg-linear-to-b from-purple-500 to-indigo-600"
    },
    {
        id: "user-2",
        name: "Rohan",
        age: 22,
        university: "Tech State",
        major: "CS",
        bio: "Building the next unicorn. Need a gym buddy.",
        interests: ["Tech", "Gym", "Startups"],
        image: "bg-linear-to-b from-blue-500 to-cyan-600"
    },
     {
        id: "user-3",
        name: "Priya",
        age: 20,
        university: "Campus X",
        major: "Psych",
        bio: "Love hiking and honest conversations.",
        interests: ["Nature", "Psychology", "Music"],
        image: "bg-linear-to-b from-pink-500 to-rose-600"
    },
    {
        id: "user-4",
        name: "Caleb",
        age: 23,
        university: "Uni One",
        major: "Music",
        bio: "Jazz pianist looking for jam sessions.",
        interests: ["Jazz", "Piano", "Vinyl"],
        image: "bg-linear-to-b from-orange-500 to-red-600"
    },
    {
        id: "user-5",
        name: "Maya",
        age: 19,
        university: "Modern U",
        major: "Bio",
        bio: "Pre-med student who needs coffee breaks.",
        interests: ["Medicine", "Volunteering", "Matcha"],
        image: "bg-linear-to-b from-green-500 to-emerald-600"
    },
    {
        id: "user-6",
        name: "Leo",
        age: 21,
        university: "Tech State",
        major: "Physics",
        bio: "Trying to understand the universe and bake bread.",
        interests: ["Physics", "Baking", "Sci-Fi"],
        image: "bg-linear-to-b from-slate-500 to-zinc-600"
    }
];

export const MOCK_FEED_POSTS = [
    {
        id: 1,
        author: { name: "Campus Photography", username: "shutterbugs", university: "Uni One", time: "2h ago", avatar: "" },
        content: { text: "Sunset at the main quad was absolutely stunning today! 📸 Who else caught this view?", image: "Quad View" },
        metrics: { likes: 124, comments: 12 }
    },
    {
        id: 2,
        author: { name: "Student Gov", username: "sgov", university: "Tech State", time: "5h ago", avatar: "" },
        content: { text: "Don't forget to vote in the upcoming elections! Your voice matters. Polls open at 9AM in the Student Center.", image: undefined },
        metrics: { likes: 89, comments: 45 }
    },
    {
        id: 3,
        author: { name: "Confessions", username: "anon_confess", university: "Campus X", time: "Now", avatar: "" },
        content: { text: "Am I the only one who thinks the library elevator smells like vanilla latte? ☕️🤔", image: undefined },
        metrics: { likes: 342, comments: 88 }
    },
    {
        id: 4,
        author: { name: "Hiking Club", username: "hikers_united", university: "Modern U", time: "1d ago", avatar: "" },
        content: { text: "Weekend trip to Bear Mountain was a success! 🏔️ Next trip: Breakneck Ridge. Sign up link in bio.", image: "Mountain Group" },
        metrics: { likes: 256, comments: 34 }
    }
  ];
