// app/medicine-delivery/[city]/page.js
import { notFound } from "next/navigation";

const featuredCities = ["noida"];               // ← only Noida
export const dynamicParams = true;
export const revalidate = 86400;

const titleize = (s) =>
  String(s || "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function generateStaticParams() {
  return featuredCities.map((city) => ({ city }));
}

export function generateMetadata({ params }) {
  const city = params.city?.toLowerCase();
  if (!featuredCities.includes(city)) notFound();       // ← strict guard

  const cityName = titleize(city);
  const canonical = `/medicine-delivery/${city}`;

  // Pre-launch (onboarding) copy for Noida
  const title = `GoDavaii in ${cityName} | Partner Pharmacy Onboarding`;
  const description = `GoDavaii is building its hyperlocal medicine delivery network in ${cityName}. We are currently onboarding licensed partner pharmacies to prepare for consumer launch.`;

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
  if (!featuredCities.includes(city)) notFound();       // ← strict guard

  const cityName = titleize(city);

  const ldService = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Medicine Delivery",
    name: `GoDavaii – Medicine Delivery in ${cityName}`,
    areaServed: { "@type": "City", name: cityName, address: { "@type": "PostalAddress", addressCountry: "IN" } },
    provider: { "@type": "Organization", name: "GoDavaii", url: "https://www.godavaii.com", logo: "https://www.godavaii.com/LOGO.png" },
    url: `https://www.godavaii.com/medicine-delivery/${city}`,
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-800 mb-4">
        GoDavaii – Medicine Delivery in {cityName}
      </h1>

      <div className="mb-4 rounded-xl px-4 py-3 bg-brand-50 border border-brand-200 text-brand-900">
        <b>Status:</b> We are <b>currently onboarding licensed partner pharmacies</b> in {cityName} to
        prepare our hyperlocal network. Consumer services will begin after the partner network is ready.
      </div>

      <p className="text-neutral-700 mb-6">
        <b>Pharmacy owners in {cityName}</b>: join our partner network now for early access, zero listing
        fees during launch, and priority placement when we go live.
      </p>

      <a href="/#partner-pharmacy" className="underline text-brand-700 font-semibold">
        Register your pharmacy
      </a>{" "}
      or{" "}
      <a href="/#about" className="underline text-brand-700 font-semibold">
        learn more about GoDavaii
      </a>.

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldService) }} />
    </main>
  );
}
