import "dotenv/config";
import { db } from "../src/db/drizzle";
import { posts, users } from "../src/db/schema";

const SAMPLE_POSTS = [
    {
        content: "Just finished my final year project presentation! Thanks to everyone who supported me along the way. Next stop: graduation! 🎓🎉",
        type: "text",
        mediaUrls: [],
        likesCount: 142,
        commentsCount: 23,
        sharesCount: 5,
    },
    {
        content: "Sunset at the campus lake today was absolutely unreal. I love this place sometimes. 🌅",
        type: "image",
        mediaUrls: ["https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop"],
        likesCount: 305,
        commentsCount: 12,
        sharesCount: 2,
    },
    {
        content: "Who's going to the GDSC Solution Challenge kickoff this Friday? Let's link up and form teams!",
        type: "event",
        eventDetails: {
            title: "Solution Challenge Kickoff 2024",
            date: "Fri, Feb 24 • 5:00 PM",
            location: "CAT Hall, Main Building",
            attendees: 142
        },
        likesCount: 89,
        commentsCount: 34,
        sharesCount: 12,
    },
    {
        content: "What's the best programming language for backend in 2024? 🤔",
        type: "poll",
        pollDetails: {
            question: "Best Backend Language?",
            options: [
                { label: "Node.js / TS", votes: 450, percentage: 45 },
                { label: "Go", votes: 250, percentage: 25 },
                { label: "Python", votes: 200, percentage: 20 },
                { label: "Rust / C++", votes: 100, percentage: 10 },
            ],
            totalVotes: 1000
        },
        likesCount: 215,
        commentsCount: 156,
        sharesCount: 8,
    },
    {
        content: "Just published my latest article on how we scaled our DB at my summer internship! Check it out if you're interested in System Design.",
        type: "article",
        articleDetails: {
            title: "Scaling PostgreSQL for 10M+ Users",
            summary: "A deep dive into partition strategies and read-replicas we used to handle scale.",
            readTime: "8 min read"
        },
        likesCount: 512,
        commentsCount: 45,
        sharesCount: 120,
    }
];

async function seedPosts() {
    console.log("Seeding posts...");
    
    // 1. Clear old posts
    console.log("Clearing old posts...");
    await db.delete(posts);

    // 2. Get some users to attach posts to
    const allUsers = await db.query.users.findMany({ limit: 5 });
    
    if (allUsers.length === 0) {
        console.error("No users found. Please run seed-all.ts first to create users.");
        process.exit(1);
    }

    // 3. Insert posts randomly assigned to users
    for (let i = 0; i < SAMPLE_POSTS.length; i++) {
        const post = SAMPLE_POSTS[i];
        const user = allUsers[i % allUsers.length];

        await db.insert(posts).values({
            userId: user.id,
            ...post
        });
    }

    console.log(`✅ Seeded ${SAMPLE_POSTS.length} real posts attached to existing users!`);
    process.exit(0);
}

seedPosts().catch(e => {
    console.error("Failed to seed posts", e);
    process.exit(1);
});
