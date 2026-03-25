// app/medicine-delivery/[city]/page.js — Enhanced city page with dark theme + SEO
import Link from "next/link";
import { Sparkles, Clock, Pill, ShieldCheck, Stethoscope, ArrowRight, MapPin } from "lucide-react";
import { cities as allCitiesData } from "@/data/cities";

export const dynamicParams = true;
export const revalidate = 86400;

const titleize = (s) =>
  String(s || "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function generateStaticParams() {
  // Pre-build top 50 cities; rest via ISR
  return allCitiesData.slice(0, 50).map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const cityData = allCitiesData.find((c) => c.slug === city);
  const cityName = cityData?.name || titleize(city);
  const stateName = cityData?.state || "";
  const canonical = `/medicine-delivery/${city}`;

  const title = `Medicine Delivery in ${cityName}${stateName ? `, ${stateName}` : ""} — Under 30 Minutes | GoDavaii`;
  const description =
    `Order medicines online in ${cityName}${stateName ? `, ${stateName}` : ""} with fast delivery from verified local pharmacies. ` +
    `AI health assistant in 16 languages. Prescription upload, real-time tracking, 24x7 support.`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical },
    openGraph: { title, description: description.slice(0, 160), url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title, description: description.slice(0, 160) },
  };
}

export default async function CityPage({ params }) {
  const { city } = await params;
  const cityData = allCitiesData.find((c) => c.slug === city);
  const cityName = cityData?.name || titleize(city);
  const stateName = cityData?.state || "";

  const faqs = [
    { q: `How fast is medicine delivery in ${cityName}?`, a: `GoDavaii partners with verified local pharmacies in ${cityName} to deliver medicines in under 30 minutes. Real-time tracking is available for every order.` },
    { q: `Can I order medicines online in ${cityName}?`, a: `Yes, GoDavaii offers online medicine ordering in ${cityName} from licensed, verified pharmacies. Simply upload your prescription or search for medicines.` },
    { q: `Is GoDavaii AI available in ${cityName}?`, a: `Yes, GoDavaii AI is available everywhere in India, including ${cityName}. Get health advice in 16 Indian languages, analyze prescriptions, and more.` },
    { q: `Do I need a prescription to order medicines in ${cityName}?`, a: `Some medicines require a valid prescription. You can upload your prescription on the GoDavaii app. OTC medicines can be ordered without a prescription.` },
  ];

  const ldService = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Medicine Delivery",
    name: `GoDavaii — Medicine Delivery in ${cityName}`,
    description: `Fast medicine delivery from verified pharmacies in ${cityName}. AI-powered health platform.`,
    areaServed: { "@type": "City", name: cityName, address: { "@type": "PostalAddress", addressCountry: "IN" } },
    provider: { "@type": "Organization", name: "GoDavaii", url: "https://www.godavaii.com" },
    url: `https://www.godavaii.com/medicine-delivery/${city}`,
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
      { "@type": "ListItem", position: 2, name: `Medicine Delivery in ${cityName}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-400" />
            <span className="font-bold">GoDavaii</span>
          </Link>
          <a
            href="https://app.godavaii.com"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold"
          >
            Order Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 md:px-8 py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-700/15 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-500/10 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white/60">Home</Link>
            <span>/</span>
            <span className="text-white/60">Medicine Delivery in {cityName}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] mb-6 text-sm text-white/60">
            <MapPin className="h-4 w-4 text-brand-400" /> {cityName}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            <span className="gradient-text">Medicine Delivery</span>
            <br />
            <span className="text-white">in {cityName}</span>
          </h1>

          <p className="text-white/50 text-lg max-w-2xl mb-8">
            Order from verified local pharmacies with fast delivery. AI-powered health assistant available in 16 Indian languages.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://app.godavaii.com/medicines"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 font-semibold shadow-lg shadow-brand-500/20"
            >
              <Pill className="h-4 w-4" /> Order Medicines
            </a>
            <a
              href="https://app.godavaii.com/ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/70 font-medium hover:bg-white/[0.08] transition-all"
            >
              <Sparkles className="h-4 w-4 text-brand-400" /> Try GoDavaii AI
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Clock, title: "Under 30 Minutes", desc: "Fast delivery from pharmacies near you" },
            { icon: ShieldCheck, title: "Verified Pharmacies", desc: "All partner pharmacies are licensed and verified" },
            { icon: Pill, title: "Thousands of Medicines", desc: "Branded and affordable generic alternatives" },
            { icon: Sparkles, title: "AI Health Assistant", desc: "Get health advice in 16 Indian languages" },
            { icon: Stethoscope, title: "Doctor Consultations", desc: "Video and phone consultations available" },
            { icon: MapPin, title: `Available in ${cityName}`, desc: "Hyperlocal delivery from pharmacies near you" },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.06] transition-all">
              <Icon className="h-7 w-7 text-brand-400 mb-3" />
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              <p className="text-white/50 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <summary className="flex items-center justify-between p-5 cursor-pointer text-white/90 font-medium">
                {faq.q}
                <span className="text-brand-400 ml-2 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Nearby cities (same state) */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-16">
        <h2 className="text-xl font-semibold text-white mb-4">
          {stateName ? `More Cities in ${stateName}` : "Available in More Cities"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {allCitiesData
            .filter((c) => stateName ? c.state === stateName : true)
            .slice(0, 30)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/medicine-delivery/${c.slug}`}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  c.slug === city
                    ? "bg-brand-500/20 border border-brand-500/30 text-brand-300"
                    : "bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white/70"
                }`}
              >
                {c.name}
              </Link>
            ))}
        </div>
      </section>

      {/* Major cities across India */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-16">
        <h2 className="text-xl font-semibold text-white mb-4">Medicine Delivery Across India</h2>
        <div className="flex flex-wrap gap-2">
          {allCitiesData
            .filter((c) => c.state !== stateName)
            .slice(0, 20)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/medicine-delivery/${c.slug}`}
                className="px-4 py-2 rounded-full text-sm bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white/70 transition-all"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
