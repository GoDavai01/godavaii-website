// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/** IMPORTANT: set this to your production domain */
const SITE_URL = "https://www.godavaii.com";
const OG_IMAGE = "/og-image.png"; // put this file in /public

export const viewport = {
  themeColor: "#156b56",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "GoDavaii",
  title: {
    default: "GoDavaii – India’s fastest hyperlocal medicine delivery (under 30 minutes)",
    template: "%s | GoDavaii",
  },
  description:
    "GoDavaii delivers medicines from trusted local pharmacies in under 30 minutes with real-time tracking and 24x7 support.",
  keywords: [
    "GoDavaii",
    "medicine delivery",
    "pharmacy delivery",
    "prescription delivery",
    "meds near me",
    "hyperlocal delivery",
    "fast medicine delivery",
    "24x7 pharmacy",
    "Noida medicine delivery",
    "Delhi medicine delivery",
    "Ghaziabad medicine delivery",
    "Gurugram medicine delivery",
    "India",
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
    siteName: "GoDavaii",
    title: "GoDavaii – Medicine delivery in under 30 minutes",
    description:
      "Order from verified local pharmacies. Real-time tracking. 24x7 support. GoDavaii.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "GoDavaii – Ultra-fast medicine delivery" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoDavaii – Medicine delivery in under 30 minutes",
    description:
      "Order from verified local pharmacies. Real-time tracking. 24x7 support.",
    images: [OG_IMAGE],
  },
  category: "Health",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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

        {/* Structured data – Organization */}
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
              logo: `${SITE_URL}/LOGO.png`,
              sameAs: [], // add social URLs if available
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "info@godavaii.com",
                  areaServed: "IN",
                  availableLanguage: ["en", "hi"],
                },
              ],
            }),
          }}
        />

        {/* Structured data – WebSite with SearchAction */}
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: SITE_URL,
              name: "GoDavaii",
              potentialAction: {
                "@type": "SearchAction",
                // keeping homepage target so you don't need to add a /search page right now
                target: `${SITE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured data – LocalBusiness (Pharmacy) */}
        <Script
          id="ld-local"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Pharmacy",
              name: "GoDavaii",
              image: `${SITE_URL}${OG_IMAGE}`,
              url: SITE_URL,
              telephone: "+91-0000000000",
              areaServed: ["Noida","Delhi","Ghaziabad","Gurugram","Lucknow"],
              openingHoursSpecification: [{
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              }],
              priceRange: "₹₹"
            }),
          }}
        />
      </body>
    </html>
  );
}
