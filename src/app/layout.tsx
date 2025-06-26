import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import localFont from "next/font/local";
import Script from "next/script";

const wantedSans = localFont({
  src: "./fonts/WantedSansVariable.woff2",
  variable: "--font-wanted-sans",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

const tossFace = localFont({
  src: "./fonts/TossFaceFontMac.ttf",
  variable: "--font-toss-face",
});

const menlo = localFont({
  src: "./fonts/Menlo-Regular.ttf",
  variable: "--font-menlo",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://post.sid12g.dev"),
  title: "sead post",
  description: "Welcome to sead post.",
  openGraph: {
    images: "https://post.sid12g.dev/og-image.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-R3FR04H7H3"
        ></Script>
        <Script id="google-tag-management">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-R3FR04H7H3');
        `}</Script>
        <meta
          name="naver-site-verification"
          content="64a062d6249bccc8a191d99ee7deb1dcfd4904b0"
        />
      </head>
      <body
        className={`${wantedSans.variable} ${tossFace.variable} ${menlo.variable}`}
      >
        <Navbar />
        <div id="area" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
