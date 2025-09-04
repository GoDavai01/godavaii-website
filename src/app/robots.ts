// app/robots.js
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.godavaii.com/sitemap.xml",
    host: "https://www.godavaii.com",
  };
}
