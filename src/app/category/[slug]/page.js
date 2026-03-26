// app/category/[slug]/page.js — Category listing SEO page
import Link from "next/link";
import { fetchAllMedicines, extractCategories, filterByCategory, slugify } from "@/lib/api";
import CategoryClient from "./CategoryClient";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const medicines = await fetchAllMedicines();
  const categories = extractCategories(medicines);
  // Pre-generate top 30 categories at build time; rest use ISR on-demand
  return categories.slice(0, 30).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const medicines = await fetchAllMedicines();
  const categories = extractCategories(medicines);
  const cat = categories.find((c) => c.slug === slug);
  const rawName = cat?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  // Decode any URL encoding (%26 → &) and clean up
  const name = decodeURIComponent(rawName).replace(/%26/g, "&");
  return {
    title: `${name} Medicines — Buy Online, Fast Delivery | GoDavaii`,
    description: `Browse ${name} medicines online. Compare prices, find affordable generic alternatives & order with fast delivery from verified local pharmacies near you.`.slice(0, 160),
    alternates: { canonical: `/category/${slug}` },
    openGraph: {
      title: `${name} Medicines — Buy Online | GoDavaii`,
      description: `Shop ${name} medicines at best prices. Generic alternatives, verified pharmacies, fast delivery. Ask GoDavaii AI for free health advice.`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const allMedicines = await fetchAllMedicines();
  const categories = extractCategories(allMedicines);
  const cat = categories.find((c) => c.slug === slug);
  const rawName = cat?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  // Decode any URL encoding (%26 → &) and clean up
  const name = decodeURIComponent(rawName).replace(/%26/g, "&");

  // "all" shows everything
  const medicines = slug === "all" ? allMedicines : filterByCategory(allMedicines, slug);

  const faqs = [
    { q: `What are ${name} medicines?`, a: `${name} medicines are used to treat conditions related to ${name.toLowerCase()}. GoDavaii offers a wide selection from verified pharmacies at competitive prices.` },
    { q: `Can I order ${name} medicines online?`, a: `Yes, you can order ${name} medicines on GoDavaii with fast delivery from verified local pharmacies. Upload your prescription if required.` },
    { q: `How can I find cheaper ${name} medicines?`, a: `GoDavaii shows generic alternatives alongside branded medicines so you can compare prices and save. Use GoDavaii AI to ask about affordable options.` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.godavaii.com" },
      { "@type": "ListItem", position: 2, name: name },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${name} Medicines`,
    itemListElement: medicines.slice(0, 20).map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.name,
      url: `https://www.godavaii.com/medicine/${slugify(m.name)}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <CategoryClient
        name={name}
        slug={slug}
        medicines={medicines}
        categories={categories}
        faqs={faqs}
      />
    </>
  );
}
