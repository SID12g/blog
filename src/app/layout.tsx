import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://post.sid12g.dev"),
  title: "sead post",
  description: "Welcome to sead post.",
  openGraph: {
    images: "/og-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <div style={{ height: 72 }} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
