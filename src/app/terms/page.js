import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | GoDavaii",
  description: "GoDavaii Terms of Service — rules and guidelines for using our AI health assistant, medicine delivery, doctor consultation, and lab test services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <Sparkles className="h-5 w-5 text-brand-400" />
            <span className="font-bold">GoDavaii</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-8">Terms of Service</h1>
        <p className="text-white/40 text-sm mb-8">Last updated: March 2026</p>

        <div className="space-y-8 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using GoDavaii's services (website, mobile app, or AI assistant), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Services Provided</h2>
            <p>GoDavaii provides: AI-powered health assistance in 16 Indian languages, online medicine ordering from verified pharmacies, doctor consultation booking, lab test booking, prescription management, and health record storage (Health Vault). Our AI provides general health information and is not a substitute for professional medical advice.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Medical Disclaimer</h2>
            <p>GoDavaii AI provides general health information for educational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical decisions. In case of emergency, call your local emergency services immediately.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Medicine Orders</h2>
            <p>Medicines are dispensed by licensed, verified pharmacies. Prescription medicines require a valid prescription from a registered medical practitioner. Prices are set by partner pharmacies and may vary. Delivery times are estimates and may vary based on location and availability.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. User Responsibilities</h2>
            <p>You agree to: provide accurate information, use services for lawful purposes only, not misuse the AI assistant, maintain the confidentiality of your account, and not attempt to reverse engineer our AI systems. You must be 18 years or older to use our services independently.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
            <p>All content, branding, AI technology, and software on GoDavaii are owned by or licensed to GoDavaii. You may not copy, modify, distribute, or create derivative works without written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
            <p>GoDavaii is not liable for: medical outcomes based on AI responses, delays in medicine delivery due to external factors, actions of partner pharmacies or delivery personnel, or any indirect or consequential damages arising from use of our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi, India.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>For questions about these terms, contact us at: <a href="mailto:info@godavaii.com" className="text-brand-400 hover:underline">info@godavaii.com</a></p>
          </section>
        </div>
      </div>

      <footer className="border-t border-white/[0.06] px-4 py-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-400" />
            <span className="font-bold text-white/50">GoDavaii</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/50">Privacy</Link>
            <Link href="/refunds" className="hover:text-white/50">Refunds</Link>
            <Link href="/" className="hover:text-white/50">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
