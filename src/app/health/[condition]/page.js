// app/health/[condition]/page.js — Health condition SEO page
import Link from "next/link";
import { conditions } from "@/data/conditions";
import ConditionClient from "./ConditionClient";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  return conditions.map((c) => ({ condition: c.slug }));
}

export async function generateMetadata({ params }) {
  const { condition } = await params;
  const cond = conditions.find((c) => c.slug === condition);
  if (!cond) return { title: "Health Topic | GoDavaii" };

  return {
    title: `${cond.name} — Symptoms, Medicines & AI Health Advice | GoDavaii`,
    description: `${cond.description} Find medicines, book doctors, and get instant AI health advice for ${cond.name.toLowerCase()} in 16 Indian languages.`.slice(0, 160),
    alternates: { canonical: `/health/${condition}` },
    openGraph: {
      title: `${cond.name} — Health Guide | GoDavaii`,
      description: cond.description.slice(0, 160),
      type: "article",
    },
  };
}

export default async function HealthConditionPage({ params }) {
  const { condition } = await params;
  const cond = conditions.find((c) => c.slug === condition);

  if (!cond) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Health Topic Not Found</h1>
          <a href="/" className="text-brand-400 hover:underline">Go back home</a>
        </div>
      </div>
    );
  }

  // Related conditions
  const related = conditions
    .filter((c) => c.slug !== condition)
    .filter((c) => c.relatedCategories.some((rc) => cond.relatedCategories.includes(rc)))
    .slice(0, 4);

  // FAQs
  const faqs = [
    { q: `What are the symptoms of ${cond.name}?`, a: `Common symptoms of ${cond.name.toLowerCase()} include ${cond.symptoms.slice(0, 4).join(", ").toLowerCase()}. If you experience these, consider using GoDavaii AI for personalized guidance.` },
    { q: `What medicines are used for ${cond.name}?`, a: `Various medicines are available for ${cond.name.toLowerCase()} management. Browse our ${cond.relatedCategories[0] || "medicine"} section or ask GoDavaii AI for information about treatment options.` },
    { q: `Can AI help with ${cond.name}?`, a: `Yes, GoDavaii AI can help you understand ${cond.name.toLowerCase()} symptoms, find relevant medicines, analyze your lab reports, and provide health guidance in 16 Indian languages. Always consult a doctor for medical decisions.` },
    { q: `When should I see a doctor for ${cond.name}?`, a: `Consult a doctor if your symptoms are severe, persistent, or worsening. GoDavaii connects you with verified doctors for video and phone consultations.` },
  ];

  // Structured data
  const conditionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: cond.name,
    description: cond.description,
    signOrSymptom: cond.symptoms.map((s) => ({ "@type": "MedicalSignOrSymptom", name: s })),
    ...(cond.relatedLabTests.length > 0 && {
      typicalTest: cond.relatedLabTests.map((t) => ({ "@type": "MedicalTest", name: t })),
    }),
  };

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
      { "@type": "ListItem", position: 2, name: "Health", item: "https://www.godavaii.com/health" },
      { "@type": "ListItem", position: 3, name: cond.name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(conditionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ConditionClient cond={cond} related={related} faqs={faqs} />
    </>
  );
}
