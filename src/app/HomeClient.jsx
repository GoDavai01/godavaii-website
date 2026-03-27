"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mic, FileText, ScanLine, Brain, ShieldCheck, HeartPulse,
  Pill, Stethoscope, FlaskConical, ArrowRight, ChevronDown,
  Sparkles, Send, Globe, Clock, MessageSquare, Upload,
  Languages, Activity, Star, Menu, X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/api";
import LoginModal from "../components/LoginModal";
import GlowCard from "../components/GlowCard";
import AnimatedCounter from "../components/AnimatedCounter";
import FAQAccordion from "../components/FAQAccordion";

/* ─── STATIC DATA ─── */

const TYPEWRITER_PROMPTS = [
  "What are the side effects of Paracetamol?",
  "Analyze my blood test report...",
  "Find medicines for diabetes management",
  "I have a headache and mild fever since morning...",
  "Compare generic vs branded medicines for BP",
  "Mujhe pet mein dard ho raha hai, kya karu?",
];

const PROMPT_CHIPS = [
  { label: "Symptoms", icon: Activity },
  { label: "Medicine", icon: Pill },
  { label: "Prescription", icon: FileText },
  { label: "Lab Reports", icon: FlaskConical },
  { label: "X-Ray Scan", icon: ScanLine },
  { label: "Voice Chat", icon: Mic },
];

const AI_FEATURES = [
  {
    icon: Mic,
    title: "Voice in 16 Languages",
    desc: "Speak in Hindi, Tamil, Telugu, Bengali, Gujarati, Punjabi, and 10 more. Get answers in your language.",
  },
  {
    icon: FileText,
    title: "Prescription Analysis",
    desc: "Upload your prescription. Get instant breakdown of medicines, dosages, and safety checks.",
  },
  {
    icon: ScanLine,
    title: "X-Ray & Scan Analysis",
    desc: "AI reads your medical images and explains findings in simple, understandable language.",
  },
  {
    icon: Brain,
    title: "Advanced AI Intelligence",
    desc: "Multiple AI models work together to cross-verify and deliver the safest, most accurate answers.",
  },
  {
    icon: ShieldCheck,
    title: "Medical Safety Guards",
    desc: "Automatic red-flag detection, drug interaction warnings, and emergency alerts built in.",
  },
  {
    icon: HeartPulse,
    title: "Family Health Vault",
    desc: "Store and manage health records for your entire family. AI remembers your context.",
  },
];

const ECOSYSTEM = [
  {
    icon: Pill,
    title: "Medicine Delivery",
    desc: "Thousands of medicines delivered in 30 minutes from verified local pharmacies.",
    cta: "Browse Medicines",
    href: "/category/all",
  },
  {
    icon: Stethoscope,
    title: "Doctor Consultation",
    desc: "Video & phone consultations with verified doctors. Book instantly.",
    cta: "Find Doctors",
    href: "https://app.godavaii.com/doctors",
  },
  {
    icon: FlaskConical,
    title: "Lab Tests",
    desc: "Home sample collection, digital reports, and AI-powered analysis.",
    cta: "Book Lab Test",
    href: "https://app.godavaii.com/lab-tests",
  },
];

const LANGUAGES = [
  "English", "Hindi", "Hinglish", "Bengali", "Tamil", "Telugu",
  "Kannada", "Malayalam", "Gujarati", "Punjabi", "Marathi", "Odia",
  "Urdu", "Assamese", "Santali", "Sindhi",
];

const STEPS = [
  { num: "01", title: "Ask Your Question", desc: "Type or speak your health query in any language" },
  { num: "02", title: "AI Analyzes", desc: "Advanced intelligence cross-verifies for accuracy" },
  { num: "03", title: "Get Safe Answer", desc: "Verified response with safety checks and references" },
  { num: "04", title: "Take Action", desc: "Order medicines, book a doctor, or save to your vault" },
];

