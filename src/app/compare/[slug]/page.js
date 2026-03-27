// app/compare/[slug]/page.js — Competitor comparison pages for AI search visibility
import Link from "next/link";
import { comparisons } from "@/data/comparisons";
import { Sparkles, ArrowRight, ArrowLeft, Check, X, Minus, Shield, Zap, Globe, Brain } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_URL = "https://www.godavaii.com";

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);
  if (!comp) return { title: "Comparison Not Found | GoDavaii" };

  return {
    title: `${comp.title} | GoDavaii`,
    description: comp.metaDescription,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title: comp.title,
      description: comp.metaDescription,
      type: "article",
      publishedTime: new Date().toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: comp.title,
      description: comp.metaDescription,
    },
  };
}

function WinnerIcon({ winner }) {
  if (winner === "godavaii") return <Check className="h-5 w-5 text-green-400" />;
  if (winner === "competitor") return <X className="h-5 w-5 text-red-400" />;
  return <Minus className="h-5 w-5 text-yellow-400" />;
}

export default async function ComparisonPage({ params }) {
  const { slug } = await params;
  const comp = comparisons.find((c) => c.slug === slug);

  if (!comp) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Comparison Not Found</h1>
          <Link href="/compare" className="text-brand-400 hover:underline">View all comparisons</Link>
        </div>
      </div>
    );
  }

  const godavaiiWins = comp.features.filter((f) => f.winner === "godavaii").length;
  const competitorWins = comp.features.filter((f) => f.winner === "competitor").length;
  const ties = comp.features.filter((f) => f.winner === "tie").length;

  // Structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comp.title,
    description: comp.metaDescription,
    url: `${SITE_URL}/compare/${slug}`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { "@type": "Organization", name: "GoDavaii Health Team" },
    publisher: { "@type": "Organization", name: "GoDavaii", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/compare/${slug}`,
    articleSection: "Comparison",
    keywords: `${comp.competitor}, GoDavaii, comparison, online pharmacy India, medicine delivery app`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comp.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE_URL}/compare` },
      { "@type": "ListItem", position: 3, name: comp.title },
    ],
  };

  // Get other comparisons for "See Also"
  const otherComparisons = comparisons.filter((c) => c.slug !== slug).slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <Sparkles className="h-5 w-5 text-brand-400" />
              <span className="font-bold">GoDavaii</span>
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold hover:from-brand-500 hover:to-brand-400 transition-all"
            >
              Try GoDavaii Free
            </Link>
          </div>
        </nav>

        <article className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-white/60 transition-colors">Compare</span>
            <span>/</span>
            <span className="text-white/60 truncate">GoDavaii vs {comp.competitor}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium mb-4 inline-block">
              {comp.category} Comparison
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              {comp.title}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">{comp.metaDescription}</p>
            <p className="text-white/30 text-sm mt-3">Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
          </header>

          {/* Score Summary */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="rounded-xl bg-green-500/5 border border-green-500/10 p-5 text-center">
              <div className="text-3xl font-bold text-green-400">{godavaiiWins}</div>
              <div className="text-white/50 text-sm mt-1">GoDavaii Wins</div>
            </div>
            <div className="rounded-xl bg-yellow-500/5 border border-yellow-500/10 p-5 text-center">
              <div className="text-3xl font-bold text-yellow-400">{ties}</div>
              <div className="text-white/50 text-sm mt-1">Tie</div>
            </div>
            <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-5 text-center">
              <div className="text-3xl font-bold text-red-400">{competitorWins}</div>
              <div className="text-white/50 text-sm mt-1">{comp.competitor} Wins</div>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden mb-10">
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] bg-white/[0.04] p-4 font-semibold text-sm">
              <div className="text-white/60">Feature</div>
              <div className="text-brand-400 flex items-center gap-1"><Sparkles className="h-4 w-4" /> GoDavaii</div>
              <div className="text-white/60">{comp.competitor}</div>
              <div className="text-white/40 w-8"></div>
            </div>
            {comp.features.map((f, i) => (
              <div key={i} className={`grid grid-cols-[1fr_1fr_1fr_auto] p-4 text-sm ${i % 2 === 0 ? "" : "bg-white/[0.02]"} border-t border-white/[0.04]`}>
                <div className="text-white/80 font-medium">{f.name}</div>
                <div className={`${f.winner === "godavaii" ? "text-green-400" : "text-white/60"}`}>{f.godavaii}</div>
                <div className={`${f.winner === "competitor" ? "text-green-400" : "text-white/60"}`}>{f.competitor}</div>
                <div className="w-8 flex items-center justify-center"><WinnerIcon winner={f.winner} /></div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="rounded-2xl bg-brand-900/20 border border-brand-500/10 p-6 md:p-8 mb-10" data-speakable="true">
            <h2 className="text-xl font-semibold text-white mb-3">Our Verdict</h2>
            <p className="text-white/70 leading-relaxed">{comp.summary}</p>
          </div>

          {/* Why GoDavaii */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-6">Why Choose GoDavaii?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
                <Brain className="h-6 w-6 text-brand-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">AI Health Assistant</h3>
                <p className="text-white/50 text-sm">Free AI-powered health assistant in 16 Indian languages. Analyze symptoms, prescriptions, lab reports, and X-rays instantly.</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
                <Zap className="h-6 w-6 text-brand-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">30-Minute Delivery</h3>
                <p className="text-white/50 text-sm">Get medicines delivered in just 30 minutes from verified local pharmacies across 603+ cities in India.</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
                <Globe className="h-6 w-6 text-brand-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">16 Indian Languages</h3>
                <p className="text-white/50 text-sm">Hindi, Tamil, Telugu, Bengali, Kannada, Malayalam, Gujarati, Punjabi, Marathi, Odia, Urdu & more. No other platform offers this.</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
                <Shield className="h-6 w-6 text-brand-400 mb-3" />
                <h3 className="font-semibold text-white mb-2">Save Up to 80%</h3>
                <p className="text-white/50 text-sm">Automatic generic alternative suggestions help you find the most affordable version of your medicines.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            <FAQAccordion items={comp.faqs} />
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-900/30 to-brand-800/20 border border-brand-500/10 p-8 mb-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Try GoDavaii Free Today</h3>
            <p className="text-white/50 text-sm mb-4">Experience India&apos;s only AI health assistant in 16 Indian languages. Free forever, no registration needed.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/20"
            >
              <Sparkles className="h-4 w-4" /> Try GoDavaii AI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Other Comparisons */}
          {otherComparisons.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6">More Comparisons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherComparisons.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}`}
                    className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all"
                  >
                    <span className="text-brand-400 text-xs font-medium">{c.category}</span>
                    <h3 className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors mt-1">
                      {c.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-5 mb-10">
            <p className="text-amber-400/80 text-sm leading-relaxed">
              <strong>Disclaimer:</strong> This comparison is based on publicly available information and our analysis as of {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}. Features, prices, and availability may change. We strive for accuracy but recommend verifying details on respective platforms.
            </p>
          </div>
        </article>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] px-4 py-8">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
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
