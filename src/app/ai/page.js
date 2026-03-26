import { Suspense } from "react";
import AIChatClient from "./AIChatClient";

export const metadata = {
  title: "AI Health Assistant — Ask Health Questions Free",
  description:
    "Ask health questions to GoDavaii AI for free. Get instant answers about symptoms, medicines, side effects, and more in English and Hindi. No download required.",
  alternates: { canonical: "/ai" },
  openGraph: {
    title: "GoDavaii AI — Free AI Health Assistant",
    description: "Ask health questions and get instant AI-powered answers. Free, no download required.",
    type: "website",
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="h-10 w-10 border-2 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-sm">Loading GoDavaii AI...</p>
      </div>
    </div>
  );
}

export default function AIPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AIChatClient />
    </Suspense>
  );
}
