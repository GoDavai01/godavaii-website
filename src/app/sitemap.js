// app/sitemap.js — Dynamic sitemap for 6000+ pages (AI Search Optimized)
// Uses ISR (revalidates every 24h) so it doesn't block the build
import { slugify } from "@/lib/api";
import { conditions } from "@/data/conditions";
import { cities } from "@/data/cities";
import { getAllArticles } from "@/data/blogIndex";
import { comparisons } from "@/data/comparisons";
import { faqHubs } from "@/data/faqHubs";
import { drugInteractions } from "@/data/drugInteractions";

export const revalidate = 86400; // Regenerate sitemap every 24 hours (ISR)

const SITE_URL = "https://www.godavaii.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.godavaii.com";

export default async function sitemap() {
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/ai`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/refunds`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  // City pages (600+ cities across India)
  const cityPages = cities.map((c) => ({
    url: `${SITE_URL}/medicine-delivery/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Health condition pages
  const healthPages = conditions.map((c) => ({
    url: `${SITE_URL}/health/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Blog articles (1000+)
  let blogPages = [];
  try {
    const articles = getAllArticles();
    blogPages = [
      { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
      ...articles.map((a) => ({
        url: `${SITE_URL}/blog/${a.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      })),
    ];
  } catch {}

  // Medicine + Category pages — fetch with timeout to avoid build failure
  let medicinePages = [];
  let categoryPages = [];

  try {
    // Fetch all medicines with a 45-second timeout (Vercel build has 60s limit)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    const allItems = [];
    const PAGE_SIZE = 200;
    const MAX_PAGES = 50;

    for (let page = 1; page <= MAX_PAGES; page++) {
      try {
        const res = await fetch(
          `${API_URL}/api/medicines/all?paged=1&page=${page}&limit=${PAGE_SIZE}&catalogFallback=1`,
          { signal: controller.signal, cache: "no-store" }
        );
        if (!res.ok) break;
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data.items || []);
        allItems.push(...items);
        if (Array.isArray(data) || !data.hasMore || items.length < PAGE_SIZE) break;
      } catch (fetchErr) {
        if (fetchErr.name === "AbortError") {
          console.log(`Sitemap: timeout after ${allItems.length} medicines on page ${page}`);
          break;
        }
        break;
      }
    }

    clearTimeout(timeout);

    // Deduplicate by slug
    const seen = new Set();
    medicinePages = [];
    for (const m of allItems) {
      const s = slugify(m.name);
      if (s && !seen.has(s)) {
        seen.add(s);
        medicinePages.push({
          url: `${SITE_URL}/medicine/${s}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }

    // Category pages from fetched data
    const catMap = new Map();
    for (const m of allItems) {
      const cats = Array.isArray(m.category) ? m.category : [m.category || "Miscellaneous"];
      for (const c of cats) {
        if (c && c !== "Miscellaneous" && !catMap.has(c)) {
          catMap.set(c, slugify(c));
        }
      }
    }
    categoryPages = [
      { url: `${SITE_URL}/category/all`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
      ...[...catMap.entries()].map(([, slug]) => ({
        url: `${SITE_URL}/category/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      })),
    ];
  } catch (err) {
    console.error("Sitemap medicine fetch error:", err.message);
  }

  // Comparison pages (AI search optimization — competitor comparisons)
  const comparisonPages = comparisons.map((c) => ({
    url: `${SITE_URL}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9, // High priority — these are key for AI search visibility
  }));

  // FAQ Hub pages (AI search optimization — FAQ-style content)
  const faqPages = faqHubs.map((h) => ({
    url: `${SITE_URL}/faq/${h.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Drug interaction pages (AI search optimization — high-value queries)
  const drugInteractionPages = drugInteractions.map((d) => ({
    url: `${SITE_URL}/drug-interactions/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...blogPages,
    ...cityPages,
    ...healthPages,
    ...categoryPages,
    ...medicinePages,
    ...comparisonPages,
    ...faqPages,
    ...drugInteractionPages,
  ];
}