const TESTIMONIALS = [
  { q: "The AI understood my symptoms in Hindi perfectly. Got medicine suggestions in minutes.", a: "Priya S." },
  { q: "Uploaded my prescription and got a complete breakdown. Felt genuinely cared for.", a: "Kiran M." },
  { q: "Voice feature is incredible. My grandmother uses it in Gujarati. Game changer.", a: "Arjun R." },
  { q: "X-ray analysis was surprisingly detailed. Saved me a trip to the clinic.", a: "Neha V." },
  { q: "Reliable at midnight when it mattered the most for our family.", a: "Rohit P." },
  { q: "The safety warnings caught a drug interaction my doctor missed. Life-saving.", a: "Zainab H." },
];

const FAQS = [
  {
    q: "What is GoDavaii AI?",
    a: "GoDavaii AI is an advanced health assistant that helps you understand symptoms, analyze prescriptions, read lab reports and X-rays, and find the right medicines — all in 16 Indian languages including Hindi, Tamil, Telugu, Bengali, and more.",
  },
  {
    q: "How does the AI health assistant work?",
    a: "You can type or speak your health question. Our AI analyzes it using advanced intelligence with multiple safety checks, then provides a verified, easy-to-understand response with actionable next steps.",
  },
  {
    q: "Can I order medicines online near me?",
    a: "Yes! GoDavaii connects you with verified local pharmacies for delivery in under 30 minutes. We offer thousands of medicines including branded and affordable generic alternatives.",
  },
  {
    q: "Which languages does GoDavaii support?",
    a: "GoDavaii AI supports 16 Indian languages: English, Hindi, Hinglish, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi, Marathi, Odia, Urdu, Assamese, Santali, and Sindhi.",
  },
  {
    q: "Is it safe to use AI for health advice?",
    a: "GoDavaii AI has built-in medical safety guards including drug interaction checks, emergency detection, and red-flag warnings. It always recommends consulting a doctor for serious conditions. It is designed to assist, not replace, professional medical advice.",
  },
  {
    q: "Can the AI read my prescription or lab reports?",
    a: "Yes. You can upload a photo or PDF of your prescription, lab report, or X-ray. The AI will analyze it and explain the findings in simple language, highlighting anything important.",
  },
  {
    q: "How fast is medicine delivery?",
    a: "We partner with verified local pharmacies to deliver medicines in under 30 minutes in supported areas. Currently available in Noida with expansion to more cities coming soon.",
  },
  {
    q: "Can I use GoDavaii AI for my family?",
    a: "Absolutely. The Family Health Vault feature lets you create profiles for each family member and manage their health records, prescriptions, and reports all in one place.",
  },
  {
    q: "Is GoDavaii AI free to use?",
    a: "GoDavaii AI offers a generous free tier. Sign up with your phone number to get started instantly.",
  },
  {
    q: "How do I get started?",
    a: "Simply click 'Try GoDavaii AI', sign in with your phone number via OTP, and start asking your health questions. It takes less than 30 seconds.",
  },
];

