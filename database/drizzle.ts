import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "@/lib/config";

const sql = neon(config.env.databaseUrl!);

export const db = drizzle({ client: sql });

/**
 * 
 * step.1) create schema 
 * step.2) create migrate  
                -> npx drizzle-kit generate
 * setp.3) apply changes to the database (neon db)
                -> npx drizzle-kit migrate
 */
