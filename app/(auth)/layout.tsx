import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-commissioner">
      {children}
      <div className="auth-asset">
        <div>
          <Image
            src="/icons/auth-image.svg"
            alt="Giriş Sayfası Resmi"
            width={700}
            height={700}
          />
        </div>
      </div>
    </main>
  );
}
