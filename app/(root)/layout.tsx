import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");

  return (
    <main className="flex h-screen w-full font-commissioner">
      <Sidebar user={loggedIn} />
      <section className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" alt="Menu Icon" width={30} height={30} />
          <div className="flex items-center gap-2">
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </section>
    </main>
  );
}
