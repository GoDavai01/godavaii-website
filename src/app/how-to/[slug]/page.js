// app/how-to/[slug]/page.js — HowTo guide pages with HowTo schema for AI search
import Link from "next/link";
import { howToGuides } from "@/data/howToGuides";
import { Sparkles, ArrowRight, ArrowLeft, BookOpen, CheckCircle, Lightbulb } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_URL = "https://www.godavaii.com";

export async function generateStaticParams() {
  return howToGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = howToGuides.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide | GoDavaii" };

  return {
    title: `${guide.title} | GoDavaii`,
    description: guide.metaDescription,
    alternates: { canonical: `/how-to/${slug}` },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: "article",
    },
  };
}

export default async function HowToPage({ params }) {
  const { slug } = await params;
  const guide = howToGuides.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Guide Not Found</h1>
          <Link href="/" className="text-brand-400 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const otherGuides = howToGuides.filter((g) => g.slug !== slug).slice(0, 4);

  // HowTo Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.heading,
    description: guide.description,
    totalTime: guide.totalTime,
    step: guide.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE_URL}/how-to/${slug}#step-${i + 1}`,
    })),
    tool: [{ "@type": "HowToTool", name: "GoDavaii App or Website" }],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "How-To Guides", item: `${SITE_URL}/how-to` },
      { "@type": "ListItem", position: 3, name: guide.heading },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    url: `${SITE_URL}/how-to/${slug}`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { "@type": "Organization", name: "GoDavaii Health Team" },
    publisher: { "@type": "Organization", name: "GoDavaii", url: SITE_URL },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

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
            <span className="hover:text-white/60 transition-colors">How-To Guides</span>
            <span>/</span>
            <span className="text-white/60">{guide.heading}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-brand-400" />
              <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium">
                {guide.steps.length} Steps
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" data-speakable="true">
              {guide.heading}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed" data-speakable="true">{guide.description}</p>
            <div className="mt-4">
              <MedicalReviewBadge />
            </div>
          </header>

          {/* Steps */}
          <div className="space-y-4 mb-12">
            {guide.steps.map((step, i) => (
              <div key={i} id={`step-${i + 1}`} className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 font-bold text-lg">
                    {i + 1}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-2">{step.name}</h2>
                    <p className="text-white/60 text-base leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          {guide.tips && guide.tips.length > 0 && (
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 md:p-8 mb-12">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" /> Pro Tips
              </h2>
              <ul className="space-y-3">
                {guide.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-5 mb-10">
            <p className="text-amber-400/80 text-sm leading-relaxed">
              <strong>Disclaimer:</strong> This guide is for informational purposes only. For medical decisions, always consult a qualified healthcare professional. GoDavaii&apos;s AI assistant can provide additional guidance in 16 Indian languages.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            <FAQAccordion items={guide.faqs} />
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-900/30 to-brand-800/20 border border-brand-500/10 p-8 mb-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Need more help?</h3>
            <p className="text-white/50 text-sm mb-4">Ask GoDavaii AI for step-by-step guidance in 16 Indian languages — completely free!</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/20">
              <Sparkles className="h-4 w-4" /> Ask GoDavaii AI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Other Guides */}
          {otherGuides.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6">More Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherGuides.map((g) => (
                  <Link key={g.slug} href={`/how-to/${g.slug}`} className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all">
                    <BookOpen className="h-5 w-5 text-brand-400 mb-2" />
                    <h3 className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">{g.heading}</h3>
                    <p className="text-white/40 text-xs mt-1">{g.steps.length} steps</p>
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
