import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import localFont from "next/font/local";

const wantedSans = localFont({
  src: "./fonts/WantedSansVariable.ttf",
  variable: "--font-wanted-sans",
  weight: "400 500 600",
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
      <body className={wantedSans.variable}>
        <Navbar />
        <div id="area" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
