// app/medicine/[slug]/page.js — Individual medicine SEO page
import { fetchAllMedicines, fetchMedicineBySlug, fetchAlternatives, slugify } from "@/lib/api";
import MedicineClient from "./MedicineClient";

export const revalidate = 86400; // 24h ISR
export const dynamicParams = true;

export async function generateStaticParams() {
  const medicines = await fetchAllMedicines();
  // Pre-generate top 50 medicines at build time; remaining 3700+ use ISR on-demand (dynamicParams=true)
  // ALL medicines are in the sitemap — Google discovers and crawls them all
  const seen = new Set();
  const params = [];
  for (const m of medicines) {
    const s = slugify(m.name);
    if (s && !seen.has(s)) {
      seen.add(s);
      params.push({ slug: s });
    }
    if (params.length >= 50) break;
  }
  return params;
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

  // Build FAQs
  const faqs = [
    { q: `What is ${med.name} used for?`, a: med.description || `${med.name} is a ${med.type || "medicine"} containing ${med.composition || "active ingredients"}. Consult your doctor or ask GoDavaii AI for detailed usage information.` },
    { q: `What are the side effects of ${med.name}?`, a: `Side effects may vary per individual. Common side effects depend on the active ingredient${med.composition ? ` (${med.composition})` : ""}. Ask GoDavaii AI or consult your doctor for personalized advice.` },
    { q: `What is the price of ${med.name}?`, a: med.price ? `${med.name} is available at ₹${med.price}${med.mrp && med.mrp > med.price ? ` (MRP ₹${med.mrp}, save ${Math.round(((med.mrp - med.price) / med.mrp) * 100)}%)` : ""}. Prices may vary by pharmacy. Order on GoDavaii for the best prices.` : `Check the latest price on GoDavaii app.` },
    { q: `Is ${med.name} available without prescription?`, a: med.prescriptionRequired ? `No, ${med.name} requires a valid prescription. Upload your prescription on GoDavaii to order.` : `${med.name} is available without a prescription. You can order it directly on GoDavaii.` },
  ];

  // Structured data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: med.name,
    description: med.description || `${med.name} - ${med.composition || med.type || "medicine"}`,
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
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
      <MedicineClient med={med} alternatives={alternatives} faqs={faqs} categorySlug={slugify(primaryCategory)} categoryName={primaryCategory} />
    </>
  );
}
