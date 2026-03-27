// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "godavai-uploads.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
      { protocol: "https", hostname: "cdn.grofers.com" },
      { protocol: "https", hostname: "*.grofers.com" },
      { protocol: "https", hostname: "cdn1.healthkart.com" },
      { protocol: "https", hostname: "*.healthkart.com" },
      { protocol: "https", hostname: "onemg.gumlet.io" },
      { protocol: "https", hostname: "*.gumlet.io" },
      { protocol: "https", hostname: "images.apollo247.in" },
      { protocol: "https", hostname: "*.apollo247.in" },
      { protocol: "https", hostname: "www.netmeds.com" },
      { protocol: "https", hostname: "*.netmeds.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Fallback: if image optimization fails, show original
    unoptimized: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
