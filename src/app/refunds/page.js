import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy | GoDavaii",
  description: "GoDavaii Refund and Cancellation Policy — learn about our return, refund, and order cancellation policies for medicine orders.",
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-8">Refund & Cancellation Policy</h1>
        <p className="text-white/40 text-sm mb-8">Last updated: March 2026</p>

        <div className="space-y-8 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Order Cancellation</h2>
            <p>You may cancel your medicine order before it has been dispatched by the pharmacy. Once the order is out for delivery, cancellation is not possible. To cancel, go to your order in the GoDavaii app and tap "Cancel Order", or contact our support team.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Refund Eligibility</h2>
            <p>Refunds are available for: cancelled orders (before dispatch), wrong medicine delivered, damaged or expired products, quality issues, and orders not delivered within the promised timeframe. Prescription medicines that have been opened or used are generally not eligible for refund due to safety regulations.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Refund Process</h2>
            <p>To request a refund, report the issue through the GoDavaii app within 24 hours of delivery. Provide photos if the product is damaged or incorrect. Our team will review your request within 24-48 hours. Approved refunds will be processed within 5-7 business days to your original payment method.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Non-Refundable Items</h2>
            <p>The following are generally non-refundable: opened/used prescription medicines, temperature-sensitive products (insulin, vaccines) once delivered, customized or compounded medicines, and products returned after 24 hours of delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Doctor Consultation Refunds</h2>
            <p>Consultation fees are refundable if the doctor does not join the scheduled call within 15 minutes. If you cancel more than 1 hour before the scheduled time, a full refund is provided. Late cancellations may be eligible for credit towards a future consultation.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Lab Test Refunds</h2>
            <p>Lab test bookings can be cancelled up to 2 hours before the scheduled sample collection time for a full refund. If the phlebotomist has already been dispatched, a partial refund may apply.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Contact for Refunds</h2>
            <p>For refund-related queries, contact us at: <a href="mailto:info@godavaii.com" className="text-brand-400 hover:underline">info@godavaii.com</a> or through the in-app support chat.</p>
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
            <Link href="/terms" className="hover:text-white/50">Terms</Link>
            <Link href="/" className="hover:text-white/50">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
