import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  allowedDevOrigins: ["10.0.0.127"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "replicate.delivery", pathname: "/**" },
    ],
  },
};

export default nextConfig;
