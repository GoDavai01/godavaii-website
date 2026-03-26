// app/medicine/[slug]/page.js — Individual medicine SEO page
import { fetchAllMedicines, fetchMedicineBySlug, fetchAlternatives, slugify } from "@/lib/api";
import { generateMedicineContent } from "@/lib/medicineContent";
import MedicineClient from "./MedicineClient";

export const revalidate = 86400; // 24h ISR
export const dynamicParams = true;

export async function generateStaticParams() {
  // Hardcode top medicines to avoid API timeout during Vercel build
  // All other 4000+ medicines use ISR (dynamicParams=true) — generated on first visit
  return [
    { slug: "paracetamol" },
    { slug: "paracip-500" },
    { slug: "dolo-650mg-tablets" },
    { slug: "cetirizine-10-mg" },
    { slug: "azee-500-tablet" },
    { slug: "ibuprofen-400-mg" },
    { slug: "omeprazole-20-mg" },
    { slug: "crocin-650-tablets" },
    { slug: "atorva-20-tablet" },
    { slug: "avil-injection" },
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const med = await fetchMedicineBySlug(slug);
  if (!med) {
    return { title: "Medicine Not Found | GoDavaii", description: "This medicine page is not available." };
  }
  const title = `${med.name} — Uses, Side Effects, Price${med.price ? ` ₹${med.price}` : ""} | GoDavaii`;
  const desc = `${med.name}${med.composition ? ` (${med.composition})` : ""} — uses, side effects, dosage${med.price ? `, price ₹${med.price}` : ""}. Order online with fast delivery from verified pharmacies. Ask GoDavaii AI for health advice.`;
  return {
    title: title.slice(0, 70),
    description: desc.slice(0, 160),
    alternates: { canonical: `/medicine/${slug}` },
    openGraph: {
      title,
      description: desc.slice(0, 160),
      type: "website",
      images: med.img ? [{ url: med.img, width: 400, height: 400, alt: med.name }] : [],
    },
  };
}

export default async function MedicinePage({ params }) {
  const { slug } = await params;
  const med = await fetchMedicineBySlug(slug);

  if (!med) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Medicine Not Found</h1>
          <a href="/" className="text-brand-400 hover:underline">Go back home</a>
        </div>
      </div>
    );
  }

  const alternatives = await fetchAlternatives(
    med.compositionKey || "",
    med.pharmacy?._id || med.pharmacy || ""
  );

  const categories = Array.isArray(med.category) ? med.category : [med.category || "Miscellaneous"];
  const primaryCategory = categories.find((c) => c !== "Miscellaneous") || categories[0];

  // Generate rich content
  const content = generateMedicineContent(med);

  // Structured data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: med.name,
    description: content.about.slice(0, 200),
    ...(med.img && { image: med.img }),
    brand: { "@type": "Brand", name: med.brand || med.company || "Generic" },
    category: primaryCategory,
    offers: {
      "@type": "Offer",
      price: med.price || 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "GoDavaii" },
    },
  };

  const drugSchema = {
    "@context": "https://schema.org",
    "@type": "Drug",
    name: med.name,
    ...(med.composition && { activeIngredient: med.composition }),
    prescriptionStatus: med.prescriptionRequired ? "PrescriptionOnly" : "OTC",
    ...(med.type && { administrationRoute: med.type }),
    description: content.about.slice(0, 300),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.godavaii.com" },
      { "@type": "ListItem", position: 2, name: primaryCategory, item: `https://www.godavaii.com/category/${slugify(primaryCategory)}` },
      { "@type": "ListItem", position: 3, name: med.name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(drugSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MedicineClient
        med={med}
        alternatives={alternatives}
        content={content}
        categorySlug={slugify(primaryCategory)}
        categoryName={primaryCategory}
      />
    </>
  );
}
