"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft, Pill, ShieldCheck, Sparkles, ArrowRight,
  Package, Tag, Building2, FileText, ChevronDown,
} from "lucide-react";
import LoginModal from "@/components/LoginModal";
import FAQAccordion from "@/components/FAQAccordion";
import { slugify } from "@/lib/api";

export default function MedicineClient({ med, alternatives, faqs, categorySlug, categoryName }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const discount = med.mrp && med.price && med.mrp > med.price
    ? Math.round(((med.mrp - med.price) / med.mrp) * 100)
    : 0;

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.godavaii.com";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <Sparkles className="h-5 w-5 text-brand-400" />
            <span className="font-bold">GoDavaii</span>
          </Link>
          <button
            onClick={() => setLoginOpen(true)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold hover:from-brand-500 hover:to-brand-400 transition-all"
          >
            Order Now
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-white/60 transition-colors">{categoryName}</Link>
          <span>/</span>
          <span className="text-white/60 truncate">{med.name}</span>
        </nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 mb-12"
        >
          {/* Image */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 flex items-center justify-center min-h-[250px]">
            {med.img ? (
              <Image src={med.img} alt={med.name} width={300} height={300} className="object-contain max-h-[250px] w-auto" />
            ) : (
              <Pill className="h-20 w-20 text-white/10" />
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {med.prescriptionRequired && (
                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                  Rx Required
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium">
                {med.type || "Medicine"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{med.name}</h1>

            {med.brand && (
              <p className="text-white/50 text-sm mb-1 flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5" /> {med.brand}
              </p>
            )}
            {med.composition && (
              <p className="text-white/40 text-sm mb-4 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5" /> {med.composition}
              </p>
            )}

            {/* Price Card */}
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-5 mb-5">
              <div className="flex items-baseline gap-3">
                {med.price > 0 && (
                  <span className="text-3xl font-bold gradient-text">₹{med.price}</span>
                )}
                {med.mrp > 0 && med.mrp > med.price && (
                  <span className="text-lg text-white/30 line-through">₹{med.mrp}</span>
                )}
                {discount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-sm font-medium">
                    {discount}% OFF
                  </span>
                )}
              </div>
              {med.packCount > 0 && (
                <p className="text-white/40 text-sm mt-2 flex items-center gap-2">
                  <Package className="h-3.5 w-3.5" />
                  Pack of {med.packCount} {med.packUnit || "units"}
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/20"
              >
                <Pill className="h-4 w-4" /> Order on GoDavaii
              </button>
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/70 font-medium hover:bg-white/[0.08] hover:text-white transition-all"
              >
                <Sparkles className="h-4 w-4 text-brand-400" /> Ask AI About This
              </button>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        {med.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-3">About {med.name}</h2>
            <div className="text-white/60 text-sm leading-relaxed whitespace-pre-line">{med.description}</div>
          </motion.div>
        )}

        {/* Alternatives */}
        {alternatives && alternatives.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5 text-brand-400" /> Affordable Alternatives
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {alternatives.slice(0, 6).map((alt, i) => (
                <Link
                  key={alt._id || i}
                  href={`/medicine/${slugify(alt.name)}`}
                  className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all group"
                >
                  <p className="font-medium text-white group-hover:text-brand-300 transition-colors text-sm">{alt.name}</p>
                  {alt.brand && <p className="text-white/40 text-xs mt-0.5">{alt.brand}</p>}
                  {alt.price > 0 && (
                    <p className="text-brand-400 font-semibold mt-2">₹{alt.price}</p>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <FAQAccordion items={faqs} />
        </motion.div>

        {/* Related Category */}
        <div className="text-center py-8 border-t border-white/[0.06]">
          <p className="text-white/40 text-sm mb-3">Browse more medicines</p>
          <Link
            href={`/category/${categorySlug}`}
            className="inline-flex items-center gap-2 text-brand-400 font-medium hover:text-brand-300 transition-colors"
          >
            View all {categoryName} medicines <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
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
