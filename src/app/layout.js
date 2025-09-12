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
  themeColor: "#156b56",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "GoDavaii",
  title: {
    default: "GoDavaii — Fastest Medicine Delivery (Under 30 Minutes)",
    template: "%s | GoDavaii",
  },
  description:
    "Authentic medicines delivered in under 30 minutes from licensed local pharmacies. Upload prescription, live tracking, secure payments, 24×7 support.",
  keywords: [
    "GoDavaii",
    "medicine delivery",
    "pharmacy delivery",
    "prescription delivery",
    "fast medicine delivery",
    "24x7 pharmacy",
    "Noida medicine delivery",
    "medicines online near me",
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
    title: "GoDavaii — Fastest Medicine Delivery (Under 30 Minutes)",
    description:
      "Order from verified local pharmacies. Real-time tracking. 24×7 support. GoDavaii.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "GoDavaii" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoDavaii — Fastest Medicine Delivery (Under 30 Minutes)",
    description:
      "Authentic medicines delivered fast from licensed local pharmacies.",
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
              sameAs: [
                // Add socials when ready
              ],
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

        {/* Website schema + SearchAction */}
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
                target: `${SITE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Local business signals (Noida only) */}
        <Script
          id="ld-local"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GoDavaii",
              image: `${SITE_URL}${OG_IMAGE}`,
              url: SITE_URL,
              areaServed: ["Noida"],
              priceRange: "₹₹",
            }),
          }}
        />
      </body>
    </html>
  );
}
