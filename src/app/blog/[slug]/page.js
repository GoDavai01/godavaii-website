// app/blog/[slug]/page.js — Individual blog article page
import Link from "next/link";
import { getAllArticles, getArticleBySlug } from "@/data/blogIndex";
import { Sparkles, ArrowLeft, ArrowRight, Clock, Tag, BookOpen, Share2 } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const articles = getAllArticles();
  // Pre-generate first 100 articles at build; rest via ISR
  return articles.slice(0, 100).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Article Not Found | GoDavaii Blog", description: "This article could not be found." };
  }
  return {
    title: `${article.title} | GoDavaii Health Blog`,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      publishedTime: new Date().toISOString(),
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-brand-400 hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  // Get related articles (same category, max 6)
  const allArticles = getAllArticles();
  const related = allArticles
    .filter((a) => a.category === article.category && a.slug !== slug)
    .slice(0, 6);

  // Structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url: `https://www.godavaii.com/blog/${slug}`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { "@type": "Organization", name: "GoDavaii Health Team" },
    publisher: {
      "@type": "Organization",
      name: "GoDavaii",
      url: "https://www.godavaii.com",
    },
    mainEntityOfPage: `https://www.godavaii.com/blog/${slug}`,
    articleSection: article.category,
    keywords: (article.tags || []).join(", "),
  };

  const faqSchema = article.faqs && article.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.godavaii.com" },
      { "@type": "ListItem", position: 2, name: "Health Blog", item: "https://www.godavaii.com/blog" },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/blog" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <Sparkles className="h-5 w-5 text-brand-400" />
              <span className="font-bold">GoDavaii</span>
              <span className="text-white/30 text-sm ml-1">Blog</span>
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold hover:from-brand-500 hover:to-brand-400 transition-all"
            >
              Try GoDavaii AI
            </Link>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/60 truncate">{article.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium">
                {article.category}
              </span>
              <span className="text-white/30 text-sm flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">{article.metaDescription}</p>
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40 text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content Sections */}
          <div className="space-y-8 mb-12">
            {(article.sections || []).map((section, i) => (
              <section key={i} className="rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">{section.heading}</h2>
                <div className="text-white/60 text-base leading-relaxed whitespace-pre-line">{section.content}</div>
              </section>
            ))}
          </div>

          {/* Medical Disclaimer */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-5 mb-10">
            <p className="text-amber-400/80 text-sm leading-relaxed">
              <strong>Disclaimer:</strong> This article is for informational purposes only and should not be considered medical advice. Always consult a qualified healthcare professional before making any health decisions. Ask GoDavaii AI for personalized guidance.
            </p>
          </div>

          {/* FAQ */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
              <FAQAccordion items={article.faqs} />
            </div>
          )}

          {/* Ask AI CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-900/30 to-brand-800/20 border border-brand-500/10 p-8 mb-12 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Have more health questions?</h3>
            <p className="text-white/50 text-sm mb-4">Ask GoDavaii AI for instant, personalized health advice in 16 Indian languages</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 font-semibold hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/20"
            >
              <Sparkles className="h-4 w-4" /> Ask GoDavaii AI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all"
                  >
                    <span className="text-brand-400 text-xs font-medium">{r.category}</span>
                    <h3 className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors mt-1 line-clamp-2">
                      {r.title}
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
