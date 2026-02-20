
import { db } from "../src/db/drizzle";
import { users, posts, communities, datingProfiles, colleges } from "../src/db/schema";
import { COLLEGES } from "../src/lib/colleges";
import { USERS, COMMUNITIES } from "../db/users";
import { POSTS } from "../db/posts";
import { DATING_PROFILES } from "../db/dating";
import { EXPLORE_ITEMS } from "../db/explore";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("Seeding database...");

  // --- Colleges ---
  console.log("Seeding Colleges...");
  const BATCH_SIZE = 50;
  let collegeCount = 0;
  for (let i = 0; i < COLLEGES.length; i += BATCH_SIZE) {
    const batch = COLLEGES.slice(i, i + BATCH_SIZE).map(c => ({
      id: c.id,
      name: c.name,
      state: c.state,
      district: c.district,
      website: c.website || null,
      emailDomain: c.email_domain || null,
      yearEstablished: c.year_established !== '-' ? c.year_established : null,
      location: c.location,
      slug: c.slug,
    }));

    await db.insert(colleges).values(batch)
      .onConflictDoUpdate({
        target: colleges.id,
        set: {
            name: sql.raw('excluded.name'),
            state: sql.raw('excluded.state'),
            district: sql.raw('excluded.district'),
            website: sql.raw('excluded.website'),
            emailDomain: sql.raw('excluded.email_domain'),
            yearEstablished: sql.raw('excluded.year_established'),
            location: sql.raw('excluded.location'),
            slug: sql.raw('excluded.slug'),
            updatedAt: new Date(),
        }
      });
      
    collegeCount += batch.length;
    process.stdout.write(`\rInserted ${collegeCount}/${COLLEGES.length} colleges`);
  }
  console.log(`\nColleges seeded.`);

  // --- Users ---
  console.log("Seeding Users...");
  
  // Helper to find college ID by name from colleges table (mock data uses names)
  // For now, we'll try to match name loosely or just pick first match if user has college name
  // To avoid complex lookups in loop, let's cache some common ones or just proceed without link for mock data if needed
  // BUT the goal is to link!
  
  // Let's just create users. If college name matches perfectly great, otherwise null
  
  for (const u of USERS) {
    if (u.id === 'current-user') continue; 
    
    // Find college ID by name if possible
    let cId = null;
    if (u.college) {
        // Simple search - might be slow but OK for small seed
        // OR just proceed without linking for mock data to keep it simple, real data relies on email domain
        // Let's skip linking mock users to real colleges for now unless exact match
    }

    await db.insert(users).values({
      id: u.id,
      name: u.name,
      username: u.username,
      avatar: u.avatar,
      bio: u.bio,
      collegeId: cId, // skipping mock link
      verified: u.verified,
      year: "2026", // Default for mock
      role: "Student",
      interests: ["Coding", "Design"], // Mock interests
    }).onConflictDoNothing();
  }
  
  // Current User
  const currentUser = USERS.find(u => u.id === 'current-user');
  if (currentUser) {
       await db.insert(users).values({
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        bio: currentUser.bio,
        collegeId: null, // user will sync on login via email
        verified: currentUser.verified,
        major: "Computer Science",
        year: "2026",
        role: "Student",
        interests: ["Full Stack", "AI", "Open Source"],
        socialLinks: { github: "github.com/shaswat", linkedin: "linkedin.com/in/shaswat" },
      }).onConflictDoNothing();
  }

  // --- Communities ---
  console.log("Seeding Communities...");
  for (const c of COMMUNITIES) {
    await db.insert(communities).values({
      name: c.name,
      slug: c.name.toLowerCase().replace(/ /g, '-'),
      image: c.image, 
      memberCount: c.count,
    }).onConflictDoNothing();
  }

  // --- Posts ---
  console.log("Seeding Posts...");
  for (const p of POSTS) {
    const postUserId = p.user.username.replace('@', '');
    
    // Create user if not exists (for post author)
    await db.insert(users).values({
        id: postUserId,
        name: p.user.name,
        username: p.user.username,
        avatar: p.user.avatar,
        verified: p.user.verified || false,
    }).onConflictDoNothing();

    await db.insert(posts).values({
      userId: postUserId,
      type: p.type,
      content: p.content,
      mediaUrls: p.image ? [p.image] : [],
      eventDetails: p.event,
      pollDetails: p.poll,
      articleDetails: p.article,
      likesCount: p.likes,
      commentsCount: p.comments,
      sharesCount: p.shares,
    });
  }
  
  // --- Dating Profiles ---
  console.log("Seeding Dating Profiles...");
  for (const d of DATING_PROFILES) {
      const dUserId = `user-${d.id}`;
      // Create user
      await db.insert(users).values({
          id: dUserId,
          name: d.name,
          username: `dating_${d.name.toLowerCase()}`,
          avatar: d.images[0],
          bio: d.bio,
          collegeId: null, // mock
          year: "2025",
          major: d.major
      }).onConflictDoNothing();
      
      await db.insert(datingProfiles).values({
          id: d.id,
          userId: dUserId,
          name: d.name,
          age: d.age,
          bio: d.bio,
          university: d.university,
          major: d.major,
          images: d.images,
          interests: d.interests,
          distance: d.distance
      }).onConflictDoNothing();
  }
  
  // --- Explore Items ---
   console.log("Seeding Explore...");
   for (const e of EXPLORE_ITEMS) {
        const eUserId = `explore_${e.author.name.toLowerCase()}`;
        await db.insert(users).values({
            id: eUserId,
            name: e.author.name,
            username: eUserId,
            year: "2027"
        }).onConflictDoNothing();
        
        await db.insert(posts).values({
            userId: eUserId,
            type: e.type,
            mediaUrls: [e.image],
            likesCount: e.metrics.likes,
            commentsCount: e.metrics.comments,
        });
   }


  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
