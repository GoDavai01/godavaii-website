// app/alternatives/page.js — Alternative To listing page
import Link from "next/link";
import { alternativeToPages } from "@/data/alternativeTo";
import { Sparkles, ArrowLeft, ArrowRight, Repeat2, Star } from "lucide-react";

export const revalidate = 86400;

export const metadata = {
  title: "Best Pharmacy App Alternatives in India (2026) — Compare & Switch | GoDavaii",
  description:
    "Compare the best alternatives to PharmEasy, 1mg, Netmeds, Apollo 24/7, Practo, and more. Find cheaper, faster medicine delivery and AI health features.",
  alternates: { canonical: "/alternatives" },
  openGraph: {
    title: "Best Pharmacy App Alternatives in India | GoDavaii",
    description: "Compare top pharmacy and health app alternatives with honest reviews.",
    type: "website",
  },
};

export default function AlternativesListingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.godavaii.com" },
      { "@type": "ListItem", position: 2, name: "Alternatives" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
            <span className="text-white/60">Alternatives</span>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-4">
              <Repeat2 className="h-4 w-4" /> Compare & Switch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Best App Alternatives</span>
            </h1>
            <p className="text-white/50 mt-4 text-lg max-w-2xl mx-auto">
              Honest comparisons of India&apos;s top pharmacy and health apps. Find the best alternative with faster delivery, better prices, and AI features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {alternativeToPages.map((page) => (
              <Link
                key={page.slug}
                href={`/alternatives/${page.slug}`}
                className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-6 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                    <Star className="h-3 w-3 inline mr-1" />
                    {page.alternatives.length} Alternatives
                  </span>
                  {page.targetCompetitor && (
                    <span className="text-white/30 text-xs">vs {page.targetCompetitor}</span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-white group-hover:text-brand-300 transition-colors mb-2 line-clamp-2">
                  {page.title}
                </h2>
                <p className="text-white/40 text-sm line-clamp-2">{page.metaDescription}</p>
                <div className="flex items-center gap-1 mt-4 text-brand-400 text-sm font-medium group-hover:text-brand-300 transition-colors">
                  View Alternatives <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <footer className="border-t border-white/[0.06] px-4 py-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-400" />
              <span className="font-bold text-white/50">GoDavaii</span>
            </div>
            <div className="flex gap-4">
              <Link href="/compare" className="hover:text-white/50">Comparisons</Link>
              <Link href="/blog" className="hover:text-white/50">Blog</Link>
              <Link href="/privacy" className="hover:text-white/50">Privacy</Link>
              <Link href="/" className="hover:text-white/50">Home</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
