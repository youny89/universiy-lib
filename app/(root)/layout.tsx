import { auth } from "@/auth";
import Header from "@/components/header";
import { db } from "@/database/drizzle";
import { users } from "@/database/shcema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  after(async () => {
    if (!session?.user?.id) return;

    // get the user and see if the last activity date is today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1);
    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));
  });

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-dark-100 bg-pattern bg-top bg-cover px-5 xs:px-10 md:px-16">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
