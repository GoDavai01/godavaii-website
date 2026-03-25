"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Sparkles, ArrowRight, Activity, Pill,
  Stethoscope, FlaskConical, AlertTriangle,
} from "lucide-react";
import LoginModal from "@/components/LoginModal";
import GlowCard from "@/components/GlowCard";
import FAQAccordion from "@/components/FAQAccordion";

export default function ConditionClient({ cond, related, faqs }) {
  const [loginOpen, setLoginOpen] = useState(false);

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
            className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold"
          >
            Ask AI About This
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/60">Home</Link>
          <span>/</span>
          <span className="text-white/40">Health</span>
          <span>/</span>
          <span className="text-white/60">{cond.name}</span>
        </nav>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-4">{cond.name}</h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-3xl">{cond.description}</p>
        </motion.div>

        {/* Symptoms */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-brand-400" /> Common Symptoms
          </h2>
          <div className="flex flex-wrap gap-2">
            {cond.symptoms.map((s) => (
              <span key={s} className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/60 text-sm">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <GlowCard delay={0.1}>
            <Pill className="h-8 w-8 text-brand-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Find Medicines</h3>
            <p className="text-white/50 text-sm mb-4">Browse medicines commonly used for {cond.name.toLowerCase()}</p>
            {cond.relatedCategories[0] && (
              <Link
                href={`/category/${cond.relatedCategories[0].toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center gap-1 text-brand-400 text-sm font-medium hover:text-brand-300"
              >
                Browse Medicines <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </GlowCard>

          <GlowCard delay={0.2}>
            <Sparkles className="h-8 w-8 text-brand-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Ask GoDavaii AI</h3>
            <p className="text-white/50 text-sm mb-4">Get instant AI guidance about {cond.name.toLowerCase()} in your language</p>
            <button
              onClick={() => setLoginOpen(true)}
              className="inline-flex items-center gap-1 text-brand-400 text-sm font-medium hover:text-brand-300"
            >
              Ask AI Now <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </GlowCard>

          <GlowCard delay={0.3}>
            <Stethoscope className="h-8 w-8 text-brand-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Consult a Doctor</h3>
            <p className="text-white/50 text-sm mb-4">Video or phone consultation with verified doctors</p>
            <a
              href="https://app.godavaii.com/doctors"
              className="inline-flex items-center gap-1 text-brand-400 text-sm font-medium hover:text-brand-300"
            >
              Find Doctors <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </GlowCard>
        </div>

        {/* Lab Tests */}
        {cond.relatedLabTests.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-brand-400" /> Related Lab Tests
            </h2>
            <div className="flex flex-wrap gap-2">
              {cond.relatedLabTests.map((test) => (
                <a
                  key={test}
                  href="https://app.godavaii.com/lab-tests"
                  className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/60 text-sm hover:bg-white/[0.08] hover:text-white hover:border-brand-500/20 transition-all"
                >
                  {test}
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* When to see a doctor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-amber-500/[0.05] border border-amber-500/10 p-6 mb-10"
        >
          <h2 className="text-lg font-semibold text-amber-300 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" /> When to See a Doctor
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            If your symptoms are severe, persistent, or getting worse, please consult a healthcare professional.
            GoDavaii AI provides health information but is not a substitute for professional medical advice.
            You can book a doctor consultation instantly through the GoDavaii app.
          </p>
        </motion.div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <FAQAccordion items={faqs} />
        </div>

        {/* Related Conditions */}
        {related.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Related Health Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/health/${r.slug}`}
                  className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all group"
                >
                  <p className="font-medium text-white group-hover:text-brand-300 transition-colors">{r.name}</p>
                  <p className="text-white/40 text-sm mt-1 line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
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
