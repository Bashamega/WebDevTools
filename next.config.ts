/** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Customize your Next.js configuration here
//   pageExtensions: ["jsx", "js"],
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
//   // Add additional configurations as needed
// };

// module.exports = nextConfig;

// next.config.ts
import { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // other configurations...
  //module.exports = {
  images: {
    domains: ["localhost"], // Add localhost to allowed domains
  },
  // };
};

export default config;
