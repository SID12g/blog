import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import localFont from "next/font/local";

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
    images: "https://post.sid12g.dev/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
