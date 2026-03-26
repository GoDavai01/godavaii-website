// lib/api.js — Server-side API helpers for SSG/ISR data fetching

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.godavaii.com";

/** Slugify a medicine/category name for URL use */
export function slugify(str) {
  return (str || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

// Module-level cache to avoid refetching during same build
let _medicineCache = null;
let _medicineCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes for server-side cache

/** Fetch ALL medicines via pagination (up to 10,000) */
export async function fetchAllMedicines() {
  const now = Date.now();
  if (_medicineCache && (now - _medicineCacheTime) < CACHE_TTL) return _medicineCache;

  const allItems = [];
  const PAGE_SIZE = 200; // API max per request
  const MAX_PAGES = 50; // Safety limit (50 * 200 = 10,000 max)

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const res = await fetch(
        `${API_URL}/api/medicines/all?paged=1&page=${page}&limit=${PAGE_SIZE}&catalogFallback=1`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) break;

      const data = await res.json();

      // API may return { items, hasMore } or a plain array
      if (Array.isArray(data)) {
        allItems.push(...data);
        break; // Plain array means no pagination
      }

      const items = data.items || [];
      allItems.push(...items);

      // Stop if no more pages
      if (!data.hasMore || items.length < PAGE_SIZE) break;
    }

    _medicineCache = allItems;
    _medicineCacheTime = now;
    return allItems;
  } catch {
    return allItems.length > 0 ? allItems : [];
  }
}

/** Fetch a single medicine by slug — searches ALL pages until found */
export async function fetchMedicineBySlug(slug) {
  // First check cache
  if (_medicineCache && _medicineCache.length > 0) {
    const cached = _medicineCache.find((m) => slugify(m.name) === slug);
    if (cached) return cached;
  }

  // Search page by page until we find the medicine (avoids loading all 4000+ into memory)
  const PAGE_SIZE = 200;
  const MAX_PAGES = 50;

  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const res = await fetch(
        `${API_URL}/api/medicines/all?paged=1&page=${page}&limit=${PAGE_SIZE}&catalogFallback=1`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) break;

      const data = await res.json();
      const items = Array.isArray(data) ? data : (data.items || []);
      const hasMore = Array.isArray(data) ? false : data.hasMore;

      // Check if the medicine is on this page
      const found = items.find((m) => slugify(m.name) === slug);
      if (found) return found;

      // Stop if no more pages
      if (!hasMore || items.length < PAGE_SIZE) break;
    }
  } catch (err) {
    console.error("fetchMedicineBySlug error:", err.message);
  }

  return null;
}

/** Fetch alternatives by compositionKey */
export async function fetchAlternatives(compositionKey, pharmacyId) {
  if (!compositionKey) return [];
  try {
    const params = new URLSearchParams({ compositionKey });
    if (pharmacyId) params.set("pharmacyId", pharmacyId);
    const res = await fetch(`${API_URL}/api/medicines/alternatives?${params}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.generics || data || [];
  } catch {
    return [];
  }
}

/** Extract unique categories from medicine list */
export function extractCategories(medicines) {
  const map = new Map();
  for (const m of medicines) {
    const cats = Array.isArray(m.category) ? m.category : [m.category || "Miscellaneous"];
    for (const c of cats) {
      const name = c.trim();
      if (!name || name === "Miscellaneous") continue;
      const slug = slugify(name);
      if (!map.has(slug)) {
        map.set(slug, { name, slug, count: 0 });
      }
      map.get(slug).count++;
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

/** Filter medicines by category */
export function filterByCategory(medicines, categorySlug) {
  return medicines.filter((m) => {
    const cats = Array.isArray(m.category) ? m.category : [m.category || ""];
    return cats.some((c) => slugify(c.trim()) === categorySlug);
  });
}
