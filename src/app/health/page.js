// app/health/page.js — Health Conditions A-Z listing page
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { conditions } from "@/data/conditions";
import { Sparkles, ArrowLeft, ArrowRight, Search, Heart, Stethoscope } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function HealthListingPage() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState("");

  const filtered = useMemo(() => {
    let result = conditions;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          (c.symptoms || []).some((s) => s.toLowerCase().includes(q))
      );
    }
    if (activeLetter) {
      result = result.filter((c) => c.name.toUpperCase().startsWith(activeLetter));
    }
    return result;
  }, [search, activeLetter]);

  // Group by first letter
  const grouped = useMemo(() => {
    const map = {};
    for (const c of filtered) {
      const letter = c.name[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(c);
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <Sparkles className="h-5 w-5 text-brand-400" />
            <span className="font-bold">GoDavaii</span>
          </Link>
          <Link href="/ai" className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold hover:from-brand-500 hover:to-brand-400 transition-all">
            Try GoDavaii AI
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/60">Health A-Z</span>
        </nav>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-4">
            <Stethoscope className="h-4 w-4" /> Health Encyclopedia
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Health Conditions A-Z</span>
          </h1>
          <p className="text-white/50 mt-4 text-lg max-w-2xl mx-auto">
            {conditions.length}+ health conditions with symptoms, causes, medicines, and expert guidance
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveLetter(""); }}
              placeholder="Search conditions, symptoms..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-brand-500/40 transition-colors"
            />
          </div>
        </div>

        {/* Alphabet Nav */}
        <div className="flex flex-wrap justify-center gap-1 mb-10">
          <button
            onClick={() => setActiveLetter("")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${!activeLetter ? "bg-brand-500/20 text-brand-300 border border-brand-500/30" : "bg-white/[0.04] text-white/40 hover:text-white/60 border border-transparent"}`}
          >
            All
          </button>
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => { setActiveLetter(letter === activeLetter ? "" : letter); setSearch(""); }}
              className={`px-2.5 py-1 rounded-lg text-sm font-medium transition-all ${activeLetter === letter ? "bg-brand-500/20 text-brand-300 border border-brand-500/30" : "bg-white/[0.04] text-white/40 hover:text-white/60 border border-transparent"}`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-white/40 text-sm mb-6">{filtered.length} conditions found</p>

        {/* Grouped listing */}
        {grouped.map(([letter, items]) => (
          <div key={letter} className="mb-8">
            <h2 className="text-2xl font-bold text-brand-400 mb-4 border-b border-white/[0.06] pb-2">{letter}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((c) => (
                <Link
                  key={c.slug}
                  href={`/health/${c.slug}`}
                  className="group flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all"
                >
                  <Heart className="h-4 w-4 text-brand-400 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors truncate">{c.name}</h3>
                    <p className="text-white/30 text-xs line-clamp-1 mt-0.5">{c.description}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-brand-400 ml-auto flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/40 text-lg">No conditions found for &quot;{search || activeLetter}&quot;</p>
            <button onClick={() => { setSearch(""); setActiveLetter(""); }} className="mt-4 text-brand-400 hover:text-brand-300 text-sm">
              Clear filters
            </button>
          </div>
        )}
      </div>

      <footer className="border-t border-white/[0.06] px-4 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-400" />
            <span className="font-bold text-white/50">GoDavaii</span>
          </div>
          <div className="flex gap-4">
            <Link href="/blog" className="hover:text-white/50">Blog</Link>
            <Link href="/category/all" className="hover:text-white/50">Medicines</Link>
            <Link href="/privacy" className="hover:text-white/50">Privacy</Link>
            <Link href="/" className="hover:text-white/50">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
