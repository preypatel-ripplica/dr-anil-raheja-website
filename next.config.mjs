/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
    // Local assets live in /public/images. Remote patterns kept ready for
    // when the CMS serves media from an external origin.
    remotePatterns: [
      { protocol: "https", hostname: "www.dranilraheja.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
