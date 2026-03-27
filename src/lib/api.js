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

/** Fetch ALL medicines via parallel pagination (up to 10,000) */
export async function fetchAllMedicines() {
  const now = Date.now();
  if (_medicineCache && (now - _medicineCacheTime) < CACHE_TTL) return _medicineCache;

  const PAGE_SIZE = 200;

  try {
    // First, fetch page 1 to know total pages
    const firstRes = await fetch(
      `${API_URL}/api/medicines/all?paged=1&page=1&limit=${PAGE_SIZE}&catalogFallback=1`,
      { next: { revalidate: 86400 } }
    );
    if (!firstRes.ok) return [];
    const firstData = await firstRes.json();

    if (Array.isArray(firstData)) {
      _medicineCache = firstData;
      _medicineCacheTime = now;
      return firstData;
    }

    const allItems = [...(firstData.items || [])];

    if (firstData.hasMore && (firstData.items || []).length >= PAGE_SIZE) {
      // Estimate total pages and fetch remaining in PARALLEL (batches of 5)
      const totalPages = firstData.totalPages || Math.ceil((firstData.total || 5000) / PAGE_SIZE);
      const remainingPages = [];
      for (let p = 2; p <= Math.min(totalPages, 50); p++) remainingPages.push(p);

      // Fetch in parallel batches of 5 pages
      const BATCH_SIZE = 5;
      for (let i = 0; i < remainingPages.length; i += BATCH_SIZE) {
        const batch = remainingPages.slice(i, i + BATCH_SIZE);
        const results = await Promise.allSettled(
          batch.map((page) =>
            fetch(
              `${API_URL}/api/medicines/all?paged=1&page=${page}&limit=${PAGE_SIZE}&catalogFallback=1`,
              { next: { revalidate: 86400 } }
            ).then((r) => (r.ok ? r.json() : null))
          )
        );
        for (const r of results) {
          if (r.status === "fulfilled" && r.value) {
            const items = Array.isArray(r.value) ? r.value : (r.value.items || []);
            allItems.push(...items);
          }
        }
      }
    }

    _medicineCache = allItems;
    _medicineCacheTime = now;
    return allItems;
  } catch {
    return _medicineCache || [];
  }
}

/** Fetch a single medicine by slug — uses fetchAllMedicines cache for speed */
export async function fetchMedicineBySlug(slug) {
  // Load ALL medicines into cache (single call, shared across all pages)
  const allMeds = await fetchAllMedicines();

  // Exact match
  const exact = allMeds.find((m) => slugify(m.name) === slug);
  if (exact) return exact;

  // Partial match fallback — if slug is "cetirizine", find "cetirizine-10-mg"
  const partial = allMeds.find((m) => slugify(m.name).startsWith(slug + "-"));
  if (partial) return partial;

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
