/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: "./",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
