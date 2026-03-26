// app/sitemap.js — Dynamic sitemap for 6000+ pages
import { fetchAllMedicines, extractCategories, slugify } from "@/lib/api";
import { conditions } from "@/data/conditions";
import { cities } from "@/data/cities";
import { getAllArticles } from "@/data/blogIndex";

const SITE_URL = "https://www.godavaii.com";

export default async function sitemap() {
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
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

  // Medicine + Category pages (from API)
  let medicinePages = [];
  let categoryPages = [];

  try {
    const medicines = await fetchAllMedicines();

    // Individual medicine pages
    medicinePages = medicines.map((m) => ({
      url: `${SITE_URL}/medicine/${slugify(m.name)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Category pages
    const categories = extractCategories(medicines);
    categoryPages = [
      { url: `${SITE_URL}/category/all`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
      ...categories.map((c) => ({
        url: `${SITE_URL}/category/${c.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      })),
    ];
  } catch {
    // If API is down, return just static pages
  }

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

  return [
    ...staticPages,
    ...blogPages,
    ...cityPages,
    ...healthPages,
    ...categoryPages,
    ...medicinePages,
  ];
}
