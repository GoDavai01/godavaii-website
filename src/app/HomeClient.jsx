// app/HomeClient.jsx
"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import LOGO from "../../public/LOGO.png";
import MEDICINES from "../../public/MEDICINES.png";
import HOME from "../../public/HOME.png";

const screenshots = [
  { src: LOGO, alt: "Logo" },
  { src: MEDICINES, alt: "Medicines" },
  { src: HOME, alt: "Home" },
];

const testimonials = [
  { q: "Got my dad’s meds in 18 minutes. Superb!", a: "— Priya S." },
  { q: "Pharmacist suggested a safer alternative. 10/10.", a: "— Kiran M." },
  { q: "Clean UI, quick delivery, verified stores.", a: "— Arjun R." },
  { q: "Super fast and the rider was courteous.", a: "— Neha V." },
  { q: "Reliable at midnight when it mattered most.", a: "— Rohit P." },
  { q: "Easy Rx upload. Smooth experience.", a: "— Zainab H." },
];

const cities = [{ name: "Noida", slug: "noida" }];

/** 3D hover tilt wrapper */
function TiltCard({ children, className = "" }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rotateX = useMemo(() => (pos.y - 0.5) * 10, [pos.y]);
  const rotateY = useMemo(() => (pos.x - 0.5) * -12, [pos.x]);

  return (
    <motion.div
      className={className}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - r.left) / r.width,
          y: (e.clientY - r.top) / r.height,
        });
      }}
      onMouseLeave={() => setPos({ x: 0.5, y: 0.5 })}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.6 }}
    >
      {/* highlight glint */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 md:opacity-100"
        style={{
          background:
            "radial-gradient(120px 120px at var(--mx) var(--my), rgba(255,255,255,.4), transparent 60%)",
        }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      />
      {children}
    </motion.div>
  );
}

