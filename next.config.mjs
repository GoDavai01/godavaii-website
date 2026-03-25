// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "godavai-uploads.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // 2 years; add includeSubDomains only when all subdomains are HTTPS-ready
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
