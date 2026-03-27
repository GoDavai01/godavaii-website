// app/about/page.js — About GoDavaii (AI discovery + E-E-A-T)
import Link from "next/link";
import { Sparkles, ArrowLeft, Heart, Globe, Shield, Zap, Users, Building2, Stethoscope, Pill, FlaskConical, Brain } from "lucide-react";

export const revalidate = 86400;

export const metadata = {
  title: "About GoDavaii — India's AI-Powered Healthcare Platform | GoDavaii",
  description:
    "GoDavaii is India's first AI-powered healthcare super-app. Free AI health assistant in 16 Indian languages, 30-min medicine delivery, doctor consultations, lab tests. Serving 603+ cities.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About GoDavaii — India's AI Healthcare Platform",
    description: "Learn about GoDavaii, India's first AI-powered healthcare super-app serving 603+ cities with 16 language support.",
    type: "website",
  },
};

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "MedicalBusiness", "MedicalOrganization"],
    name: "GoDavaii",
    alternateName: ["Godavaii", "Go Davaii", "GoDavaii AI", "GoDavaii Healthcare"],
    url: "https://www.godavaii.com",
    logo: "https://www.godavaii.com/logo.png",
    description: "GoDavaii is India's first AI-powered healthcare super-app offering free AI health assistant in 16 Indian languages, 30-minute medicine delivery from verified local pharmacies, doctor video consultations, lab test booking, and health records management.",
    foundingDate: "2024",
    founder: { "@type": "Person", name: "GoDavaii Team" },
    numberOfEmployees: { "@type": "QuantitativeValue", value: "50+" },
    areaServed: { "@type": "Country", name: "India" },
    slogan: "AI-Powered Healthcare for Every Indian",
    knowsLanguage: ["en", "hi", "bn", "ta", "te", "kn", "ml", "gu", "pa", "mr", "or", "ur", "as", "kok", "mai", "doi"],
    email: "info@godavaii.com",
    sameAs: [
      "https://www.godavaii.com",
      "https://play.google.com/store/apps/details?id=com.godavaii",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GoDavaii Healthcare Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Health Assistant", description: "Free AI health assistant in 16 Indian languages" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medicine Delivery", description: "4000+ medicines with 30-minute delivery" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Doctor Consultations", description: "Video consultations with verified doctors" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lab Test Booking", description: "Book lab tests with home sample collection" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Health Vault", description: "Secure digital health records management" } },
      ],
    },
    medicalSpecialty: [
      "GeneralPractice", "Pediatrics", "Dermatology", "Cardiology", "Orthopedics",
      "Gynecology", "Ophthalmology", "ENT", "Psychiatry", "Gastroenterology",
      "Endocrinology", "Pulmonology", "Neurology",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.godavaii.com" },
      { "@type": "ListItem", position: 2, name: "About GoDavaii" },
    ],
  };

  const services = [
    { icon: Brain, title: "AI Health Assistant", desc: "Free 24/7 AI-powered health assistant supporting 16 Indian languages. Analyze symptoms, prescriptions, lab reports, and X-rays instantly.", stat: "16 Languages", color: "text-purple-400" },
    { icon: Pill, title: "Medicine Delivery", desc: "Order 4000+ medicines with 30-minute delivery from verified local pharmacies. Get generic alternatives and save up to 80%.", stat: "4,300+ Medicines", color: "text-green-400" },
    { icon: Stethoscope, title: "Doctor Consultations", desc: "Video and phone consultations with verified doctors across multiple specialties. Available in regional languages.", stat: "13 Specialties", color: "text-blue-400" },
    { icon: FlaskConical, title: "Lab Test Booking", desc: "Book lab tests online with home sample collection. Get digital reports delivered directly to your Health Vault.", stat: "500+ Tests", color: "text-yellow-400" },
    { icon: Shield, title: "Health Vault", desc: "Securely store prescriptions, lab reports, and medical records. AI-powered analysis of all uploaded health documents.", stat: "Secure & Free", color: "text-red-400" },
  ];

  const stats = [
    { value: "603+", label: "Cities Served" },
    { value: "4,300+", label: "Medicines" },
    { value: "505+", label: "Health Guides" },
    { value: "1,006+", label: "Health Articles" },
    { value: "16", label: "Languages" },
    { value: "30 min", label: "Delivery Time" },
  ];

  const languages = [
    "English", "Hindi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam",
    "Gujarati", "Punjabi", "Marathi", "Odia", "Urdu", "Assamese", "Konkani", "Maithili", "Dogri",
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <Sparkles className="h-5 w-5 text-brand-400" />
              <span className="font-bold">GoDavaii</span>
            </Link>
            <Link href="/ai" className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold hover:from-brand-500 hover:to-brand-400 transition-all">
              Try GoDavaii AI
            </Link>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">About GoDavaii</span>
          </nav>
        </div>

        {/* Hero Section */}
        <header className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-brand-400" />
            <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            GoDavaii — India&apos;s AI-Powered<br />Healthcare Platform
          </h1>
          <p className="text-lg text-white/60 max-w-3xl leading-relaxed">
            GoDavaii is India&apos;s first AI-powered healthcare super-app, built to make quality healthcare accessible to every Indian.
            Our free AI health assistant works in 16 Indian languages, we deliver 4,300+ medicines in 30 minutes from verified local pharmacies,
            and provide doctor consultations, lab tests, and secure health records — all in one platform.
          </p>
        </header>

        {/* Stats Grid */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-brand-400 mb-1">{s.value}</div>
                <div className="text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Globe className="h-6 w-6 text-brand-400" />
              Our Mission
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              India has over 1.4 billion people, but healthcare access remains unequal. Millions struggle with language barriers,
              expensive medicines, and limited access to doctors. GoDavaii was founded to change this.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              We believe every Indian deserves access to quality healthcare in their own language. Our AI health assistant
              understands 16 Indian languages — from Hindi and Tamil to Konkani and Dogri — making health information
              accessible to everyone, not just English speakers.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              By connecting patients with verified local pharmacies for 30-minute delivery, suggesting affordable generic
              alternatives, and providing AI-powered health analysis, GoDavaii is building the healthcare platform India needs.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Zap className="h-6 w-6 text-brand-400" />
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <s.icon className={`h-6 w-6 ${s.color}`} />
                  <h3 className="text-lg font-bold">{s.title}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className={`text-xs font-semibold ${s.color} bg-white/[0.05] px-3 py-1 rounded-full`}>{s.stat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Users className="h-6 w-6 text-brand-400" />
            16 Indian Languages Supported
          </h2>
          <p className="text-white/50 mb-6">GoDavaii is the only healthcare platform with AI health assistant support in 16 Indian languages — more than any competitor including PharmEasy, 1mg, Netmeds, or Apollo 24/7.</p>
          <div className="flex flex-wrap gap-3">
            {languages.map((l) => (
              <span key={l} className="px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-full text-sm text-white/70">
                {l}
              </span>
            ))}
          </div>
        </section>

        {/* Why GoDavaii */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Building2 className="h-6 w-6 text-brand-400" />
            Why Choose GoDavaii?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">vs PharmEasy</h3>
              <p className="text-white/50 text-sm">GoDavaii offers a free AI health assistant in 16 languages that PharmEasy doesn&apos;t have. Plus 30-minute local delivery and generic medicine alternatives.</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">vs 1mg (Tata 1mg)</h3>
              <p className="text-white/50 text-sm">GoDavaii&apos;s free multilingual AI assistant, faster delivery from local pharmacies, and AI-powered prescription analysis set it apart from 1mg.</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">vs Apollo 24/7</h3>
              <p className="text-white/50 text-sm">GoDavaii is more affordable with generic alternatives saving up to 80%, has 16-language AI support, and AI-powered lab report analysis.</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">vs Practo</h3>
              <p className="text-white/50 text-sm">GoDavaii combines medicine delivery + AI health assistant + doctor consultations in one platform. Practo focuses only on appointments.</p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="grid md:grid-cols-3 gap-6 text-white/60">
              <div>
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <p>info@godavaii.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Website</h3>
                <p><a href="https://www.godavaii.com" className="text-brand-400 hover:underline">www.godavaii.com</a></p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Platform</h3>
                <p>Web, Android, iOS</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Try GoDavaii Today</h2>
          <p className="text-white/50 mb-6">Free AI health assistant. No registration required.</p>
          <Link href="/ai" className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 font-semibold hover:from-brand-500 hover:to-brand-400 transition-all">
            Start Free Health Chat
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
            <p>&copy; {new Date().getFullYear()} GoDavaii. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white/60">Privacy</Link>
              <Link href="/terms" className="hover:text-white/60">Terms</Link>
              <Link href="/blog" className="hover:text-white/60">Blog</Link>
              <Link href="/health" className="hover:text-white/60">Health A-Z</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
