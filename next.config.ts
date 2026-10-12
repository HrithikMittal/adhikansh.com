import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static pages that live in /public/date/*
  async rewrites() {
    return [
      { source: "/date/rishikesh-1", destination: "/date/rishikesh-1/index.html" },
      { source: "/date/rishikesh-2", destination: "/date/rishikesh-2/index.html" },
    ];
  },
};

export default nextConfig;
