// app/blog/page.js — Blog listing page
import Link from "next/link";
import { getAllArticles, getAllCategories } from "@/data/blogIndex";
import { Sparkles, ArrowLeft, ArrowRight, Clock, Tag, BookOpen } from "lucide-react";

export const revalidate = 86400;

export const metadata = {
  title: "Health Blog — Expert Health Articles, Tips & Medicine Guides | GoDavaii",
  description:
    "Read 1000+ expert health articles on medicines, diseases, nutrition, fitness, mental health, home remedies, and more. Trusted health information by GoDavaii AI in simple language.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Health Blog — Expert Health Articles & Tips | GoDavaii",
    description: "1000+ health articles covering medicines, diseases, nutrition, fitness, mental health, and more.",
    type: "website",
  },
};

export default function BlogListingPage() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  // Structured data
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "GoDavaii Health Blog",
    description: "Expert health articles, medicine guides, and wellness tips",
    url: "https://www.godavaii.com/blog",
    publisher: {
      "@type": "Organization",
      name: "GoDavaii",
      url: "https://www.godavaii.com",
    },
    blogPost: articles.slice(0, 50).map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.metaDescription,
      url: `https://www.godavaii.com/blog/${a.slug}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.godavaii.com" },
      { "@type": "ListItem", position: 2, name: "Health Blog" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <Sparkles className="h-5 w-5 text-brand-400" />
              <span className="font-bold">GoDavaii</span>
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold hover:from-brand-500 hover:to-brand-400 transition-all"
            >
              Try GoDavaii AI
            </Link>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Health Blog</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Health Blog</span>
            </h1>
            <p className="text-white/50 mt-4 text-lg max-w-2xl mx-auto">
              {articles.length.toLocaleString()}+ expert articles on medicines, health conditions, nutrition, fitness, and wellness
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <span
                key={cat.slug}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 text-sm hover:bg-white/[0.08] hover:text-white/70 transition-all"
              >
                <Tag className="h-3 w-3" />
                {cat.name}
                <span className="text-white/30 text-xs">({cat.count})</span>
              </span>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-xl bg-white/[0.03] border border-white/[0.06] p-6 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="text-white/30 text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-white group-hover:text-brand-300 transition-colors mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-white/40 text-sm line-clamp-2">{article.metaDescription}</p>
                <div className="flex items-center gap-1 mt-4 text-brand-400 text-sm font-medium group-hover:text-brand-300 transition-colors">
                  Read Article <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] px-4 py-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
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
      </div>
    </>
  );
}
