"use client";

import { Shield, CheckCircle } from "lucide-react";

/**
 * MedicalReviewBadge — E-E-A-T trust signal for AI search optimization
 * Shows that content has been reviewed by a medical professional
 * This is critical for Google's YMYL (Your Money, Your Life) ranking
 * and for AI models to trust and cite GoDavaii content
 */
export default function MedicalReviewBadge({ reviewedBy = "GoDavaii Health Team", date }) {
  const displayDate = date || new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/5 border border-green-500/10 text-sm">
      <Shield className="h-4 w-4 text-green-400" />
      <span className="text-green-400/80">
        Medically Reviewed by <strong className="text-green-400">{reviewedBy}</strong>
      </span>
      <span className="text-white/20">|</span>
      <span className="text-white/40 flex items-center gap-1">
        <CheckCircle className="h-3.5 w-3.5" />
        Updated {displayDate}
      </span>
    </div>
  );
}
