// app/drug-interactions/page.js — Drug Interactions listing page
import Link from "next/link";
import { drugInteractions } from "@/data/drugInteractions";
import { Sparkles, ArrowLeft, ArrowRight, AlertTriangle, Pill } from "lucide-react";

export const revalidate = 86400;

const severityColors = {
  moderate: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  major: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  severe: "bg-red-500/10 border-red-500/20 text-red-400",
  minor: "bg-green-500/10 border-green-500/20 text-green-400",
};

export const metadata = {
  title: "Drug Interactions Checker — Medicine Interaction Guide | GoDavaii",
  description:
    "Check common drug interactions between medicines. Know which medicines should not be taken together. Expert-reviewed drug interaction guides by GoDavaii.",
  alternates: { canonical: "/drug-interactions" },
  openGraph: {
    title: "Drug Interactions Checker | GoDavaii",
    description: "Check common drug interactions. Know which medicines should not be taken together.",
    type: "website",
  },
};

export default function DrugInteractionsListingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.godavaii.com" },
      { "@type": "ListItem", position: 2, name: "Drug Interactions" },
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
            <span className="text-white/60">Drug Interactions</span>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
              <AlertTriangle className="h-4 w-4" /> Safety First
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Drug Interactions</span>
            </h1>
            <p className="text-white/50 mt-4 text-lg max-w-2xl mx-auto">
              Check which medicines interact with each other. Know the risks before combining medications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {drugInteractions.map((interaction) => (
              <Link
                key={interaction.slug}
                href={`/drug-interactions/${interaction.slug}`}
                className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-6 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${severityColors[interaction.severity] || severityColors.moderate}`}>
                    {interaction.severity?.toUpperCase() || "CHECK"}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-white group-hover:text-brand-300 transition-colors mb-2 line-clamp-2">
                  <Pill className="h-4 w-4 inline mr-1.5 text-brand-400" />
                  {interaction.title}
                </h2>
                <p className="text-white/40 text-sm line-clamp-2">{interaction.metaDescription}</p>
                <div className="flex items-center gap-1 mt-4 text-brand-400 text-sm font-medium group-hover:text-brand-300 transition-colors">
                  View Interaction <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
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
              <Link href="/category/all" className="hover:text-white/50">Medicines</Link>
              <Link href="/health" className="hover:text-white/50">Health A-Z</Link>
              <Link href="/privacy" className="hover:text-white/50">Privacy</Link>
              <Link href="/" className="hover:text-white/50">Home</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
