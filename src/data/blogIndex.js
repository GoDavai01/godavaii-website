// blogIndex.js — Combines all blog article batches into one index
import { articles1 } from "./blogArticles1";
import { articles2 } from "./blogArticles2";

let _allArticles = null;

export function getAllArticles() {
  if (_allArticles) return _allArticles;
  _allArticles = [...(articles1 || []), ...(articles2 || [])];
  return _allArticles;
}

export function getArticleBySlug(slug) {
  return getAllArticles().find((a) => a.slug === slug) || null;
}

export function getArticlesByCategory(category) {
  return getAllArticles().filter((a) => a.category === category);
}

export function getAllCategories() {
  const cats = new Map();
  for (const a of getAllArticles()) {
    if (!cats.has(a.category)) cats.set(a.category, 0);
    cats.set(a.category, cats.get(a.category) + 1);
  }
  return Array.from(cats.entries())
    .map(([name, count]) => ({ name, count, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags() {
  const tags = new Map();
  for (const a of getAllArticles()) {
    for (const t of (a.tags || [])) {
      if (!tags.has(t)) tags.set(t, 0);
      tags.set(t, tags.get(t) + 1);
    }
  }
  return Array.from(tags.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
