// app/drug-interactions/[slug]/page.js — Drug interaction pages for AI search visibility
import Link from "next/link";
import { drugInteractions } from "@/data/drugInteractions";
import { Sparkles, ArrowRight, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Pill } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_URL = "https://www.godavaii.com";

export async function generateStaticParams() {
  return drugInteractions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const interaction = drugInteractions.find((d) => d.slug === slug);
  if (!interaction) return { title: "Drug Interaction | GoDavaii" };

  return {
    title: `${interaction.title} | GoDavaii`,
    description: interaction.metaDescription,
    alternates: { canonical: `/drug-interactions/${slug}` },
    openGraph: {
      title: interaction.title,
      description: interaction.metaDescription,
      type: "article",
    },
  };
}

function SeverityBadge({ severity }) {
  const config = {
    low: { bg: "bg-green-500/10 border-green-500/20 text-green-400", label: "Low Risk" },
    moderate: { bg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400", label: "Moderate Risk" },
    high: { bg: "bg-red-500/10 border-red-500/20 text-red-400", label: "High Risk" },
  };
  const c = config[severity] || config.low;
  return <span className={`px-3 py-1 rounded-full border text-xs font-medium ${c.bg}`}>{c.label}</span>;
}

export default async function DrugInteractionPage({ params }) {
  const { slug } = await params;
  const interaction = drugInteractions.find((d) => d.slug === slug);

  if (!interaction) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Interaction Not Found</h1>
          <Link href="/" className="text-brand-400 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const otherInteractions = drugInteractions.filter((d) => d.slug !== slug).slice(0, 4);

  // Structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: interaction.title,
    description: interaction.metaDescription,
    url: `${SITE_URL}/drug-interactions/${slug}`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    lastReviewed: new Date().toISOString(),
    author: { "@type": "Organization", name: "GoDavaii Health Team" },
    publisher: { "@type": "Organization", name: "GoDavaii", url: SITE_URL },
    about: {
      "@type": "MedicalCondition",
      name: `${interaction.drug1} and ${interaction.drug2} interaction`,
    },
    reviewedBy: { "@type": "Organization", name: "GoDavaii Health Team" },
    medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: interaction.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Drug Interactions", item: `${SITE_URL}/drug-interactions` },
      { "@type": "ListItem", position: 3, name: `${interaction.drug1} + ${interaction.drug2}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
            <span className="hover:text-white/60 transition-colors">Drug Interactions</span>
            <span>/</span>
            <span className="text-white/60">{interaction.drug1} + {interaction.drug2}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Pill className="h-6 w-6 text-brand-400" />
              <SeverityBadge severity={interaction.severity} />
              <span className="flex items-center gap-1 text-sm">
                {interaction.canTakeTogether ? (
                  <><CheckCircle className="h-4 w-4 text-green-400" /> <span className="text-green-400">Can take together (with caution)</span></>
                ) : (
                  <><XCircle className="h-4 w-4 text-red-400" /> <span className="text-red-400">Avoid combining</span></>
                )}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" data-speakable="true">
              {interaction.title}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed" data-speakable="true">{interaction.summary}</p>
            <div className="mt-4">
              <MedicalReviewBadge />
            </div>
          </header>

          {/* Quick Answer */}
          <div className={`rounded-2xl ${interaction.canTakeTogether ? "bg-green-500/5 border-green-500/10" : "bg-red-500/5 border-red-500/10"} border p-6 mb-10`}>
            <div className="flex items-start gap-3">
              {interaction.canTakeTogether ? (
                <CheckCircle className="h-6 w-6 text-green-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h2 className="font-semibold text-white mb-1">Quick Answer</h2>
                <p className={`text-sm ${interaction.canTakeTogether ? "text-green-400/80" : "text-red-400/80"}`}>
                  {interaction.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-6 mb-12">
            {interaction.details.map((section, i) => (
              <section key={i} className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 md:p-8">
                <h2 className="text-xl font-semibold text-white mb-3">{section.heading}</h2>
                <p className="text-white/60 text-base leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>

          {/* Medical Disclaimer */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-5 mb-10">
            <p className="text-amber-400/80 text-sm leading-relaxed">
              <strong>Important Medical Disclaimer:</strong> This drug interaction information is for educational purposes only. Always consult your doctor or pharmacist before combining medicines. Individual responses may vary based on health conditions, dosage, and other factors. GoDavaii&apos;s AI assistant can provide additional guidance in 16 Indian languages.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            <FAQAccordion items={interaction.faqs} />
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-900/30 to-brand-800/20 border border-brand-500/10 p-8 mb-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Check Any Drug Interaction</h3>
            <p className="text-white/50 text-sm mb-4">Ask GoDavaii AI about medicine interactions, dosage, and safety in 16 Indian languages — completely free!</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/20"
            >
              <Sparkles className="h-4 w-4" /> Ask GoDavaii AI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Other Interactions */}
          {otherInteractions.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6">More Drug Interactions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherInteractions.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/drug-interactions/${d.slug}`}
                    className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all"
                  >
                    <SeverityBadge severity={d.severity} />
                    <h3 className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors mt-2">
                      {d.drug1} + {d.drug2}
                    </h3>
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
