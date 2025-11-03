import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "www.aparbs.com.br" },
      { hostname: "www.datocms-assets.com" },
      { hostname: "picsum.photos" },
      { hostname: "lh3.googleusercontent.com" },
    ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/trabalhe-conosco',
  //       destination: 'https://forms.gle/QqqE5LxmSQiGxhKV7',
  //       permanent: false,
  //     }
  //   ];
  // },
};

export default nextConfig;
