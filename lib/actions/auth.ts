"use server";

import bcryptjs from "bcryptjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/shcema";
import { AuthCredentials } from "@/types";
import { eq } from "drizzle-orm";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";

export const signUp = async (params: AuthCredentials) => {
  const { name, email, password, universityId, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  console.log({ ip });
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");

  const exsitingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (exsitingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPasswrod = await bcryptjs.hash(password, 12);

  try {
    await db.insert(users).values({
      name,
      email,
      password: hashedPasswrod,
      universiyId: universityId,
      universityCard,
    });
    signInWithCredentials({ email, password });
    return { success: true };
  } catch (error) {
    console.log("ERROR_ACTION_SIGNUP", error);
    return { success: false, error: "signup error" };
  }
};

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");

  try {
    const results = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (results?.error) {
      return { success: false, error: results.error };
    }

    return { success: true };
  } catch (error) {
    console.log("ERROR_ACTION_SIGNIN", error);
    return { success: false, error: "signin error" };
  }
};
