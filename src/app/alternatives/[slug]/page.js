// app/alternatives/[slug]/page.js — "Best X Alternatives" listicle pages for AI search
import Link from "next/link";
import { alternativeToPages } from "@/data/alternativeTo";
import { Sparkles, ArrowRight, ArrowLeft, Trophy, Star, CheckCircle } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_URL = "https://www.godavaii.com";

export async function generateStaticParams() {
  return alternativeToPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = alternativeToPages.find((p) => p.slug === slug);
  if (!page) return { title: "Alternatives | GoDavaii" };

  return {
    title: `${page.title} | GoDavaii`,
    description: page.metaDescription,
    alternates: { canonical: `/alternatives/${slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: "article",
    },
  };
}

export default async function AlternativesPage({ params }) {
  const { slug } = await params;
  const page = alternativeToPages.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <Link href="/" className="text-brand-400 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const otherPages = alternativeToPages.filter((p) => p.slug !== slug).slice(0, 4);

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.metaDescription,
    url: `${SITE_URL}/alternatives/${slug}`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { "@type": "Organization", name: "GoDavaii Health Team" },
    publisher: { "@type": "Organization", name: "GoDavaii", url: SITE_URL },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
  };

  // ItemList Schema for ranked alternatives
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.heading,
    description: page.description,
    numberOfItems: page.alternatives.length,
    itemListElement: page.alternatives.map((alt) => ({
      "@type": "ListItem",
      position: alt.rank,
      name: alt.name,
      description: `${alt.tagline}. ${alt.highlights.join(". ")}. Best for: ${alt.bestFor}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Alternatives", item: `${SITE_URL}/alternatives` },
      { "@type": "ListItem", position: 3, name: page.heading },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <Sparkles className="h-5 w-5 text-brand-400" />
              <span className="font-bold">GoDavaii</span>
            </Link>
            <Link href="/" className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold hover:from-brand-500 hover:to-brand-400 transition-all">
              Try GoDavaii AI
            </Link>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-white/60 transition-colors">Alternatives</span>
            <span>/</span>
            <span className="text-white/60">{page.targetCompetitor}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-8 w-8 text-brand-400" />
              <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium">
                {page.alternatives.length} Alternatives Compared
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" data-speakable="true">
              {page.heading}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed" data-speakable="true">{page.description}</p>
            <div className="mt-4">
              <MedicalReviewBadge />
            </div>
          </header>

          {/* Alternatives List */}
          <div className="space-y-4 mb-12">
            {page.alternatives.map((alt) => (
              <div
                key={alt.rank}
                className={`rounded-2xl border p-6 md:p-8 ${
                  alt.rank === 1
                    ? "bg-brand-500/5 border-brand-500/20"
                    : "bg-white/[0.02] border-white/[0.05]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                    alt.rank === 1
                      ? "bg-brand-500/20 text-brand-400 border-2 border-brand-500/30"
                      : "bg-white/[0.05] text-white/40 border border-white/[0.08]"
                  }`}>
                    #{alt.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-semibold text-white">{alt.name}</h2>
                      {alt.rank === 1 && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-medium flex items-center gap-1">
                          <Star className="h-3 w-3" /> Top Pick
                        </span>
                      )}
                    </div>
                    <p className="text-white/40 text-sm mb-3">{alt.tagline}</p>

                    <ul className="space-y-1.5 mb-3">
                      {alt.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                          <CheckCircle className={`h-4 w-4 mt-0.5 shrink-0 ${alt.rank === 1 ? "text-brand-400" : "text-white/30"}`} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05] inline-block">
                      <span className="text-white/40 text-xs">Best for: </span>
                      <span className="text-white/70 text-xs">{alt.bestFor}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Medical Disclaimer */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-5 mb-10">
            <p className="text-amber-400/80 text-sm leading-relaxed">
              <strong>Disclaimer:</strong> This comparison is based on publicly available information and is for informational purposes only. Features and pricing may change. Always verify current offerings on respective platforms. GoDavaii strives for accurate, unbiased comparisons.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            <FAQAccordion items={page.faqs} />
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-900/30 to-brand-800/20 border border-brand-500/10 p-8 mb-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Try GoDavaii — India&apos;s AI Health Platform</h3>
            <p className="text-white/50 text-sm mb-4">Free AI health assistant in 16 Indian languages. 30-minute medicine delivery. No subscription needed.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/20">
              <Sparkles className="h-4 w-4" /> Try GoDavaii Free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Other Alternative Pages */}
          {otherPages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6">More Comparisons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherPages.map((p) => (
                  <Link key={p.slug} href={`/alternatives/${p.slug}`} className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all">
                    <Trophy className="h-5 w-5 text-brand-400 mb-2" />
                    <h3 className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">{p.heading}</h3>
                    <p className="text-white/40 text-xs mt-1">{p.alternatives.length} alternatives compared</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] px-4 py-8">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-400" />
              <span className="font-bold text-white/50">GoDavaii</span>
            </div>
            <div className="flex gap-4">
              <Link href="/blog" className="hover:text-white/50">Blog</Link>
              <Link href="/privacy" className="hover:text-white/50">Privacy</Link>
              <Link href="/terms" className="hover:text-white/50">Terms</Link>
              <Link href="/" className="hover:text-white/50">Home</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
