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
    "AI health assistant",
    "medical AI",
    "health chatbot",
    "symptom checker",
    "prescription analysis",
    "medicine delivery",
    "pharmacy delivery",
    "online medicine order",
    "lab test booking",
    "doctor consultation online",
    "Hindi health assistant",
    "Indian languages health AI",
    "medicine price check",
    "generic medicine alternatives",
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
  alternates: { canonical: "/" },
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
              "@type": "Organization",
              name: "GoDavaii",
              url: SITE_URL,
              logo: `${SITE_URL}${OG_IMAGE}`,
              description:
                "India's AI-powered healthcare platform. AI health assistant, medicine delivery, doctor consultations, and lab tests in 16 Indian languages.",
              sameAs: [],
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
      </body>
    </html>
  );
}
