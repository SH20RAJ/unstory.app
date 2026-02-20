
import { db } from "../src/db/drizzle";
import { sql } from "drizzle-orm";

async function reset() {
  console.log("Dropping all tables...");
  // Drop in order of dependency? Cascade should handle it.
  await db.execute(sql`DROP TABLE IF EXISTS "stories" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "notifications" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "likes" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "comments" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "follows" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "dating_profiles" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "posts" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "communities" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "users" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "colleges" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "__drizzle_migrations" CASCADE`);
  
  console.log("Database reset complete.");
  process.exit(0);
}

reset().catch(console.error);
