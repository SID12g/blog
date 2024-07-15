"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname().split("/")[1];
  return (
    <div
      style={{
        height: "calc(100vh - 176px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <p style={{ margin: 0, marginRight: 12, fontSize: 20 }}>404</p>
        <p style={{ margin: 0, fontSize: 16 }}>This page could not be found.</p>
      </div>
      <Link
        style={{
          width: "fit-content",
          fontSize: 16,
          backgroundColor: "var(--background-grey-color)",
          padding: 12,
          borderRadius: 8,
        }}
        href={pathname === "article" ? "/article" : "/tech"}
      >
        🏠 Home
      </Link>
    </div>
  );
}