export default function HomeClient() {
  const [screenshot, setScreenshot] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [year, setYear] = useState("");
  const [slide, setSlide] = useState(0);
  const autoplayRef = useRef(null);

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

  // Parallax for hero floating pills
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, 40]);
  const y2 = useTransform(scrollY, [0, 400], [0, -30]);
  const y3 = useTransform(scrollY, [0, 400], [0, 25]);

  return (
    <div className="min-h-screen w-full font-sans overflow-x-hidden relative bg-brand-50">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-brand-900/95 text-white shadow-lg border-b border-brand-800 backdrop-blur supports-[backdrop-filter]:bg-brand-900/80 flex justify-between items-center px-4 md:px-16 py-3 transition-all">
        <a href="#" className="flex items-center gap-2 select-none">
          <span className="text-2xl font-extrabold tracking-tight">GoDavaii</span>
        </a>
        <div className="hidden md:flex gap-8 font-medium text-base">
          <a href="#features" className="hover:opacity-80 transition">Features</a>
          <a href="#how-it-works" className="hover:opacity-80 transition">How it works</a>
          <a href="#app-preview" className="hover:opacity-80 transition">App Preview</a>
          <a href="#partner-pharmacy" className="hover:opacity-80 transition">Partners</a>
          <a href="#download" className="hover:opacity-80 transition">Download</a>
          <a href="#about" className="hover:opacity-80 transition">About</a>
          <a href="#contact" className="hover:opacity-80 transition">Contact</a>
        </div>
        <a href="#download" className="hidden md:block">
          <Button className="btn-pill bg-brand-700 hover:bg-brand-800 text-white px-6 py-2">
            Get App
          </Button>
        </a>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden z-50 ml-2 p-2 rounded-md transition hover:bg-white/10"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation"
        >
          <span className="block w-7 h-1 bg-white rounded mb-1"></span>
          <span className="block w-7 h-1 bg-white rounded mb-1"></span>
          <span className="block w-7 h-1 bg-white rounded"></span>
        </button>
      </nav>

      {/* MOBILE DRAWER */}
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
          >
            <button
              className="ml-auto mb-8 text-3xl text-brand-700 font-bold"
              aria-label="Close navigation"
              onClick={() => setNavOpen(false)}
            >
              &times;
            </button>
            <nav className="flex flex-col gap-1">
              {[
                ["#features", "Features"],
                ["#how-it-works", "How it works"],
                ["#app-preview", "App Preview"],
                ["#partner-pharmacy", "Partners"],
                ["#download", "Download"],
                ["#about", "About"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="py-4 border-b font-medium text-lg hover:text-brand-700"
                  onClick={() => setNavOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a href="#download" className="mt-8">
                <Button className="w-full btn-pill bg-brand-700 hover:bg-brand-800 text-white shadow">
                  Get App
                </Button>
              </a>
            </nav>
          </div>
          <style jsx global>{`
            @keyframes slide-in {
              0% { transform: translateX(100%); }
              100% { transform: translateX(0); }
            }
            .animate-slide-in { animation: slide-in 0.25s cubic-bezier(.4,0,.2,1); }
          `}</style>
        </div>
      )}

      {/* HERO with 3D / Parallax */}
      <section className="relative flex flex-col justify-center items-center min-h-[92vh] pt-32 pb-16 px-4 md:px-0 mx-auto max-w-2xl md:max-w-5xl">
        {/* gradient aura */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] z-0 pointer-events-none">
          <div className="absolute w-[70vw] h-[40vh] left-1/2 -translate-x-1/2 bg-brand-200/40 rounded-full blur-3xl" />
          <div className="absolute w-[40vw] h-[40vw] right-10 top-20 bg-brand-400/20 rounded-full blur-3xl" />
        </div>

        {/* floating pills & bike shapes */}
        <motion.div style={{ y: y1 }} className="absolute left-6 top-20 hidden md:block">
          <div className="w-24 h-24 rounded-2xl rotate-12 bg-gradient-to-br from-emerald-300 to-emerald-500 shadow-2xl/30 shadow-emerald-800/20" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute right-10 top-32 hidden md:block">
          <div className="w-16 h-28 rounded-xl -rotate-6 bg-gradient-to-br from-teal-200 to-green-400 shadow-2xl/30 shadow-emerald-800/20" />
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute right-24 bottom-24 hidden md:block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-white to-emerald-100 border border-emerald-200/50 shadow-lg" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-brand-900"
          >
            Get Medicines Delivered <br className="md:hidden" /> Under 30 Minutes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-lg md:text-2xl text-neutral-700 mb-10 max-w-2xl mx-auto font-medium md:font-semibold"
          >
            India’s fastest hyperlocal medicine delivery. <br />
            Real-time tracking. Trusted local pharmacies.{" "}
            <span className="font-semibold text-brand-700">24x7</span> support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="flex flex-col md:flex-row gap-4 w-full justify-center"
          >
            <Button className="btn-pill bg-brand-700 hover:bg-brand-800 text-white text-lg px-8 py-3 w-full md:w-auto min-w-[240px] md:min-w-[260px]">
              Download App
            </Button>
            <a href="#partner-pharmacy" className="w-full md:w-auto">
              <Button
                variant="outline"
                className="btn-pill border-2 border-brand-700 text-brand-700 text-lg px-8 py-3 w-full md:w-auto min-w-[240px] md:min-w-[260px] hover:bg-brand-50"
              >
                Partner With Us
              </Button>
            </a>
          </motion.div>

          {/* 3D phone mockup */}
          <div className="mt-12">
            <TiltCard className="relative w-[78vw] max-w-[360px] md:max-w-[420px] mx-auto">
              <div
                className="relative bg-white rounded-[1.25rem] md:rounded-[1.5rem] border border-brand-200 shadow-2xl w-full p-[3px] md:p-2 overflow-hidden"
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
                {/* sheen */}
                <div className="absolute inset-0 rounded-[1rem] md:rounded-[1.25rem] pointer-events-none bg-[linear-gradient(120deg,rgba(255,255,255,0.0) 40%,rgba(255,255,255,.35) 60%,rgba(255,255,255,0.0) 75%)] translate-x-[-40%] animate-[sheen_4s_linear_infinite]" />
              </div>
            </TiltCard>
            <div className="mt-6 flex gap-2 justify-center">
              {screenshots.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-3 w-3 rounded-full border border-brand-400 transition-all ${idx === screenshot ? "bg-brand-600" : "bg-neutral-200"}`}
                  onClick={() => setScreenshot(idx)}
                  aria-label={`Go to screenshot ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes sheen {
            0% { transform: translateX(-60%) skewX(-12deg); opacity: 0; }
            35% { opacity: .7; }
            60% { transform: translateX(120%) skewX(-12deg); opacity: 0; }
            100% { opacity: 0; }
          }
          .shadow-2xl\/30 { box-shadow: 0 25px 80px var(--tw-shadow-color); }
          .animate-pulse-slow { animation: pulse 6s ease-in-out infinite; }
          .animate-pulse-slower { animation: pulse 9s ease-in-out infinite; }
        `}</style>
      </section>

      {/* STATS */}
      <section className="bg-white/90 border-y border-brand-100">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            ["1.5k+", "Orders Delivered"],
            ["50+", "Partner Pharmacies"],
            ["<28 min", "Avg Delivery Time"],
          ].map(([num, label], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-brand-50 shadow-sm"
            >
              <div className="text-3xl font-extrabold text-brand-800">{num}</div>
              <div className="text-sm text-neutral-700 font-semibold">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-gradient-to-br from-white to-brand-50 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-neutral-900">
          Why GoDavaii?
        </h2>
        <div className="mx-auto max-w-xl md:max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            ["⏱️", "Ultra-fast Delivery", "Get medicines at your doorstep in under 30 minutes."],
            ["🏪", "Local Pharmacy Network", "Authentic medicines from trusted nearby stores."],
            ["🔔", "Live Order Tracking", "Track every step with transparent updates."],
          ].map(([emoji, title, desc], i) => (
            <TiltCard key={i} className="rounded-3xl">
              <Card className="border-0 rounded-3xl bg-gradient-to-b from-brand-50 to-white shadow-xl">
                <CardContent className="p-10 flex flex-col items-center">
                  <span className="text-5xl mb-4">{emoji}</span>
                  <h3 className="text-xl font-bold mb-2 text-brand-700">{title}</h3>
                  <p className="text-center text-neutral-700 text-base">{desc}</p>
                </CardContent>
              </Card>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 md:px-0 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-brand-800 mb-10">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "📸", title: "Upload Rx", desc: "Add your prescription or search OTC items." },
              { icon: "cart", title: "Place Order", desc: "Nearby licensed pharmacy accepts & prepares." },
              { icon: "🛵", title: "Instant Delivery", desc: "Picked up & delivered in under 30 minutes." },
              { icon: "✅", title: "Safe & Verified", desc: "Pharmacist checked. Digital receipts." },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="rounded-2xl border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2 flex items-center justify-center">
                      {s.icon === "cart" ? (
                        <ShoppingCart className="w-10 h-10 text-[#0f5b46]" strokeWidth={2.5} />
                      ) : (
                        s.icon
                      )}
                    </div>
                    <div className="font-bold text-brand-700">{s.title}</div>
                    <p className="text-sm text-neutral-700 font-semibold mt-1">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & COMPLIANCE */}
      <section id="trust" className="py-20 px-4 md:px-0 bg-[#0f5b46]/5">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-800 mb-6">
            Trust & Compliance
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["Prescription Policy", "Schedule H/H1 medicines are dispensed only against a valid prescription."],
              ["Verified Pharmacies", "Partners are licensed; orders are pharmacist-checked."],
              ["Privacy & Data", "Secure storage and least-access principles for PHI."],
            ].map(([t, d], i) => (
              <Card key={i} className="rounded-2xl border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="text-xl font-bold text-brand-700 mb-2">{t}</div>
                  <p className="text-neutral-700">{d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-neutral-600 mt-6">
            Our Promise: Authentic medicines only • Verified pharmacy partners • Pharmacist-checked orders •
            Secure payments • Privacy-first handling of health data.
          </p>
        </div>
      </section>

      {/* COVERAGE / NOIDA */}
      <section id="coverage" className="relative py-24 px-4 md:px-0">
        <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_-20%,rgba(21,107,86,.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/70 to-white pointer-events-none" />

        <div className="relative mx-auto max-w-5xl">
          <div className="rounded-3xl border border-brand-100 bg-white/85 backdrop-blur shadow-[0_20px_60px_rgba(16,94,73,.15)] overflow-hidden">
            <div className="bg-brand-900 text-brand-50 py-3 px-6 text-center text-sm tracking-wide">
              Building a pharmacy-first network with <span className="font-semibold">priority onboarding</span>
            </div>

            <div className="p-8 md:p-14">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 text-brand-800 border border-brand-200 px-3 py-1 text-xs font-semibold">
                  Phase 1
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-semibold">
                  Onboarding now
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-900 mb-4">
                We’re launching in <span className="text-brand-700 underline decoration-brand-300/70">Noida</span>
              </h2>
              <p className="text-neutral-700 text-base md:text-lg max-w-2xl">
                If you run a licensed pharmacy in Noida, join our founding cohort for zero listing fees during launch,
                priority placement and fast payouts.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-200 text-brand-800 px-4 py-2 font-semibold shadow-sm">
                  Noida
                </span>

                <a href="#contact">
                  <Button className="btn-pill bg-brand-700 hover:bg-brand-800 text-white shadow-lg px-6">
                    Request onboarding
                  </Button>
                </a>

                <Link href="/medicine-delivery/noida" className="ml-1">
                  <Button variant="outline" className="btn-pill border-brand-300 text-brand-800">
                    Learn more
                  </Button>
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-neutral-700">
                {[
                  ["⭐ Priority placement", "Founding partner badge at launch"],
                  ["⚡ Fast payouts", "Transparent GST invoices"],
                  ["🛡️ Compliance-first", "Valid Rx & licensed partners only"],
                ].map(([title, sub], i) => (
                  <div key={i} className="rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
                    <div className="font-semibold text-brand-900">{title}</div>
                    <div className="text-neutral-600">{sub}</div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-neutral-900">Download GoDavaii App</h2>
          <p className="text-neutral-600 mb-6 text-base md:text-lg max-w-xl text-center mx-auto">
            Start your journey to faster, easier medicine delivery.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-6">
          <a href="#" className="transition-transform hover:scale-105">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </a>
          <a href="#" className="transition-transform hover:scale-105">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 px-4 md:px-0 max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col items-center md:items-start">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900 text-center md:text-left w-full">
          About GoDavaii
        </h2>
        <p className="text-neutral-700 text-base md:text-lg mb-6 w-full text-center md:text-left">
          GoDavaii is on a mission to revolutionize healthcare accessibility by empowering local pharmacies with technology.
          Whether it's midnight or a busy day, get what you need, when you need it—delivered quickly and securely.
        </p>
        <div className="w-full">
          <h3 className="text-xl font-bold mb-2 text-brand-700 text-center md:text-left">What makes us different?</h3>
          <ul className="text-left mx-auto max-w-md md:max-w-full text-neutral-700 list-disc list-inside text-base md:text-lg space-y-2 mb-6">
            <li><span className="font-semibold text-brand-700">Hyperlocal Speed:</span> Record-time deliveries, 24x7.</li>
            <li><span className="font-semibold text-brand-700">Real Pharmacy Partners:</span> Licensed, trusted pharmacists.</li>
            <li><span className="font-semibold text-brand-700">Smart Tracking:</span> Live updates at every step.</li>
            <li><span className="font-semibold text-brand-700">Zero Compromises:</span> Authentic stock. Reliable support.</li>
          </ul>
          <p className="text-sm text-neutral-600">
            Compliance: “GoDavaii facilitates delivery from licensed pharmacies. Prescription medicines are dispensed only against a valid prescription.”
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
            {[
              ["Do I need a prescription?", "For prescription medicines (Schedule H/H1), yes—upload a valid Rx. OTC items can be ordered without one."],
              ["How fast is delivery?", "Most orders arrive in under 30 minutes within the service radius, subject to weather & pharmacy availability."],
              ["What are the charges for pharmacies?", "Simple success-based pricing with transparent invoices. No listing fee during launch."],
              ["How are delivery partners paid?", "Regular payouts to your bank account. Peak-hour deliveries include additional incentives."],
            ].map(([q, a], i) => (
              <details key={i} className="group rounded-2xl bg-white shadow-md p-5">
                <summary className="cursor-pointer list-none font-semibold text-gray-900">
                  {q}
                </summary>
                <p className="mt-2 text-gray-700">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-gradient-to-b from-white to-brand-50 px-4 md:px-0">
        <div className="max-w-xl w-full mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-neutral-900">Contact Us</h2>
          <form className="max-w-lg mx-auto grid gap-4 bg-white/95 shadow-xl rounded-2xl p-10 border border-border">
            <input type="text" placeholder="Your Name" className="border border-border p-3 rounded-lg outline-brand-400 bg-brand-50" />
            <input type="email" placeholder="Your Email" className="border border-border p-3 rounded-lg outline-brand-400 bg-brand-50" />
            <textarea placeholder="Your Message" className="border border-border p-3 rounded-lg outline-brand-400 min-h-[100px] bg-brand-50" />
            <Button className="mt-2 btn-pill bg-brand-700 hover:bg-brand-800 text-white">Send Message</Button>
          </form>
          <div className="text-center text-neutral-500 mt-6">
            Or email us at <a href="mailto:info@godavaii.com" className="text-brand-700 underline">info@godavaii.com</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-brand-50 text-base border-t bg-brand-900 shadow-inner mt-0">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center text-sm mb-3">
            <a href="#trust" className="hover:underline">Prescription Policy</a>
            <a href="#partner-pharmacy" className="hover:underline">Partner T&amp;Cs</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
          <div>&copy; {year} GoDavaii. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
