import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "Anıl", lastName: "Gunduz" };

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
