// app/sitemap.js
const base = "https://www.godavaii.com";
const cities = ["noida"];                       // ← only Noida

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    ...cities.map((c) => ({
      url: `${base}/medicine-delivery/${c}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    })),
  ];
}
