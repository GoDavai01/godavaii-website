import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | GoDavaii",
  description: "GoDavaii Privacy Policy — how we collect, use, and protect your personal and health data. Your privacy is our priority.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-8">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-8">Last updated: March 2026</p>

        <div className="space-y-8 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly: name, email, phone number, delivery address, and health-related data (prescriptions, health records stored in your Health Vault). We also collect usage data, device information, and location data to provide our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>Your information is used to: process medicine orders, provide AI health assistance, facilitate doctor consultations, manage lab test bookings, deliver medicines, send order updates, improve our services, and ensure platform safety. Health data is used solely to provide personalized AI health responses and is never sold to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Data Security</h2>
            <p>We implement industry-standard security measures including encryption in transit (TLS/SSL) and at rest, secure access controls, and regular security audits. Health data is stored with additional encryption layers. Our AI processes health queries securely and does not retain conversation data beyond your session unless you save it to your Health Vault.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Sharing</h2>
            <p>We share your information only with: partner pharmacies (for order fulfillment), delivery partners (for medicine delivery), healthcare providers (for consultations you initiate), and lab partners (for test bookings). We never sell your personal or health data to advertisers or data brokers.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Your Rights</h2>
            <p>You have the right to: access your data, correct inaccurate data, delete your account and associated data, export your health records, opt out of marketing communications, and withdraw consent for data processing. Contact us at info@godavaii.com to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Cookies & Tracking</h2>
            <p>We use essential cookies for authentication and session management. Analytics cookies help us understand how users interact with our platform. You can manage cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Children's Privacy</h2>
            <p>Our services are not intended for children under 18. Parents or guardians may use GoDavaii to manage their children's health records and order medicines on their behalf.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or in-app notification. Continued use of our services after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Us</h2>
            <p>For privacy-related questions or concerns, contact us at: <a href="mailto:info@godavaii.com" className="text-brand-400 hover:underline">info@godavaii.com</a></p>
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
            <Link href="/terms" className="hover:text-white/50">Terms</Link>
            <Link href="/refunds" className="hover:text-white/50">Refunds</Link>
            <Link href="/" className="hover:text-white/50">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
