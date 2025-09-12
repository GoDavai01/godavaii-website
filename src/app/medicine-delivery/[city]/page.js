// app/medicine-delivery/[city]/page.js
import { notFound } from "next/navigation";

const featuredCities = ["noida"];          // only Noida
export const dynamicParams = true;
export const revalidate = 86400;

const titleize = (s) =>
  String(s || "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function generateStaticParams() {
  return featuredCities.map((city) => ({ city }));
}

export function generateMetadata({ params }) {
  const city = params.city?.toLowerCase();
  if (!featuredCities.includes(city)) notFound();

  const cityName = titleize(city);
  const canonical = `/medicine-delivery/${city}`;

  const title = `GoDavaii in ${cityName} | Partner Pharmacy Onboarding`;
  const description =
    `GoDavaii is building its hyperlocal medicine delivery network in ${cityName}. ` +
    `We are currently onboarding licensed partner pharmacies to prepare for consumer launch.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default function CityPage({ params }) {
  const city = params.city?.toLowerCase();
  if (!featuredCities.includes(city)) notFound();
  const cityName = titleize(city);

  const ldService = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Medicine Delivery",
    name: `GoDavaii – Medicine Delivery in ${cityName}`,
    areaServed: {
      "@type": "City",
      name: cityName,
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
    provider: {
      "@type": "Organization",
      name: "GoDavaii",
      url: "https://www.godavaii.com",
      logo: "https://www.godavaii.com/LOGO.png",
    },
    url: `https://www.godavaii.com/medicine-delivery/${city}`,
  };

  return (
    <main className="relative overflow-hidden">
      {/* background flair */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(21,107,86,.14),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 to-white" />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200 text-brand-800 px-3 py-1 text-xs font-semibold">
            🏙️ {cityName}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 text-xs font-semibold">
            Onboarding now
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-900">
          GoDavaii – Medicine Delivery in {cityName}
        </h1>

        <div className="mt-5 rounded-2xl border border-brand-200 bg-white/80 backdrop-blur p-5 shadow-sm">
          <p className="text-brand-900">
            <b>Status:</b> We are <b>currently onboarding licensed partner pharmacies</b> in {cityName} to
            prepare our hyperlocal network. Consumer services will begin after the partner network is ready.
          </p>
        </div>

        <p className="mt-6 text-neutral-700 max-w-2xl">
          <b>Pharmacy owners in {cityName}</b>: join our partner network now for early access, zero listing fees during
          launch, and priority placement when we go live.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a href="/#partner-pharmacy">
            <button className="btn-pill bg-brand-700 hover:bg-brand-800 text-white px-6 py-3 shadow-lg">
              Register your pharmacy
            </button>
          </a>
          <a href="/#about">
            <button className="btn-pill border-2 border-brand-300 text-brand-800 px-6 py-3 bg-white hover:bg-brand-50">
              Learn more
            </button>
          </a>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-5xl mx-auto px-4 pb-8 md:pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            ["📦 Seamless orders", "Digital Rx upload, safe substitutions, verified stock"],
            ["🚀 Under-30-min goal", "Smart batching and dense hyperlocal routing"],
            ["💳 Payouts you trust", "Transparent ledgers & GST invoices"],
            ["🧾 Compliance-first", "Schedule H/H1 only against valid prescription"],
            ["🔔 Live tracking", "Customer & partner notifications at every step"],
            ["⭐ Priority placement", "Founding partners get promoted badges at launch"],
          ].map(([title, sub], i) => (
            <div
              key={i}
              className="rounded-2xl border border-brand-100 bg-white/90 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-brand-900">{title}</div>
              <div className="text-neutral-700 text-sm mt-1">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* mini FAQ / assurance */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="rounded-3xl border border-brand-100 bg-brand-50/60 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-brand-900 mb-4">What we promise</h2>
          <ul className="grid sm:grid-cols-2 gap-y-2 text-neutral-700">
            <li>• Authentic medicines from licensed partners</li>
            <li>• Pharmacist-checked orders</li>
            <li>• Secure payments & digital receipts</li>
            <li>• Privacy-first handling of health data</li>
          </ul>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldService) }}
      />
    </main>
  );
}
