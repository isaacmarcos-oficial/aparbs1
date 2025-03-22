import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "www.aparbs.com.br" }
    ]
  },
  async redirects() {
    return [
      {
        source: '/trabalhe-conosco',
        destination: 'https://forms.gle/3b4RPCroYB7rTgvPA',
        permanent: false,
      }
    ];
  },
};

export default nextConfig;
