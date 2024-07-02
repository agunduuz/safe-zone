export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Commissioner, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const commissioner = Commissioner({
  subsets: ["latin"],
  variable: "--font-commissioner",
});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "Safe Zone",
  description:
    "Safe Zone is modern banking platform for every Safe Zone lovers.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${commissioner.variable} ${ibmPlexSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
