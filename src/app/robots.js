// app/robots.js
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.godavaii.com/sitemap.xml",
    host: "https://www.godavaii.com",
  };
}
