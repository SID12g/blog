import "./global.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "../components/footer";
import { baseUrl } from "./sitemap";
import { Navbar } from "@/components/nav";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  style: "normal",
  display: "swap",
});

const jetBrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Medium.woff2",
  variable: "--font-jetbrains-mono",
  weight: "500",
  style: "normal",
  display: "swap",
});

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
    images: ["https://blog.sid12g.dev/background.webp"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://blog.sid12g.dev/background.webp"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body className="max-w-xl mx-auto mt-8 px-4">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
