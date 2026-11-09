import "./global.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Cursor from "@/components/cursor";
import Footer from "@/components/footer";
import { Navbar } from "@/components/nav";
import { baseUrl } from "./sitemap";
import Script from "next/script";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  style: "normal",
  display: "swap",
});

const jetBrainsMono = localFont({
  src: [
    {
      path: "./fonts/JetBrainsMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/JetBrainsMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
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
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-image.png"],
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
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
      <body>
        <Analytics />
        <SpeedInsights />
        <Cursor />
        {/* 헤더 위 여백만큼 스크롤하면 헤더가 상단에 붙음 */}
        <div className="flex min-h-screen flex-col pt-6 sm:pt-10">
          <Navbar />
          <div className="mx-auto flex w-full max-w-[648px] flex-1 flex-col gap-[60px] px-6 pt-11 pb-14">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>

      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Q0QC9VFEYK"
      />
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q0QC9VFEYK');
          `}
      </Script>
    </html>
  );
}
