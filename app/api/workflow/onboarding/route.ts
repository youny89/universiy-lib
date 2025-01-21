import { db } from "@/database/drizzle";
import { users } from "@/database/shcema";
import { sendMail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  name: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (timeDifference > THREE_DAYS_IN_MS && timeDifference < THIRTY_DAYS_IN_MS)
    return "non-active";

  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, name } = context.requestPayload;

  // Welcome email

  await context.run("new-signup", async () => {
    await sendMail({
      email,
      subject: "Welcom to the platform",
      message: `Welcome ${name}`,
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        return await sendMail({
          email,
          subject: "Are you still there?",
          message: `Hey ${name}, we miss you!`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        return await sendMail({
          email,
          subject: "Welcome Back!",
          message: `Welcome back ${name}!`,
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

async function sendEmail(message: string, email: string) {
  // Implement email sending logic here
  console.log(`Sending ${message} email to ${email}`);
}

// type UserState = "non-active" | "active";

// const getUserState = async (): Promise<UserState> => {
//   // Implement user state logic here
//   return "non-active";
// };
