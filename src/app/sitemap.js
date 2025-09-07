// app/sitemap.js

const base = "https://www.godavaii.com";

// Keep this list in sync with the cities you pre-render below.
const cities = ["noida", "delhi", "ghaziabad", "gurugram", "lucknow", "aligarh"];

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
