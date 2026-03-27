// app/feed.xml/route.js — RSS Feed for AI crawlers and content aggregators
import { getAllArticles } from "@/data/blogIndex";
import { conditions } from "@/data/conditions";

export const revalidate = 86400;

export async function GET() {
  const articles = getAllArticles();
  const SITE = "https://www.godavaii.com";
  const now = new Date().toUTCString();

  // Get latest 50 blog articles + 20 newest health conditions for the feed
  const blogItems = articles.slice(0, 50).map(
    (a) => `    <item>
      <title><![CDATA[${a.title || a.slug}]]></title>
      <link>${SITE}/blog/${a.slug}</link>
      <guid isPermaLink="true">${SITE}/blog/${a.slug}</guid>
      <description><![CDATA[${(a.description || a.title || "").slice(0, 300)}]]></description>
      <category>Health</category>
      <pubDate>${now}</pubDate>
    </item>`
  );

  const healthItems = conditions.slice(0, 20).map(
    (c) => `    <item>
      <title><![CDATA[${c.name} — Symptoms, Causes & Treatment]]></title>
      <link>${SITE}/health/${c.slug}</link>
      <guid isPermaLink="true">${SITE}/health/${c.slug}</guid>
      <description><![CDATA[${c.description.slice(0, 300)}]]></description>
      <category>Health Conditions</category>
      <pubDate>${now}</pubDate>
    </item>`
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GoDavaii — India's AI Healthcare Platform</title>
    <link>${SITE}</link>
    <description>Health articles, medicine guides, and condition information from GoDavaii — India's AI-powered healthcare super-app serving 603+ cities with AI health assistant in 16 Indian languages.</description>
    <language>en-in</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE}/logo.png</url>
      <title>GoDavaii</title>
      <link>${SITE}</link>
    </image>
${blogItems.join("\n")}
${healthItems.join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
