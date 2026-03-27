// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/** Production site URL */
const SITE_URL = "https://www.godavaii.com";
/** Use an image that actually exists in /public */
const OG_IMAGE = "/og-cover.jpg";

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "GoDavaii AI",
  title: {
    default: "GoDavaii AI — Your AI Health Assistant in 16 Indian Languages",
    template: "%s | GoDavaii",
  },
  description:
    "AI-powered health assistant. Ask about symptoms, medicines, prescriptions, lab reports, X-rays in 16 Indian languages. Order medicines online with 30-min delivery from verified pharmacies.",
  keywords: [
    "GoDavaii",
    "GoDavaii AI",
    "AI health assistant India",
    "medical AI chatbot",
    "health chatbot Hindi",
    "symptom checker online free",
    "prescription analysis AI",
    "medicine delivery near me",
    "online pharmacy India",
    "order medicine online",
    "buy medicines online India",
    "lab test booking online",
    "doctor consultation online India",
    "Hindi health assistant",
    "Indian languages health AI",
    "medicine price comparison",
    "generic medicine alternatives India",
    "affordable medicines India",
    "30 minute medicine delivery",
    "medicine home delivery",
    "online medicine order India",
    "buy generic medicines online",
    "medicine delivery app India",
    "AI doctor consultation",
    "health AI assistant Hindi Tamil Telugu Bengali",
    "prescription upload medicine order",
    "cheapest medicine online India",
    "pharmacy near me delivery",
    "medicine discount online",
    "health advice AI free",
    "PharmEasy alternative",
    "1mg alternative",
    "Netmeds alternative",
    "best online pharmacy India",
    "best medicine delivery app India",
    "GoDavaii vs PharmEasy",
    "GoDavaii vs 1mg",
    "free AI doctor consultation",
    "generic medicine finder India",
    "medicine price comparison India",
    "drug interaction checker",
    "prescription upload app India",
    "lab report analysis AI",
    "X-ray analysis AI",
    "healthcare app India",
    "multilingual health assistant",
    "health AI Hindi Tamil Telugu Bengali",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "GoDavaii AI",
    title: "GoDavaii AI — Your AI Health Assistant in 16 Indian Languages",
    description:
      "AI-powered health assistant with voice support in Hindi, Tamil, Telugu, Bengali & more. Medicine delivery, doctor consultations, lab tests.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "GoDavaii AI — Healthcare Platform" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoDavaii AI — Your AI Health Assistant in 16 Indian Languages",
    description:
      "AI health assistant in 16 Indian languages. Medicine delivery, doctor consultations, lab tests.",
    images: [OG_IMAGE],
  },
  category: "Health",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  verification: {
    google: "PulJhXq93DCm0lPBjIyQtHBq-8hHHMOIjHxWL9wgi4k",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* Organization schema */}
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "MedicalBusiness"],
              name: "GoDavaii",
              url: SITE_URL,
              logo: `${SITE_URL}${OG_IMAGE}`,
              image: `${SITE_URL}${OG_IMAGE}`,
              description:
                "India's AI-powered healthcare platform. Buy medicines online at best prices, AI health assistant in 16 Indian languages, 30-minute medicine delivery from verified pharmacies.",
              sameAs: [],
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "20.5937",
                longitude: "78.9629",
              },
              areaServed: {
                "@type": "Country",
                name: "India",
              },
              priceRange: "₹",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "info@godavaii.com",
                  areaServed: "IN",
                  availableLanguage: [
                    "en", "hi", "bn", "ta", "te", "kn", "ml", "gu", "pa", "mr", "or", "ur",
                  ],
                },
              ],
            }),
          }}
        />

        {/* WebSite schema */}
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: SITE_URL,
              name: "GoDavaii AI",
              description: "AI-powered healthcare platform with medicine delivery, doctor consultations, and lab tests",
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/medicine/{search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* SoftwareApplication schema — GoDavaii AI */}
        <Script
          id="ld-app"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "GoDavaii AI",
              applicationCategory: "HealthApplication",
              operatingSystem: "Web, Android, iOS",
              description:
                "AI health assistant in 16 Indian languages. Analyze prescriptions, lab reports, X-rays. Check symptoms, find medicines, book doctors.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "500",
              },
            }),
          }}
        />

        {/* SpeakableSpecification — Voice Search Optimization */}
        <Script
          id="ld-speakable"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "GoDavaii AI — Your AI Health Assistant in 16 Indian Languages",
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1", "h2", ".speakable", "[data-speakable]"],
              },
              url: SITE_URL,
            }),
          }}
        />

        {/* MedicalOrganization schema — Enhanced medical authority */}
        <Script
          id="ld-medical-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              name: "GoDavaii",
              url: SITE_URL,
              logo: `${SITE_URL}${OG_IMAGE}`,
              description:
                "India's AI-powered healthcare platform providing medicine delivery, AI health assistant in 16 Indian languages, doctor consultations, and lab test booking across 603+ cities.",
              medicalSpecialty: [
                "GeneralPractice",
                "Pharmacy",
                "Dermatology",
                "Cardiology",
                "Endocrinology",
                "Gastroenterology",
                "Gynecology",
                "Neurology",
                "Ophthalmology",
                "Orthopedics",
                "Pediatrics",
                "Psychiatry",
                "Pulmonology",
              ],
              areaServed: {
                "@type": "Country",
                name: "India",
              },
              availableService: [
                {
                  "@type": "MedicalTherapy",
                  name: "AI Health Consultation",
                  description: "Free AI-powered health consultation in 16 Indian languages",
                },
                {
                  "@type": "MedicalTherapy",
                  name: "Online Medicine Delivery",
                  description: "30-minute medicine delivery from verified local pharmacies across 603+ Indian cities",
                },
                {
                  "@type": "MedicalTherapy",
                  name: "Doctor Video Consultation",
                  description: "Video and phone consultations with verified doctors",
                },
                {
                  "@type": "MedicalTherapy",
                  name: "Lab Test Booking",
                  description: "Online lab test booking with home sample collection",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "GoDavaii Healthcare Services",
                itemListElement: [
                  {
                    "@type": "OfferCatalog",
                    name: "Medicines",
                    numberOfItems: "4000+",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Health Condition Guides",
                    numberOfItems: "112+",
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Health Articles",
                    numberOfItems: "1000+",
                  },
                ],
              },
            }),
          }}
        />

        {/* VideoObject schema — Video content for AI search visibility */}
        <Script
          id="ld-video"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "How to Use GoDavaii AI Health Assistant",
              description:
                "Learn how to use GoDavaii's free AI health assistant to check symptoms, analyze prescriptions, read lab reports, and find affordable generic medicines in 16 Indian languages.",
              thumbnailUrl: `${SITE_URL}${OG_IMAGE}`,
              uploadDate: "2026-01-15T08:00:00+05:30",
              contentUrl: `${SITE_URL}/ai`,
              embedUrl: `${SITE_URL}/ai`,
              duration: "PT3M",
              publisher: {
                "@type": "Organization",
                name: "GoDavaii",
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}${OG_IMAGE}`,
                },
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
