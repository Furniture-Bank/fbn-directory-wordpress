import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/directory",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/directory",
        permanent: false,
      },
      {
        source: "/get-involved",
        destination: "/directory",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
