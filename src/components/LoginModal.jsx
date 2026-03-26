"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, Mail, Phone, Chrome } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.godavaii.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.godavaii.com";

function isEmail(str) {
  return /\S+@\S+\.\S+/.test(str);
}

function isPhone(str) {
  return /^\d{10}$/.test(str.replace(/\s/g, ""));
}

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState("input"); // input | otp
  const [identifier, setIdentifier] = useState("");
  const [identifierType, setIdentifierType] = useState(null); // "email" | "phone"
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const otpRefs = useRef([]);
  const recaptchaVerifierRef = useRef(null);
  const confirmationResultRef = useRef(null);
  const recaptchaContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setStep("input");
      setIdentifier("");
      setIdentifierType(null);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setRecaptchaReady(false);
    }
    return () => {
      // Cleanup recaptcha on close
      if (recaptchaVerifierRef.current) {
        try { recaptchaVerifierRef.current.clear(); } catch {}
        recaptchaVerifierRef.current = null;
      }
    };
  }, [isOpen]);

  // Setup invisible reCAPTCHA for Firebase Phone Auth
  const setupRecaptcha = useCallback(async () => {
    if (recaptchaVerifierRef.current) return;
    try {
      const { auth, RecaptchaVerifier } = await import("../lib/firebase");
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
        size: "invisible",
        callback: () => setRecaptchaReady(true),
        "expired-callback": () => setRecaptchaReady(false),
      });
      await recaptchaVerifierRef.current.render();
      setRecaptchaReady(true);
    } catch (err) {
      console.error("reCAPTCHA setup error:", err);
    }
  }, []);

  // Detect input type
  const detectedType = identifier.trim()
    ? isEmail(identifier.trim()) ? "email" : isPhone(identifier.trim()) ? "phone" : null
    : null;

  const inputIcon = detectedType === "email" ? Mail : detectedType === "phone" ? Phone : Mail;

  // ─── SEND OTP ───
  const sendOtp = async () => {
    const val = identifier.trim();
    if (!val) {
      setError("Enter your email or phone number");
      return;
    }

    if (isEmail(val)) {
      // Email OTP via backend (FREE)
      setLoading(true);
      setError("");
      setIdentifierType("email");
      try {
        const res = await fetch(`${API_URL}/api/auth/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: val }),
        });
        const data = await res.json();
        if (res.ok) {
          setStep("otp");
          setTimeout(() => otpRefs.current[0]?.focus(), 100);
        } else {
          setError(data.message || data.error || "Failed to send OTP");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    } else if (isPhone(val)) {
      // Firebase Phone Auth (FREE up to 10K/month)
      setLoading(true);
      setError("");
      setIdentifierType("phone");
      try {
        if (!recaptchaVerifierRef.current) {
          await setupRecaptcha();
        }
        const { auth, signInWithPhoneNumber } = await import("../lib/firebase");
        const phoneNumber = `+91${val.replace(/\s/g, "")}`;
        const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierRef.current);
        confirmationResultRef.current = confirmation;
        setStep("otp");
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } catch (err) {
        console.error("Firebase phone auth error:", err);
        if (err.code === "auth/too-many-requests") {
          setError("Too many attempts. Please try again later.");
        } else if (err.code === "auth/invalid-phone-number") {
          setError("Invalid phone number. Enter a valid 10-digit number.");
        } else {
          setError("Failed to send OTP. Please try again.");
        }
        // Reset recaptcha on error
        if (recaptchaVerifierRef.current) {
          try { recaptchaVerifierRef.current.clear(); } catch {}
          recaptchaVerifierRef.current = null;
        }
      } finally {
        setLoading(false);
      }
    } else {
      setError("Enter a valid email address or 10-digit phone number");
    }
  };

  // ─── VERIFY OTP ───
  const verifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    setError("");

    try {
      if (identifierType === "phone") {
        // Firebase Phone verification
        if (!confirmationResultRef.current) {
          setError("Session expired. Please try again.");
          setStep("input");
          setLoading(false);
          return;
        }
        const result = await confirmationResultRef.current.confirm(code);
        const idToken = await result.user.getIdToken();

        // Send Firebase token to backend to get our JWT
        const res = await fetch(`${API_URL}/api/auth/firebase-verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken, provider: "phone" }),
        });
        const data = await res.json();
        if (res.ok && data.token) {
          redirectToApp(data.token, data.refreshToken);
        } else {
          setError(data.error || "Verification failed");
        }
      } else {
        // Email OTP verification via backend
        const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: identifier.trim(), otp: code }),
        });
        const data = await res.json();
        if (res.ok && data.token) {
          redirectToApp(data.token, data.refreshToken);
        } else {
          setError(data.message || data.error || "Invalid OTP");
        }
      }
    } catch (err) {
      console.error("Verify error:", err);
      if (err.code === "auth/invalid-verification-code") {
        setError("Invalid OTP. Please try again.");
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── GOOGLE SIGN-IN ───
  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const { auth, GoogleAuthProvider, signInWithPopup } = await import("../lib/firebase");
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Send to backend
      const res = await fetch(`${API_URL}/api/auth/firebase-verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, provider: "google" }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        redirectToApp(data.token, data.refreshToken);
      } else {
        setError(data.error || "Google sign-in failed");
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        // User closed popup, not an error
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // ─── REDIRECT ───
  const redirectToApp = (token, refreshToken) => {
    let url = `${APP_URL}/ai?token=${encodeURIComponent(token)}`;
    if (refreshToken) {
      url += `&refreshToken=${encodeURIComponent(refreshToken)}`;
    }
    window.location.href = url;
  };

  // ─── OTP HANDLERS ───
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && otp.join("").length === 6) verifyOtp();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 0) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) newOtp[i] = pasted[i] || "";
    setOtp(newOtp);
    const focusIdx = Math.min(pasted.length, 5);
    otpRefs.current[focusIdx]?.focus();
    if (pasted.length === 6) {
      // Auto-verify on paste
      setTimeout(() => {
        const code = pasted;
        if (code.length === 6) verifyOtp();
      }, 100);
    }
  };

  const InputIcon = inputIcon;

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
                {step === "input"
                  ? "Sign in to access your AI health assistant"
                  : identifierType === "phone"
                    ? `Enter the OTP sent to +91 ${identifier.trim()}`
                    : `Enter the OTP sent to ${identifier.trim()}`}
              </p>
            </div>

            {/* Input Step */}
            {step === "input" && (
              <div className="space-y-4">
                {/* Smart Input */}
                <div className="flex items-center gap-3 rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-3 focus-within:border-brand-500/40 transition-colors">
                  <InputIcon className="h-5 w-5 text-brand-400 shrink-0" />
                  {detectedType === "phone" && (
                    <span className="text-white/50 shrink-0 text-sm">+91</span>
                  )}
                  <input
                    type="text"
                    placeholder="Email or phone number"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                    className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-lg"
                    autoFocus
                    autoComplete="email tel"
                  />
                </div>

                {/* Type indicator */}
                {identifier.trim() && detectedType && (
                  <p className="text-brand-400/70 text-xs px-1">
                    {detectedType === "email"
                      ? "We'll send a free OTP to your email"
                      : "We'll send a free OTP to your phone via Firebase"}
                  </p>
                )}

                {/* Continue button */}
                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold py-3.5 hover:from-brand-500 hover:to-brand-400 transition-all disabled:opacity-50 btn-shimmer"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Continue <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <span className="text-white/30 text-xs">or</span>
                  <div className="flex-1 h-px bg-white/[0.08]" />
                </div>

                {/* Google Sign In */}
                <button
                  onClick={signInWithGoogle}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white font-medium py-3.5 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all disabled:opacity-50"
                >
                  {googleLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </button>

                {/* Terms */}
                <p className="text-white/25 text-xs text-center leading-relaxed">
                  By signing in, you agree to our{" "}
                  <a href="/terms" className="underline hover:text-white/40">Terms</a>
                  {" "}&{" "}
                  <a href="/privacy" className="underline hover:text-white/40">Privacy Policy</a>
                </p>
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
                      onPaste={i === 0 ? handleOtpPaste : undefined}
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
                  onClick={() => {
                    setStep("input");
                    setError("");
                    setOtp(["", "", "", "", "", ""]);
                    // Cleanup recaptcha
                    if (recaptchaVerifierRef.current) {
                      try { recaptchaVerifierRef.current.clear(); } catch {}
                      recaptchaVerifierRef.current = null;
                    }
                  }}
                  className="w-full text-center text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                  Change {identifierType === "phone" ? "phone number" : "email"}
                </button>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center mt-4">{error}</p>
            )}

            {/* reCAPTCHA container (invisible) */}
            <div ref={recaptchaContainerRef} id="recaptcha-container" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
