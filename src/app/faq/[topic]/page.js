// app/faq/[topic]/page.js — FAQ Hub pages for AI search visibility
import Link from "next/link";
import { faqHubs } from "@/data/faqHubs";
import { Sparkles, ArrowRight, ArrowLeft, MessageCircleQuestion, Search } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_URL = "https://www.godavaii.com";

export async function generateStaticParams() {
  return faqHubs.map((h) => ({ topic: h.slug }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const hub = faqHubs.find((h) => h.slug === topic);
  if (!hub) return { title: "FAQ | GoDavaii" };

  return {
    title: `${hub.title} | GoDavaii`,
    description: hub.metaDescription,
    alternates: { canonical: `/faq/${topic}` },
    openGraph: {
      title: hub.title,
      description: hub.metaDescription,
      type: "article",
    },
  };
}

export default async function FAQHubPage({ params }) {
  const { topic } = await params;
  const hub = faqHubs.find((h) => h.slug === topic);

  if (!hub) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">FAQ Topic Not Found</h1>
          <Link href="/" className="text-brand-400 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const otherHubs = faqHubs.filter((h) => h.slug !== topic);

  // Structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
      { "@type": "ListItem", position: 3, name: hub.heading },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: hub.title,
    description: hub.metaDescription,
    url: `${SITE_URL}/faq/${topic}`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { "@type": "Organization", name: "GoDavaii Health Team" },
    publisher: { "@type": "Organization", name: "GoDavaii", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/faq/${topic}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
  };

  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: hub.title,
    description: hub.metaDescription,
    url: `${SITE_URL}/faq/${topic}`,
    lastReviewed: new Date().toISOString(),
    reviewedBy: {
      "@type": "Organization",
      name: "GoDavaii Health Team",
      url: SITE_URL,
    },
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }} />

      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <Sparkles className="h-5 w-5 text-brand-400" />
              <span className="font-bold">GoDavaii</span>
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold hover:from-brand-500 hover:to-brand-400 transition-all"
            >
              Ask AI Free
            </Link>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="hover:text-white/60 transition-colors">FAQ</span>
            <span>/</span>
            <span className="text-white/60">{hub.heading}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircleQuestion className="h-8 w-8 text-brand-400" />
              <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium">
                {hub.faqs.length} Questions Answered
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" data-speakable="true">
              {hub.heading}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed" data-speakable="true">{hub.description}</p>
            <p className="text-white/30 text-sm mt-3">Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })} | Reviewed by GoDavaii Health Team</p>
          </header>

          {/* Quick Jump */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 mb-10">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-brand-400" /> Quick Navigation
            </h2>
            <div className="space-y-2">
              {hub.faqs.map((f, i) => (
                <div key={i} className="text-sm text-white/50 hover:text-brand-400 transition-colors">
                  <span className="text-brand-400/50 mr-2">{i + 1}.</span>
                  {f.q}
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">All Questions & Answers</h2>
            <FAQAccordion items={hub.faqs} />
          </div>

          {/* Medical Disclaimer */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-5 mb-10">
            <p className="text-amber-400/80 text-sm leading-relaxed">
              <strong>Medical Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment. GoDavaii&apos;s AI assistant can provide general health guidance in 16 Indian languages.
            </p>
          </div>

          {/* Ask AI CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-900/30 to-brand-800/20 border border-brand-500/10 p-8 mb-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Still have questions?</h3>
            <p className="text-white/50 text-sm mb-4">Ask GoDavaii AI for instant, personalized health answers in 16 Indian languages — completely free!</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/20"
            >
              <Sparkles className="h-4 w-4" /> Ask GoDavaii AI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Other FAQ Hubs */}
          {otherHubs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6">More FAQ Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherHubs.map((h) => (
                  <Link
                    key={h.slug}
                    href={`/faq/${h.slug}`}
                    className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all"
                  >
                    <MessageCircleQuestion className="h-5 w-5 text-brand-400 mb-2" />
                    <h3 className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">
                      {h.heading}
                    </h3>
                    <p className="text-white/40 text-xs mt-1">{h.faqs.length} questions answered</p>
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
