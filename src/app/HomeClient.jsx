// app/HomeClient.jsx
"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ShoppingCart, Clock3, Building2, Radar } from "lucide-react";
import Script from "next/script";
import Link from "next/link";

// ---- LAUNCH METRICS (edit these when you have real numbers) ----
const LAUNCH_METRICS = {
  ordersDelivered: 0, // set real count when live
  partnerPharmacies: 10, // you have 10 onboarded
  avgDeliveryMins: null, // set like 27 when you have data
  statusNote: "Pre-launch (Noida)",
};

// Use string paths from /public to avoid sharp requirement during build
const screenshots = [
  { src: "/LOGO.png", alt: "GoDavaii logo" },
  { src: "/MEDICINES.png", alt: "Medicine ordering screen" },
  { src: "/HOME.png", alt: "GoDavaii home screen" },
];

const testimonials = [
  { q: "Got my dad’s medicines in 18 minutes. Calm, seamless experience.", a: "— Priya S." },
  { q: "The pharmacist suggested a safer alternative. Felt genuinely cared for.", a: "— Kiran M." },
  { q: "Clean app, clear pricing, verified stores. Exactly what I wanted.", a: "— Arjun R." },
  { q: "Superfast delivery and the rider was extremely professional.", a: "— Neha V." },
  { q: "Reliable at midnight when it mattered the most for our family.", a: "— Rohit P." },
  { q: "Simple Rx upload and smooth tracking. No chaos, just clarity.", a: "— Zainab H." },
];

const cities = [{ name: "Noida", slug: "noida" }];