/* ─── SECTION WRAPPER ─── */
function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative px-4 md:px-8 lg:px-16 py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div className="text-center mb-14">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-5xl font-bold gradient-text"
      >
        {children}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/50 mt-4 max-w-2xl mx-auto text-lg"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function HomeClient() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [promptIdx, setPromptIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const prompt = TYPEWRITER_PROMPTS[promptIdx];
    let charIdx = 0;
    let typing = true;
    let timeout;

    const tick = () => {
      if (typing) {
        charIdx++;
        setTypedText(prompt.slice(0, charIdx));
        if (charIdx >= prompt.length) {
          timeout = setTimeout(() => { typing = false; tick(); }, 2000);
          return;
        }
        timeout = setTimeout(tick, 50 + Math.random() * 30);
      } else {
        charIdx--;
        setTypedText(prompt.slice(0, charIdx));
        if (charIdx <= 0) {
          setPromptIdx((i) => (i + 1) % TYPEWRITER_PROMPTS.length);
          return;
        }
        timeout = setTimeout(tick, 25);
      }
    };
    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, [promptIdx]);

  // Testimonial autoplay
  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body on nav open
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  const router = useRouter();
  const openLogin = () => setLoginOpen(true);
  const goToAI = () => router.push("/ai");

  const NAV_LINKS = [
    { label: "AI Features", href: "#features" },
    { label: "Medicines", href: "#ecosystem" },
    { label: "Languages", href: "#languages" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen w-full font-sans overflow-x-hidden bg-[#0a0a0a] text-white">
      {/* ═══ NAVBAR ═══ */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06] shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
          <a href="#" className="flex items-center gap-2 select-none">
            <Sparkles className="h-6 w-6 text-brand-400" />
            <span className="text-xl font-bold tracking-tight">GoDavaii</span>
            <span className="text-xs text-brand-400 font-medium ml-1">AI</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={goToAI}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold hover:from-brand-500 hover:to-brand-400 transition-all btn-shimmer shadow-lg shadow-brand-500/20"
            >
              Try GoDavaii AI
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden text-white/70 hover:text-white"
          >
            {navOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/[0.06] px-4 pb-6"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setNavOpen(false)}
                className="block py-3 text-white/70 hover:text-white border-b border-white/[0.04]"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => { setNavOpen(false); openLogin(); }}
              className="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold"
            >
              Try GoDavaii AI
            </button>
          </motion.div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-700/20 blur-[120px]" />
          <div className="orb-2 absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-500/15 blur-[100px]" />
          <div className="orb-3 absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-glow-teal/10 blur-[80px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] mb-8 text-sm text-white/60">
              <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(0,255,170,0.5)]" />
              India&apos;s AI-Powered Healthcare Platform
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              <span className="gradient-text">The Future</span>
              <br />
              <span className="text-white">of Healthcare</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              AI-powered health assistant. Thousands of medicines. 16 Indian languages. One platform.
            </p>
          </motion.div>

          {/* Chat input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <button
              onClick={goToAI}
              className="w-full max-w-2xl mx-auto flex items-center gap-3 px-6 py-4 rounded-2xl glass-strong pulse-glow cursor-text text-left group hover:border-brand-500/30 transition-all"
            >
              <MessageSquare className="h-5 w-5 text-brand-400 shrink-0" />
              <span className="flex-1 text-white/40 text-lg truncate">
                {typedText}
                <span className="cursor-blink text-brand-400 ml-0.5">|</span>
              </span>
              <div className="shrink-0 p-2 rounded-xl bg-brand-500/20 group-hover:bg-brand-500/30 transition-colors">
                <Send className="h-4 w-4 text-brand-400" />
              </div>
            </button>
          </motion.div>

          {/* Prompt chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {PROMPT_CHIPS.map(({ label, icon: Icon }, i) => (
              <button
                key={label}
                onClick={() => router.push(`/ai?q=${encodeURIComponent(label)}`)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.08] hover:border-brand-500/20 transition-all"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            <AnimatedCounter label="Medicines" value="1000s+" />
            <AnimatedCounter label="Languages" value={16} />
            <AnimatedCounter label="AI Intelligence" value="Advanced" />
            <AnimatedCounter label="Delivery" value={30} suffix=" min" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint"
        >
          <ChevronDown className="h-6 w-6 text-white/20" />
        </motion.div>
      </section>

      {/* ═══ AI FEATURES ═══ */}
      <Section id="features">
        <SectionTitle sub="Advanced AI that speaks your language and guards your health">
          Powered by Intelligence
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AI_FEATURES.map((f, i) => (
            <GlowCard key={f.title} delay={i * 0.1}>
              <f.icon className="h-8 w-8 text-brand-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </GlowCard>
          ))}
        </div>
      </Section>

      {/* ═══ ECOSYSTEM ═══ */}
      <Section id="ecosystem" className="bg-gradient-to-b from-transparent via-brand-900/5 to-transparent">
        <SectionTitle sub="Medicine delivery, doctor consultations, and lab tests — all in one platform">
          Complete Healthcare Ecosystem
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ECOSYSTEM.map((item, i) => (
            <GlowCard key={item.title} delay={i * 0.15} className="flex flex-col">
              <item.icon className="h-10 w-10 text-brand-400 mb-5" />
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed flex-1">{item.desc}</p>
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 mt-5 text-brand-400 text-sm font-medium hover:text-brand-300 transition-colors group"
              >
                {item.cta}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </GlowCard>
          ))}
        </div>
      </Section>

      {/* ═══ POPULAR MEDICINES ═══ */}
      <Section id="medicines">
        <SectionTitle sub="Order from verified pharmacies with fast delivery">
          Popular Medicines
        </SectionTitle>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { name: "Paracetamol", slug: "paracetamol" },
            { name: "Dolo 650", slug: "dolo-650mg-tablets" },
            { name: "Azithromycin", slug: "azee-500-tablet" },
            { name: "Amoxicillin", slug: "augmentin-dds-suspension" },
            { name: "Cetirizine", slug: "cetirizine-10-mg" },
            { name: "Pantoprazole", slug: "pantoprazole" },
            { name: "Metformin", slug: "metformin" },
            { name: "Atorvastatin", slug: "atorva-20-tablet" },
            { name: "Omeprazole", slug: "omeprazole-20-mg" },
            { name: "Ibuprofen", slug: "ibuprofen-400-mg" },
            { name: "Montelukast", slug: "air-m-tablets" },
            { name: "Crocin", slug: "crocin-650-tablets" },
          ].map((med, i) => (
            <motion.div
              key={med.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link
                href={`/medicine/${med.slug}`}
                className="block rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 hover:bg-white/[0.06] hover:border-brand-500/20 transition-all text-center group"
              >
                <Pill className="h-6 w-6 text-brand-400/50 mx-auto mb-2 group-hover:text-brand-400 transition-colors" />
                <p className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{med.name}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/category/all"
            className="inline-flex items-center gap-2 text-brand-400 font-medium hover:text-brand-300 transition-colors"
          >
            View All Medicines <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ═══ MEDICINE CATEGORIES ═══ */}
      <Section className="bg-gradient-to-b from-transparent via-brand-900/5 to-transparent">
        <SectionTitle sub="Browse medicines by health category">
          Medicine Categories
        </SectionTitle>

        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          {[
            "Pain Relief", "Fever", "Diabetes Care", "Heart & Blood Pressure",
            "Cold & Cough", "Allergy", "Skin & Hair Care", "Eye & Ear Care",
            "Infections & Antibiotics", "Vitamins & Daily Health", "Stomach & Digestion",
            "Women's Health", "Brain & Nerves / Mental Health", "Bone, Joint & Arthritis Care",
            "Respiratory Care", "Cholesterol & Lipid Control", "Thyroid Care", "Immunity Boosters",
          ].map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link
                href={`/category/${slugify(cat)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/60 text-sm hover:bg-white/[0.08] hover:text-white hover:border-brand-500/20 transition-all"
              >
                {cat}
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ LANGUAGES ═══ */}
      <Section id="languages">
        <SectionTitle sub="Healthcare in the language you think in">
          16 Indian Languages
        </SectionTitle>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {LANGUAGES.map((lang, i) => (
            <motion.span
              key={lang}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/60 text-sm hover:bg-white/[0.08] hover:text-white hover:border-brand-500/20 transition-all cursor-default"
            >
              {lang}
            </motion.span>
          ))}
        </div>
      </Section>

      {/* ═══ HOW IT WORKS ═══ */}
      <Section id="how" className="bg-gradient-to-b from-transparent via-brand-900/5 to-transparent">
        <SectionTitle sub="From question to action in seconds">
          How It Works
        </SectionTitle>

        <div className="max-w-3xl mx-auto space-y-6">
          {STEPS.map((step, i) => (
            <GlowCard key={step.num} delay={i * 0.1} className="flex items-start gap-6">
              <div className="shrink-0 w-14 h-14 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                <span className="text-lg font-bold gradient-text">{step.num}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-white/50 text-sm">{step.desc}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </Section>

      {/* ═══ TESTIMONIALS ═══ */}
      <Section id="testimonials">
        <SectionTitle sub="What our users say about GoDavaii AI">
          Trusted by Thousands
        </SectionTitle>

        <div className="max-w-2xl mx-auto">
          <div className="relative h-44 overflow-hidden">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: i === testimonialIdx ? 1 : 0,
                  y: i === testimonialIdx ? 0 : 20,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="text-white/70 text-lg italic leading-relaxed">
                  &ldquo;{t.q}&rdquo;
                </p>
                <p className="text-white/40 text-sm mt-3">— {t.a}</p>
              </motion.div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === testimonialIdx
                    ? "w-6 bg-brand-400"
                    : "w-2 bg-white/20 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ FAQ ═══ */}
      <Section id="faq" className="bg-gradient-to-b from-transparent via-brand-900/5 to-transparent">
        <SectionTitle sub="Everything you need to know about GoDavaii">
          Frequently Asked Questions
        </SectionTitle>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={FAQS} />
        </div>
      </Section>

      {/* ═══ FINAL CTA ═══ */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Experience the Future of Healthcare
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
            Join thousands who trust GoDavaii AI for their health questions every day.
          </p>
          <button
            onClick={goToAI}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 to-brand-400 text-lg font-semibold hover:from-brand-500 hover:to-brand-300 transition-all shadow-lg shadow-brand-500/25 btn-shimmer"
          >
            <Sparkles className="h-5 w-5" />
            Try GoDavaii AI
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* App badges */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-white/30 text-sm">Available on Web, Android & iOS</span>
          </div>
        </motion.div>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/[0.06] px-4 md:px-8 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-brand-400" />
                <span className="text-lg font-bold">GoDavaii</span>
                <span className="text-xs text-brand-400 font-medium">AI</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                India&apos;s AI-powered healthcare platform. Health assistant, medicine delivery, doctor consultations, and lab tests.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white/70 font-semibold text-sm mb-4">Platform</h4>
              <div className="space-y-2">
                <Link href="/category/all" className="block text-white/40 text-sm hover:text-white/70 transition-colors">All Medicines</Link>
                <Link href="/health" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Health A-Z (500+)</Link>
                <Link href="/blog" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Health Blog</Link>
                <Link href="/how-to" className="block text-white/40 text-sm hover:text-white/70 transition-colors">How-To Guides</Link>
                <Link href="/faq" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Health FAQs</Link>
                <Link href="/drug-interactions" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Drug Interactions</Link>
              </div>
            </div>

            {/* Compare & Explore */}
            <div>
              <h4 className="text-white/70 font-semibold text-sm mb-4">Compare & Explore</h4>
              <div className="space-y-2">
                <Link href="/compare" className="block text-white/40 text-sm hover:text-white/70 transition-colors">GoDavaii vs Others</Link>
                <Link href="/alternatives" className="block text-white/40 text-sm hover:text-white/70 transition-colors">App Alternatives</Link>
                <Link href="/health/diabetes" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Diabetes</Link>
                <Link href="/health/hypertension" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Hypertension</Link>
                <Link href="/health/heart-attack" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Heart Disease</Link>
                <Link href="/health/anxiety" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Anxiety</Link>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white/70 font-semibold text-sm mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Terms of Service</Link>
                <Link href="/refunds" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Refund Policy</Link>
                <a href="mailto:info@godavaii.com" className="block text-white/40 text-sm hover:text-white/70 transition-colors">Contact Us</a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} GoDavaii. All rights reserved.
            </p>
            <p className="text-white/20 text-xs">Made with care in India</p>
          </div>
        </div>
      </footer>

      {/* ═══ LOGIN MODAL ═══ */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* ═══ FAQ STRUCTURED DATA ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}

