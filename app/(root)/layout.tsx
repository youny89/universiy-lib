import { auth } from "@/auth";
import Header from "@/components/header";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");
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
