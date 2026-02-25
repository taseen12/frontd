/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.freepik.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "36.255.69.139",
        port: "9096",
        pathname: "/Static/**",
      },
    ],
  },
};

export default nextConfig;
