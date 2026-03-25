"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Pill, Search, ArrowRight } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import FAQAccordion from "@/components/FAQAccordion";
import { slugify } from "@/lib/api";

export default function CategoryClient({ name, slug, medicines, categories, faqs }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const filtered = search
    ? medicines.filter((m) =>
        (m.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (m.composition || "").toLowerCase().includes(search.toLowerCase())
      )
    : medicines;

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <Sparkles className="h-5 w-5 text-brand-400" />
            <span className="font-bold">GoDavaii</span>
          </Link>
          <button
            onClick={() => setLoginOpen(true)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold"
          >
            Try GoDavaii AI
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-6">
          <Link href="/" className="hover:text-white/60">Home</Link>
          <span>/</span>
          <span className="text-white/60">{name}</span>
        </nav>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">{name} Medicines</h1>
          <p className="text-white/50">{filtered.length} medicines available</p>
        </motion.div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-white/[0.06]">
          <Link
            href="/category/all"
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              slug === "all"
                ? "bg-brand-500/20 border border-brand-500/30 text-brand-300"
                : "bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white/70"
            }`}
          >
            All
          </Link>
          {categories.slice(0, 15).map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                slug === c.slug
                  ? "bg-brand-500/20 border border-brand-500/30 text-brand-300"
                  : "bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white/70"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 mb-8 max-w-md focus-within:border-brand-500/30 transition-colors">
          <Search className="h-4 w-4 text-white/30" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="bg-transparent text-white placeholder-white/30 outline-none flex-1 text-sm"
          />
        </div>

        {/* Medicine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {paginated.map((m, i) => (
            <motion.div
              key={m._id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <Link
                href={`/medicine/${slugify(m.name)}`}
                className="block rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all group h-full"
              >
                <div className="flex items-start gap-3">
                  {m.img ? (
                    <Image src={m.img} alt={m.name} width={48} height={48} className="rounded-lg object-contain w-12 h-12 shrink-0 bg-white/5 p-1" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                      <Pill className="h-5 w-5 text-white/10" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-white text-sm group-hover:text-brand-300 transition-colors truncate">{m.name}</p>
                    {m.composition && <p className="text-white/30 text-xs mt-0.5 truncate">{m.composition}</p>}
                  </div>
                </div>
                {m.price > 0 && (
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-brand-400 font-semibold">₹{m.price}</span>
                    {m.mrp > 0 && m.mrp > m.price && (
                      <span className="text-white/20 text-xs line-through">₹{m.mrp}</span>
                    )}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-12">
            {page > 1 && (
              <button onClick={() => setPage(page - 1)} className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white/60 hover:bg-white/[0.08]">
                Previous
              </button>
            )}
            <span className="text-white/40 text-sm px-4">Page {page} of {totalPages}</span>
            {page < totalPages && (
              <button onClick={() => setPage(page + 1)} className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white/60 hover:bg-white/[0.08]">
                Next
              </button>
            )}
          </div>
        )}

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <FAQAccordion items={faqs} />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-400" />
            <span className="font-bold text-white/50">GoDavaii</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/50">Privacy</Link>
            <Link href="/terms" className="hover:text-white/50">Terms</Link>
            <Link href="/" className="hover:text-white/50">Home</Link>
          </div>
        </div>
      </footer>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
