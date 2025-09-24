import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "../components/footer";
import { baseUrl } from "./sitemap";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "sead post",
  description: "Welcome to sead post",
  openGraph: {
    title: "sead post",
    description: "Welcome to sead post",
    url: baseUrl,
    siteName: "sead post",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-auto mt-8 px-4">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {/* <Link href="/">
            <h1 className="text-2xl mb-8 tracking-tighter">sead post</h1>
          </Link> */}
          <Link href="/" className="mb-8">
            <Image src="logo.svg" alt="sead post" width={100} height={100} />
          </Link>
          {/* <Navbar /> */}
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