export default function HomeClient() {
  const [screenshot, setScreenshot] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [year, setYear] = useState("");
  const [touchStartX, setTouchStartX] = useState(null);
  const [slide, setSlide] = useState(0);
  const autoplayRef = useRef(null);
  const [asOf, setAsOf] = useState("");

  useEffect(() => setYear(new Date().getFullYear().toString()), []);
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(autoplayRef.current);
  }, []);

  useEffect(() => {
    setAsOf(
      new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }, []);

  return (
    <div className="min-h-screen w-full font-sans overflow-x-hidden relative bg-brand-50">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-brand-900/95 text-white shadow-lg border-b border-brand-800 backdrop-blur supports-[backdrop-filter]:bg-brand-900/80 flex justify-between items-center px-4 md:px-16 py-3 transition-all">
        <a href="#" className="flex items-center gap-2 select-none">
          <span className="text-2xl font-extrabold tracking-tight">GoDavaii</span>
          <span className="hidden md:inline-flex items-center gap-2 text-[11px] font-medium text-brand-100/80 border-l border-white/20 pl-3 uppercase tracking-[0.16em]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
            30-minute medicine delivery
          </span>
        </a>
        <div className="hidden md:flex gap-8 font-medium text-sm tracking-wide">
          <a href="#features" className="hover:opacity-80 transition">
            Features
          </a>
          <a href="#how-it-works" className="hover:opacity-80 transition">
            How it works
          </a>
          <a href="#app-preview" className="hover:opacity-80 transition">
            App Preview
          </a>
          <a href="#partner-pharmacy" className="hover:opacity-80 transition">
            Partners
          </a>
          <a href="#download" className="hover:opacity-80 transition">
            Download
          </a>
          <a href="#about" className="hover:opacity-80 transition">
            About
          </a>
          <a href="#contact" className="hover:opacity-80 transition">
            Contact
          </a>
        </div>
        <a href="#download" className="hidden md:block">
          <Button className="btn-pill bg-brand-50/10 hover:bg-brand-50/15 text-white px-6 py-2 text-xs font-semibold border border-white/20">
            Get GoDavaii App
          </Button>
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden z-50 ml-2 p-2 rounded-md transition hover:bg-white/10"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation"
        >
          <span className="block w-7 h-0.5 bg-white rounded mb-1"></span>
          <span className="block w-7 h-0.5 bg-white rounded mb-1"></span>
          <span className="block w-7 h-0.5 bg-white rounded"></span>
        </button>
      </nav>

      {/* -- MOBILE DRAWER -- */}
      {navOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={() => setNavOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed right-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-2xl border-l border-border flex flex-col py-8 px-7 z-[10000] animate-slide-in"
            style={{ minHeight: "100vh" }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchMove={(e) => {
              if (touchStartX !== null && e.touches[0].clientX - touchStartX < -60) {
                setNavOpen(false);
                setTouchStartX(null);
              }
            }}
            onTouchEnd={() => setTouchStartX(null)}
          >
            <button
              className="ml-auto mb-8 text-3xl text-brand-700 font-bold"
              aria-label="Close navigation"
              onClick={() => setNavOpen(false)}
            >
              &times;
            </button>
            <nav className="flex flex-col gap-1">
              <a
                href="#features"
                className="py-4 border-b font-medium text-lg hover:text-brand-700"
                onClick={() => setNavOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="py-4 border-b font-medium text-lg hover:text-brand-700"
                onClick={() => setNavOpen(false)}
              >
                How it works
              </a>
              <a
                href="#app-preview"
                className="py-4 border-b font-medium text-lg hover:text-brand-700"
                onClick={() => setNavOpen(false)}
              >
                App Preview
              </a>
              <a
                href="#partner-pharmacy"
                className="py-4 border-b font-medium text-lg hover:text-brand-700"
                onClick={() => setNavOpen(false)}
              >
                Partners
              </a>
              <a
                href="#download"
                className="py-4 border-b font-medium text-lg hover:text-brand-700"
                onClick={() => setNavOpen(false)}
              >
                Download
              </a>
              <a
                href="#about"
                className="py-4 border-b font-medium text-lg hover:text-brand-700"
                onClick={() => setNavOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="py-4 border-b font-medium text-lg hover:text-brand-700"
                onClick={() => setNavOpen(false)}
              >
                Contact
              </a>
              <a href="#download" className="mt-8">
                <Button className="w-full btn-pill bg-brand-700 hover:bg-brand-800 text-white shadow">
                  Get GoDavaii App
                </Button>
              </a>
            </nav>
          </div>
          <style jsx global>{`
            @keyframes slide-in {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(0);
              }
            }
            .animate-slide-in {
              animation: slide-in 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            }
          `}</style>
        </div>
      )}

      {/* HERO */}
      <section className="relative flex flex-col justify-center items-center min-h-[90vh] pt-32 pb-16 px-4 md:px-0 mx-auto max-w-5xl">
        {/* Brand halo background */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] z-0 pointer-events-none">
          <div className="absolute w-[70vw] h-[40vh] left-1/2 -translate-x-1/2 bg-brand-200/35 rounded-full blur-3xl" />
          <div className="absolute w-[40vw] h-[40vw] right-10 top-20 bg-brand-400/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 items-center w-full">
          {/* Text side */}
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-brand-700 mb-4 shadow-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Pharmacy-first healthcare, starting in Noida
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center md:text-left leading-snug mb-6 text-brand-900">
  Trusted pharmacy medicines, 
  <br className="hidden md:block" />
  <span className="text-brand-700">
     delivered to your doorstep in 30 minutes.
  </span>
</h1>

            <p className="text-sm md:text-lg text-neutral-700 mb-8 max-w-xl text-center md:text-left mx-auto md:mx-0 font-medium">
              India’s fastest hyperlocal medicine delivery from{" "}
              <span className="font-semibold">licensed neighbourhood pharmacies</span>. Real-time
              tracking, pharmacist-checked orders and support that actually responds.
            </p>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <Button className="btn-pill bg-brand-700 hover:bg-brand-800 text-white text-sm md:text-base px-8 py-3 w-full md:w-auto min-w-[220px] md:min-w-[240px] shadow-lg shadow-emerald-900/20">
                Download GoDavaii App
              </Button>
              <a href="#partner-pharmacy" className="w-full md:w-auto">
                <Button
                  variant="outline"
                  className="btn-pill border border-brand-700/80 text-brand-800 text-sm md:text-base px-8 py-3 w-full md:w-auto min-w-[220px] md:min-w-[240px] bg-white/70 hover:bg-brand-50"
                >
                  Partner with GoDavaii
                </Button>
              </a>
            </div>

            <p className="mt-5 text-[11px] md:text-xs text-neutral-500 text-center md:text-left">
              Beginning with medicines today. Quietly building a calmer, smarter healthcare
              experience for tomorrow.
            </p>
          </div>

          {/* Visual side */}
          <div className="hidden md:flex justify-end">
            <div className="relative w-full max-w-sm">
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-3xl bg-gradient-to-br from-brand-400/40 to-emerald-300/30 blur-xl" />
              <div className="relative rounded-[1.75rem] bg-white/90 border border-brand-100 shadow-[0_22px_60px_rgba(15,91,70,0.22)] p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-2xl bg-brand-50 flex items-center justify-center text-xs font-bold text-brand-800">
                      Go
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">
                        GoDavaii · Noida Pilot
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Status: {LAUNCH_METRICS.statusNote}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-neutral-500">As of {asOf}</div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-[11px]">
                  <div className="rounded-2xl bg-brand-50/70 border border-brand-100 px-3 py-3">
                    <div className="text-[20px] font-extrabold text-brand-800 leading-none mb-1">
                      {LAUNCH_METRICS.ordersDelivered > 0
                        ? `${LAUNCH_METRICS.ordersDelivered.toLocaleString()}+`
                        : "Pre"}
                    </div>
                    <div className="uppercase tracking-[0.12em] text-[9px] text-neutral-600">
                      Orders
                    </div>
                  </div>
                  <div className="rounded-2xl bg-brand-50/70 border border-brand-100 px-3 py-3">
                    <div className="text-[20px] font-extrabold text-brand-800 leading-none mb-1">
                      {LAUNCH_METRICS.partnerPharmacies}
                    </div>
                    <div className="uppercase tracking-[0.12em] text-[9px] text-neutral-600">
                      Pharmacies
                    </div>
                  </div>
                  <div className="rounded-2xl bg-brand-50/70 border border-brand-100 px-3 py-3">
                    <div className="text-[20px] font-extrabold text-brand-800 leading-none mb-1">
                      {LAUNCH_METRICS.avgDeliveryMins
                        ? `${LAUNCH_METRICS.avgDeliveryMins}m`
                        : "< 30m"}
                    </div>
                    <div className="uppercase tracking-[0.12em] text-[9px] text-neutral-600">
                      Avg time
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 px-3 py-3 flex items-center gap-3">
                  <div className="flex -space-x-1.5">
                    <div className="h-7 w-7 rounded-full bg-emerald-600/90 border border-white" />
                    <div className="h-7 w-7 rounded-full bg-brand-700/90 border border-white" />
                    <div className="h-7 w-7 rounded-full bg-emerald-400/90 border border-white" />
                  </div>
                  <div className="text-[11px] text-neutral-700 leading-snug">
  “Speed that feels effortless. Care that feels personal — from{" "}
  <span className="font-semibold text-brand-800">real pharmacies</span>.”
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / STATS (kept for mobile/overall) */}
      <section className="bg-white/90 border-y border-brand-100 md:border-y-0 md:pt-0">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {/* Orders */}
            <div className="p-6 rounded-2xl bg-brand-50">
              <div className="text-3xl font-extrabold text-brand-800">
                {LAUNCH_METRICS.ordersDelivered > 0
                  ? `${LAUNCH_METRICS.ordersDelivered.toLocaleString()}+`
                  : "Pre-launch"}
              </div>
              <div className="text-xs uppercase tracking-wide text-neutral-700 font-semibold mt-1">
                Orders Delivered
              </div>
            </div>

            {/* Partner Pharmacies */}
            <div className="p-6 rounded-2xl bg-brand-50">
              <div className="text-3xl font-extrabold text-brand-800">
                {LAUNCH_METRICS.partnerPharmacies}
              </div>
              <div className="text-xs uppercase tracking-wide text-neutral-700 font-semibold mt-1">
                Partner Pharmacies
              </div>
            </div>

            {/* Avg Delivery Time */}
            <div className="p-6 rounded-2xl bg-brand-50">
              <div className="text-3xl font-extrabold text-brand-800">
                {LAUNCH_METRICS.avgDeliveryMins
                  ? `${LAUNCH_METRICS.avgDeliveryMins} min`
                  : "Target: < 30 min"}
              </div>
              <div className="text-xs uppercase tracking-wide text-neutral-700 font-semibold mt-1">
                Avg Delivery Time
              </div>
            </div>
          </div>

          {/* Honest status line */}
          <p className="text-center text-xs text-neutral-500 mt-3">
            Status: {LAUNCH_METRICS.statusNote} • As of {asOf}
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="py-24 bg-gradient-to-br from-white via-brand-50/70 to-white px-4 md:px-0"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-neutral-900">
          Why people choose GoDavaii
        </h2>
        <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-12 text-sm md:text-base">
          Built for families who want hospital-level seriousness with modern app-level speed and
          simplicity.
        </p>
        <div className="mx-auto max-w-xl md:max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-10">
          <Card className="border-0 rounded-3xl bg-gradient-to-b from-brand-50 to-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <CardContent className="p-8 flex flex-col items-center text-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-brand-700/10 flex items-center justify-center mb-1">
                <Clock3 className="w-6 h-6 text-brand-800" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-brand-800">30-minute reliability</h3>
              <p className="text-neutral-700 text-sm md:text-base">
                Fast enough for urgency, calm enough for accuracy. Most orders reach{" "}
                <b>in under 30 minutes</b> within our service radius.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 rounded-3xl bg-gradient-to-b from-brand-50 to-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <CardContent className="p-8 flex flex-col items-center text-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-brand-700/10 flex items-center justify-center mb-1">
                <Building2 className="w-6 h-6 text-brand-800" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-brand-800">Pharmacy-first, always</h3>
              <p className="text-neutral-700 text-sm md:text-base">
                No dark warehouses. We work with <b>licensed neighbourhood pharmacies</b> so your
                medicines stay authentic, compliant and close by.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 rounded-3xl bg-gradient-to-b from-brand-50 to-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            <CardContent className="p-8 flex flex-col items-center text-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-brand-700/10 flex items-center justify-center mb-1">
                <Radar className="w-6 h-6 text-brand-800" />
              </div>
              <h3 className="text-lg font-bold mb-1 text-brand-800">Calm, clear tracking</h3>
              <p className="text-neutral-700 text-sm md:text-base">
                Follow your order from pharmacy to doorstep with <b>live status</b>, precise ETAs and
                helpful updates — not noisy notifications.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* HOW IT WORKS (Customers) */}
      <section id="how-it-works" className="py-20 px-4 md:px-0 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-brand-800 mb-10">
            How GoDavaii works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: "📸",
                title: "Upload or search",
                desc: "Add your prescription or search for OTC medicines and essentials.",
              },
              {
                icon: "cart",
                title: "Pharmacy confirms",
                desc: "A nearby licensed pharmacy accepts your order and prepares it.",
              },
              {
                icon: "🛵",
                title: "30-minute delivery",
                desc: "A delivery partner picks up and brings it to your doorstep.",
              },
              {
                icon: "✅",
                title: "Safe & documented",
                desc: "Pharmacist-checked with secure digital receipts for every order.",
              },
            ].map((s, i) => (
              <Card key={i} className="rounded-2xl border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2 flex items-center justify-center">
                    {s.icon === "cart" ? (
                      <ShoppingCart className="w-10 h-10 text-[#0f5b46]" strokeWidth={2.5} />
                    ) : (
                      s.icon
                    )}
                  </div>
                  <div className="font-bold text-brand-700 mb-1 capitalize">{s.title}</div>
                  <p className="text-xs md:text-sm text-neutral-700 font-semibold mt-1">
                    {s.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & COMPLIANCE */}
      <section id="trust" className="py-20 px-4 md:px-0 bg-[#0f5b46]/5">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-800 mb-6">
            Trust, built into every order
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-2xl border-0 shadow-md">
              <CardContent className="p-6">
                <div className="text-xl font-bold text-brand-700 mb-2">Prescription policy</div>
                <p className="text-neutral-700 text-sm md:text-base">
                  Schedule H/H1 medicines are dispensed only against a valid prescription, reviewed
                  by a licensed pharmacist, as per applicable regulations.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-0 shadow-md">
              <CardContent className="p-6">
                <div className="text-xl font-bold text-brand-700 mb-2">Verified pharmacies</div>
                <p className="text-neutral-700 text-sm md:text-base">
                  Every partner is a <b>licensed pharmacy</b>. Orders are pharmacist-checked before
                  dispatch so you receive authentic medicines only.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-0 shadow-md">
              <CardContent className="p-6">
                <div className="text-xl font-bold text-brand-700 mb-2">Privacy & data</div>
                <p className="text-neutral-700 text-sm md:text-base">
                  Health data is handled with care. We store information securely and follow
                  least-access principles for sensitive medical details.
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-neutral-600 mt-6">
            Our promise: Authentic medicines only • Verified pharmacy partners • Pharmacist-checked
            orders • Secure payments • Privacy-first handling of health data.
          </p>
        </div>
      </section>

      {/* SCREENSHOTS CAROUSEL */}
      <section
        id="app-preview"
        className="py-24 bg-gradient-to-tl from-brand-50 to-white px-4 md:px-0"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-neutral-900">
          A calm, clear app for everyday care
        </h2>
        <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-10 text-sm md:text-base">
          Built to feel effortless for every age group — from ordering monthly refills to tracking
          urgent prescriptions in real time.
        </p>
        <div className="flex flex-col items-center mx-auto max-w-xl md:max-w-4xl">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              variant="outline"
              className="btn-pill border-2 border-brand-400 hover:bg-brand-50 text-2xl w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center"
              onClick={() =>
                setScreenshot((screenshot - 1 + screenshots.length) % screenshots.length)
              }
              aria-label="Previous Screenshot"
            >
              ◀
            </Button>

            <div
              className="relative bg-white rounded-[1.25rem] md:rounded-[1.5rem] border border-brand-200 shadow-2xl w-[78vw] max-w-[360px] md:max-w-[420px] p-[3px] md:p-2 overflow-hidden"
              style={{ aspectRatio: 360 / 740 }}
            >
              <Image
                src={screenshots[screenshot].src}
                alt={screenshots[screenshot].alt}
                fill
                className="absolute inset-0 rounded-[1rem] md:rounded-[1.25rem] object-contain"
                sizes="(max-width: 768px) 78vw, 420px"
                priority
              />
            </div>

            <Button
              variant="outline"
              className="btn-pill border-2 border-brand-400 hover:bg-brand-50 text-2xl w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center"
              onClick={() => setScreenshot((screenshot + 1) % screenshots.length)}
              aria-label="Next Screenshot"
            >
              ▶
            </Button>
          </div>

          <div className="mt-6 flex gap-2">
            {screenshots.map((_, idx) => (
              <button
                key={idx}
                className={`h-3 w-3 rounded-full border border-brand-400 transition-all ${
                  idx === screenshot ? "bg-brand-600" : "bg-neutral-200"
                }`}
                onClick={() => setScreenshot(idx)}
                aria-label={`Go to screenshot ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PHARMACY PARTNER */}
      <section id="partner-pharmacy" className="py-20 px-4 md:px-0 bg-[#0f5b46]/5">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f5b46] mb-4">
              Partner with GoDavaii
            </h2>
            <p className="text-gray-700 mb-6 text-sm md:text-base">
              Build a modern, pharmacy-first presence without hiring extra staff. We bring you
              verified prescriptions, smart batching and <b>under-30-minute</b> delivery — so you sell
              more, with less friction.
            </p>
            <ul className="space-y-3 text-gray-800 text-sm md:text-base">
              <li>
                ✅ <b>More orders:</b> Reach nearby customers with zero marketing spend.
              </li>
              <li>
                ✅ <b>Fast payouts:</b> Quick settlements with transparent GST invoices.
              </li>
              <li>
                ✅ <b>Simple tools:</b> Web dashboard, order alerts, item substitutions.
              </li>
              <li>
                ✅ <b>Control:</b> Set timings, stock, delivery radius & holidays.
              </li>
              <li>
                ✅ <b>Compliance:</b> Valid Rx required for Schedule H/H1; licensed partners only.
              </li>
              <li>
                ✅ <b>Support:</b> Assisted onboarding and priority chat support.
              </li>
            </ul>

            <div className="mt-7 flex gap-3 flex-wrap">
              <a href="#contact">
                <Button className="bg-[#0f5b46] hover:bg-[#0d4b3a] rounded-full px-6 text-sm md:text-base">
                  Become a Pharmacy Partner
                </Button>
              </a>
              <a href="#faq">
                <Button
                  variant="outline"
                  className="border-[#0f5b46] text-[#0f5b46] rounded-full px-6 text-sm md:text-base"
                >
                  Learn more
                </Button>
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="rounded-2xl border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-[#0f5b46] mb-2">What you get</h3>
                <ul className="text-gray-700 space-y-2 text-sm md:text-base">
                  <li>• A digital storefront and discovery in your neighbourhood</li>
                  <li>• Delivery fleet included — no separate contracts</li>
                  <li>• Seamless payments with digital receipts for every order</li>
                  <li>• Expiry/alternative handling to reduce cancellations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-[#0f5b46] mb-2">Onboarding in 3 simple steps</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm md:text-base">
                  <li>Share drug licence, GST and basic store details.</li>
                  <li>Inventory & working hours setup (with our team’s help).</li>
                  <li>Go live and start receiving GoDavaii orders.</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* DELIVERY PARTNERS */}
      <section id="partner-delivery" className="py-20 px-4 md:px-0 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f5b46] mb-4">
            Become a Delivery Partner
          </h2>
          <p className="text-gray-700 mb-6 max-w-3xl text-sm md:text-base">
            Flexible hours, dependable earnings and per-order incentives. Deliver health, not just
            parcels — and be part of a calmer kind of on-ground work.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border-0 shadow-md">
              <CardContent className="p-5">
                <h3 className="font-semibold text-[#0f5b46] mb-1">Why it feels different</h3>
                <ul className="text-gray-700 space-y-1 text-sm md:text-base">
                  <li>• Transparent earnings per order</li>
                  <li>• Peak-hour boosts in busy slots</li>
                  <li>• In-app support when you need help</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-md">
              <CardContent className="p-5">
                <h3 className="font-semibold text-[#0f5b46] mb-1">Requirements</h3>
                <ul className="text-gray-700 space-y-1 text-sm md:text-base">
                  <li>• Valid driving licence & bike/scooter</li>
                  <li>• Aadhaar/PAN and a bank account</li>
                  <li>• Android/iOS smartphone</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-md">
              <CardContent className="p-5">
                <h3 className="font-semibold text-[#0f5b46] mb-1">Safety & support</h3>
                <ul className="text-gray-700 space-y-1 text-sm md:text-base">
                  <li>• In-app navigation & safe-delivery guidance</li>
                  <li>• Help centre and escalation hotline</li>
                  <li>• Contactless delivery options when required</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-7">
            <a href="#contact">
              <Button className="bg-[#0f5b46] hover:bg-[#0d4b3a] rounded-full px-6 text-sm md:text-base">
                Apply as Delivery Partner
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS – autoplay carousel */}
      <section id="testimonials" className="py-20 px-4 md:px-0 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-brand-800 mb-3">
            What our early users say
          </h2>
          <p className="text-center text-neutral-600 max-w-2xl mx-auto mb-8 text-sm md:text-base">
            GoDavaii is already helping families in Noida get medicines faster, with less stress and
            more clarity.
          </p>

          <div className="relative overflow-hidden max-w-[640px] sm:max-w-3xl mx-auto px-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${slide * 100}%)`,
                width: `${testimonials.length * 100}%`,
              }}
              onMouseEnter={() => clearInterval(autoplayRef.current)}
              onMouseLeave={() => {
                autoplayRef.current = setInterval(() => {
                  setSlide((s) => (s + 1) % testimonials.length);
                }, 3500);
              }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="basis-full shrink-0 px-2">
                  <Card className="rounded-2xl border-0 shadow-md h-full">
                    <CardContent className="p-5 sm:p-6 min-h-[140px] flex flex-col justify-center">
                      <p className="text-base sm:text-lg md:text-xl text-neutral-800 mb-3 leading-relaxed">
                        “{t.q}”
                      </p>
                      <p className="text-sm font-semibold text-neutral-600">{t.a}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${
                    i === slide ? "bg-brand-700" : "bg-neutral-300"
                  }`}
                  onClick={() => setSlide(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE / CITIES */}
      <section id="coverage" className="relative py-24 px-4 md:px-0">
        <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_-20%,rgba(21,107,86,.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/70 to-white pointer-events-none" />

        <div className="relative mx-auto max-w-5xl">
          <div className="rounded-3xl border border-brand-100 bg-white/85 backdrop-blur shadow-[0_20px_60px_rgba(16,94,73,.15)] overflow-hidden">
            <div className="bg-brand-900 text-brand-50 py-3 px-6 text-center text-xs md:text-sm tracking-wide">
              Building a pharmacy-first network with{" "}
              <span className="font-semibold">priority onboarding for early partners</span>
            </div>

            <div className="p-8 md:p-14">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 text-brand-800 border border-brand-200 px-3 py-1 text-xs font-semibold">
                  Phase 1
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-semibold">
                  Onboarding now in Noida
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-900 mb-4">
                We’re launching in{" "}
                <span className="text-brand-700 underline decoration-brand-300/70">Noida</span>
              </h2>
              <p className="text-neutral-700 text-sm md:text-lg max-w-2xl">
                If you run a licensed pharmacy in Noida, join our founding cohort for zero listing
                fees during launch, priority placement and faster payouts as we scale.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-200 text-brand-800 px-4 py-2 font-semibold text-sm">
                  Noida
                </span>

                <a href="#contact">
                  <Button className="btn-pill bg-brand-700 hover:bg-brand-800 text-white shadow-lg px-6 text-sm md:text-base">
                    Request onboarding
                  </Button>
                </a>

                <a href="/medicine-delivery/noida" className="ml-1">
                  <Button
                    variant="outline"
                    className="btn-pill border-brand-300 text-brand-800 text-sm md:text-base"
                  >
                    Learn more
                  </Button>
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-neutral-700">
                {[
                  ["⭐ Priority placement", "Founding partner badge at launch"],
                  ["⚡ Fast payouts", "Transparent GST-ready statements"],
                  ["🛡️ Compliance-first", "Valid Rx & licensed partners only"],
                ].map(([title, sub], i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4"
                  >
                    <div className="font-semibold text-brand-900 text-sm md:text-base">
                      {title}
                    </div>
                    <div className="text-neutral-600 text-xs md:text-sm">{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="py-20 flex flex-col items-center bg-white px-4 md:px-0">
        <div className="max-w-xl w-full text-center mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-neutral-900">
            Download the GoDavaii App
          </h2>
          <p className="text-neutral-600 mb-6 text-sm md:text-lg max-w-xl text-center mx-auto">
            Keep your family’s medicines just a few taps away — with 30-minute delivery from trusted
            neighbourhood pharmacies.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href="#" className="transition-transform hover:scale-105">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </a>
            <a href="#" className="transition-transform hover:scale-105">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-16 px-4 md:px-0 max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col items-center md:items-start"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900 text-center md:text-left w-full">
          About GoDavaii
        </h2>
        <p className="text-neutral-700 text-sm md:text-lg mb-6 w-full text-center md:text-left">
          GoDavaii is building a modern, pharmacy-first layer for healthcare access in India —
          starting with 30-minute medicine delivery from trusted local chemists in Noida. Whether
          it’s a late-night requirement or a busy weekday, we focus on making access to medicines
          feel calm, reliable and close by.
        </p>
        <div className="w-full">
          <h3 className="text-xl font-bold mb-2 text-brand-700 text-center md:text-left">
            What makes us different?
          </h3>
          <ul className="text-left mx-auto max-w-md md:max-w-full text-neutral-700 list-disc list-inside text-sm md:text-lg space-y-2 mb-6">
            <li>
              <span className="font-semibold text-brand-700">Pharmacy-first approach:</span> We
              grow local, licensed pharmacies instead of replacing them with warehouses.
            </li>
            <li>
              <span className="font-semibold text-brand-700">Meaningful speed:</span> 30-minute
              delivery that respects both urgency and medical safety.
            </li>
            <li>
              <span className="font-semibold text-brand-700">Designed for families:</span> Simple
              flows, transparent status and real humans when you need help.
            </li>
            <li>
              <span className="font-semibold text-brand-700">No shortcuts on quality:</span> Only
              authentic stock, pharmacist-checked orders and a compliance-first mindset.
            </li>
          </ul>
          <p className="text-xs md:text-sm text-neutral-600">
            Compliance: “GoDavaii facilitates delivery from licensed pharmacies. Prescription
            medicines are dispensed only against a valid prescription, as per applicable
            regulations.”
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 md:px-0 bg-[#0f5b46]/5">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f5b46] mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="group rounded-2xl bg-white shadow-md p-5">
              <summary className="cursor-pointer list-none font-semibold text-gray-900">
                Do I need a prescription?
              </summary>
              <p className="mt-2 text-gray-700 text-sm md:text-base">
                For prescription medicines (Schedule H/H1), yes — upload a valid prescription from a
                registered medical practitioner. OTC items and wellness products can be ordered
                without one.
              </p>
            </details>

            <details className="group rounded-2xl bg-white shadow-md p-5">
              <summary className="cursor-pointer list-none font-semibold text-gray-900">
                How fast is delivery?
              </summary>
              <p className="mt-2 text-gray-700 text-sm md:text-base">
                Within our serviceable areas, most orders arrive in under 30 minutes, subject to
                pharmacy confirmation, order size, traffic and weather conditions.
              </p>
            </details>

            <details className="group rounded-2xl bg-white shadow-md p-5">
              <summary className="cursor-pointer list-none font-semibold text-gray-900">
                What are the charges for pharmacies?
              </summary>
              <p className="mt-2 text-gray-700 text-sm md:text-base">
                We follow a simple, success-based pricing model with transparent invoices. During
                the launch phase, there is no listing fee for eligible partner pharmacies.
              </p>
            </details>

            <details className="group rounded-2xl bg-white shadow-md p-5">
              <summary className="cursor-pointer list-none font-semibold text-gray-900">
                How are delivery partners paid?
              </summary>
              <p className="mt-2 text-gray-700 text-sm md:text-base">
                Delivery partners receive regular payouts directly to their bank accounts. Peak-hour
                and high-priority orders may include additional incentives based on demand.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-white to-brand-50 px-4 md:px-0"
      >
        <div className="max-w-xl w-full mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-neutral-900">
            Contact GoDavaii
          </h2>
          <form className="max-w-lg mx-auto grid gap-4 bg-white/95 shadow-xl rounded-2xl p-10 border border-border">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-border p-3 rounded-lg outline-brand-400 bg-brand-50 text-sm md:text-base"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-border p-3 rounded-lg outline-brand-400 bg-brand-50 text-sm md:text-base"
            />
            <textarea
              placeholder="Your Message"
              className="border border-border p-3 rounded-lg outline-brand-400 min-h-[100px] bg-brand-50 text-sm md:text-base"
            />
            <Button className="mt-2 btn-pill bg-brand-700 hover:bg-brand-800 text-white text-sm md:text-base">
              Send Message
            </Button>
          </form>
          <div className="text-center text-neutral-500 mt-6 text-sm md:text-base">
            Or email us at{" "}
              <a href="mailto:info@godavaii.com" className="text-brand-700 underline">
                info@godavaii.com
              </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-brand-50 text-xs md:text-sm border-t bg-brand-900 shadow-inner mt-0">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center text-xs md:text-sm mb-3">
            <a href="#trust" className="hover:underline">
              Prescription Policy
            </a>
            <a href="#partner-pharmacy" className="hover:underline">
              Partner T&amp;Cs
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
          </div>
          <div className="opacity-90">&copy; {year} GoDavaii. All rights reserved.</div>
        </div>
      </footer>

      {/* SEO: FAQ structured data */}
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do I need a prescription?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "For prescription medicines (Schedule H/H1), yes—upload a valid Rx. OTC items can be ordered without one.",
                },
              },
              {
                "@type": "Question",
                name: "How fast is delivery?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Most orders arrive in under 30 minutes within the service radius, subject to weather & pharmacy availability.",
                },
              },
              {
                "@type": "Question",
                name: "What are the charges for pharmacies?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Simple success-based pricing with transparent invoices. No listing fee during launch.",
                },
              },
              {
                "@type": "Question",
                name: "How are delivery partners paid?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Regular payouts to your bank account. Peak-hour deliveries include additional incentives.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
