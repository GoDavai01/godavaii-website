// app/medicine-delivery/[city]/page.js
import { notFound } from "next/navigation";

// Keep in sync with sitemap.js
const featuredCities = ["noida", "delhi", "ghaziabad", "gurugram", "lucknow", "aligarh"];

export const dynamicParams = true;

// Use a LITERAL for Next.js static analyzer (86400s = 24h)
export const revalidate = 86400;

const titleize = (s) =>
  String(s || "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function generateStaticParams() {
  return featuredCities.map((city) => ({ city }));
}

export function generateMetadata({ params }) {
  const city = params.city?.toLowerCase();
  const cityName = titleize(city);
  const canonical = `/medicine-delivery/${city}`;

  const title = `Medicine Delivery in ${cityName} (Under 30 Minutes) | GoDavaii`;
  const description = `Order authentic medicines fast in ${cityName}. Hyperlocal delivery in under 30 minutes from licensed pharmacies with live tracking and 24x7 support.`;

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
  const cityName = titleize(city);

  // Optional strict guard
  // if (!featuredCities.includes(city)) return notFound();

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
        Medicine Delivery in {cityName} – Under 30 Minutes
      </h1>

      <p className="text-neutral-700 mb-6">
        GoDavaii connects you to verified local pharmacies in {cityName}. Order OTC items or upload your prescription;
        Schedule H/H1 medicines are dispensed only against a valid Rx. Live tracking, secure payments, 24x7 support.
      </p>

      <ul className="list-disc list-inside text-neutral-800 space-y-2 mb-8">
        <li>Authentic medicines from licensed partners</li>
        <li>Average delivery time under 30 minutes</li>
        <li>Pharmacist-checked orders and safe substitutions</li>
      </ul>

      <a href="/#download" className="underline text-brand-700 font-semibold">Download the app</a>{" "}
      or{" "}
      <a href="/#partner-pharmacy" className="underline text-brand-700 font-semibold">Become a pharmacy partner</a>.

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldService) }} />
    </main>
  );
}
