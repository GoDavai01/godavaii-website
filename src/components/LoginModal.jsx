"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, ArrowRight, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.godavaii.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.godavaii.com";

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState("phone"); // phone | otp
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setStep("phone");
      setPhone("");
      setOtp(["", "", "", "", "", ""]);
      setError("");
    }
  }, [isOpen]);

  const sendOtp = async () => {
    if (phone.length < 10) {
      setError("Enter a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("otp");
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setError(data.message || "Failed to send OTP");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: phone, otp: code }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        window.location.href = `${APP_URL}/ai?token=${encodeURIComponent(data.token)}`;
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && otp.join("").length === 6) {
      verifyOtp();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-[#111]/90 border border-white/[0.08] backdrop-blur-xl p-8 shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold gradient-text">GoDavaii AI</h2>
              <p className="text-white/50 text-sm mt-2">
                {step === "phone"
                  ? "Sign in to access your AI health assistant"
                  : `Enter the OTP sent to +91 ${phone}`}
              </p>
            </div>

            {/* Phone Step */}
            {step === "phone" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-3 focus-within:border-brand-500/40 transition-colors">
                  <Phone className="h-5 w-5 text-brand-400 shrink-0" />
                  <span className="text-white/50 shrink-0">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                    className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-lg"
                    autoFocus
                  />
                </div>
                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold py-3.5 hover:from-brand-500 hover:to-brand-400 transition-all disabled:opacity-50 btn-shimmer"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Send OTP <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* OTP Step */}
            {step === "otp" && (
              <div className="space-y-4">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      type="tel"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-14 text-center text-xl font-bold text-white bg-white/[0.05] border border-white/[0.1] rounded-xl outline-none focus:border-brand-500/50 focus:bg-white/[0.08] transition-all"
                    />
                  ))}
                </div>
                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold py-3.5 hover:from-brand-500 hover:to-brand-400 transition-all disabled:opacity-50 btn-shimmer"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Verify & Continue <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <button
                  onClick={() => { setStep("phone"); setError(""); }}
                  className="w-full text-center text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                  Change phone number
                </button>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center mt-4">{error}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
