"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Send, Sparkles, ArrowLeft, Activity, Pill, FileText,
  FlaskConical, Download, Smartphone, Mic, MessageSquare,
  Loader2, X,
} from "lucide-react";
import LoginModal from "@/components/LoginModal";
import {
  checkLoggedIn, getJWT, setJWT, canQuery, incrementQueryCount,
  getRemainingQueries, ANON_LIMIT, AUTH_LIMIT,
} from "@/lib/chatAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.godavaii.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.godavaii.com";

const PROMPT_CHIPS = [
  { label: "Symptoms", icon: Activity, q: "I have a headache and mild fever since morning, what should I do?" },
  { label: "Medicine", icon: Pill, q: "What are the side effects of Paracetamol?" },
  { label: "Prescription", icon: FileText, q: "How do I read my prescription?" },
  { label: "Lab Reports", icon: FlaskConical, q: "What does high HbA1c mean in my blood test?" },
];

let msgId = 0;
function nextId() { return `msg-${++msgId}-${Date.now()}`; }

export default function AIChatClient() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingMsgId, setTypingMsgId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [limitMessage, setLimitMessage] = useState("");
  const [showDownloadBanner, setShowDownloadBanner] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const initialSent = useRef(false);

  // Init: check auth + handle ?q= param
  useEffect(() => {
    setLoggedIn(checkLoggedIn());
    const q = searchParams.get("q");
    if (q && !initialSent.current) {
      initialSent.current = true;
      setInput(q);
      // Auto-send after a small delay
      setTimeout(() => sendMessage(q), 300);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingText, isTyping]);

  // Typewriter effect
  const typewriterEffect = useCallback((text, id) => {
    setTypingMsgId(id);
    setTypingText("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypingText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTypingMsgId(null);
        // Update the message with full text
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, content: text, typing: false } : m))
        );
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (overrideInput) => {
    const text = (overrideInput || input).trim();
    if (!text || isTyping) return;

    const isAuth = checkLoggedIn();
    setLoggedIn(isAuth);

    // Rate limit check
    if (!canQuery(isAuth)) {
      if (!isAuth) {
        setLimitMessage(`You've used your ${ANON_LIMIT} free queries today. Sign in for ${AUTH_LIMIT} more!`);
        setShowLogin(true);
      } else {
        setShowDownloadBanner(true);
      }
      return;
    }

    // Add user message
    const userId = nextId();
    const assistantId = nextId();
    setMessages((prev) => [...prev, { id: userId, role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    // Build last-message context
    const lastPair = [];
    const currentMsgs = [...messages];
    if (currentMsgs.length >= 2) {
      const last2 = currentMsgs.slice(-2);
      lastPair.push(
        { role: last2[0].role, content: last2[0].content },
        { role: last2[1].role, content: last2[1].content }
      );
    }

    try {
      const headers = { "Content-Type": "application/json" };
      const jwt = getJWT();
      if (jwt) headers["Authorization"] = `Bearer ${jwt}`;

      const res = await fetch(`${API_URL}/api/ai/website-chat`, {
        method: "POST",
        headers,
        body: JSON.stringify({ message: text, history: lastPair }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI request failed");
      }

      const reply = data.reply || "Sorry, I couldn't generate a response.";

      // Add assistant message (with typing flag)
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", typing: true },
      ]);
      setIsTyping(false);

      // Start typewriter
      typewriterEffect(reply, assistantId);

      // Increment query count
      incrementQueryCount();
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          error: true,
        },
      ]);
    }
  };

  const handleLoginSuccess = (token) => {
    setLoggedIn(true);
    setShowLogin(false);
    setLimitMessage("");
  };

  const remaining = getRemainingQueries(loggedIn);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <Sparkles className="h-5 w-5 text-brand-400" />
            <span className="font-bold">GoDavaii</span>
            <span className="text-brand-400 text-xs font-medium">AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-white/30 text-xs hidden sm:inline">
              {remaining} {remaining === 1 ? "query" : "queries"} left today
            </span>
            {!loggedIn && (
              <button
                onClick={() => setShowLogin(true)}
                className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm text-white/60 hover:bg-white/[0.08] hover:text-white transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 pt-16 pb-36 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4">
          {/* Welcome Screen */}
          {messages.length === 0 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <Sparkles className="h-10 w-10 text-brand-400 mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
                Ask GoDavaii AI
              </h1>
              <p className="text-white/40 text-sm mb-8 max-w-md">
                Ask any health question. Get instant answers about symptoms,
                medicines, side effects, and more.
              </p>

              {/* Prompt Chips */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {PROMPT_CHIPS.map(({ label, icon: Icon, q }) => (
                  <button
                    key={label}
                    onClick={() => { setInput(q); sendMessage(q); }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50 text-sm hover:bg-white/[0.08] hover:text-white/80 hover:border-brand-500/20 transition-all"
                  >
                    <Icon className="h-4 w-4 text-brand-400/60" />
                    {label}
                  </button>
                ))}
              </div>

              <p className="text-white/20 text-xs">
                {loggedIn
                  ? `${remaining} free queries remaining today`
                  : `${ANON_LIMIT} free queries. Sign in for ${AUTH_LIMIT}.`}
              </p>
            </motion.div>
          )}

          {/* Message Bubbles */}
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-br-md"
                    : msg.error
                      ? "bg-red-500/10 border border-red-500/20 text-red-300 rounded-bl-md"
                      : "bg-white/[0.04] border border-white/[0.06] text-white/80 rounded-bl-md"
                }`}
              >
                {/* Show typing text or final content */}
                <div className="whitespace-pre-wrap">
                  {msg.typing && typingMsgId === msg.id
                    ? typingText
                    : msg.content}
                  {msg.typing && typingMsgId === msg.id && (
                    <span className="inline-block w-0.5 h-4 bg-brand-400 ml-0.5 animate-pulse" />
                  )}
                </div>

                {/* Smart CTAs — show after AI response is complete */}
                {msg.role === "assistant" && !msg.typing && !msg.error && (
                  <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap gap-2">
                    <a
                      href={`${APP_URL}/ai`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/40 text-xs hover:bg-white/[0.08] hover:text-white/60 transition-all"
                    >
                      <Smartphone className="h-3 w-3" /> Detailed analysis on App
                    </a>
                    <a
                      href={`${APP_URL}/medicines`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/40 text-xs hover:bg-white/[0.08] hover:text-white/60 transition-all"
                    >
                      <Pill className="h-3 w-3" /> Order medicines
                    </a>
                    <a
                      href={`${APP_URL}/ai`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/40 text-xs hover:bg-white/[0.08] hover:text-white/60 transition-all"
                    >
                      <Mic className="h-3 w-3" /> Voice chat 16 languages
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-brand-400/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-brand-400/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-brand-400/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Download App Banner */}
      <AnimatePresence>
        {showDownloadBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowDownloadBanner(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-[#111]/95 border border-white/[0.08] backdrop-blur-xl p-8 text-center shadow-2xl"
            >
              <Download className="h-10 w-10 text-brand-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                You&apos;ve used all free queries today
              </h3>
              <p className="text-white/50 text-sm mb-6">
                Download the GoDavaii App for unlimited AI health assistant,
                voice chat in 16 languages, medicine ordering, and more.
              </p>
              <a
                href={APP_URL}
                className="block w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold hover:from-brand-500 hover:to-brand-400 transition-all mb-3"
              >
                Download GoDavaii App
              </a>
              <button
                onClick={() => setShowDownloadBanner(false)}
                className="text-white/30 text-sm hover:text-white/50 transition-colors"
              >
                Queries reset at midnight
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar */}
      <div className="fixed bottom-0 w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent pt-6 pb-4 z-40">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-xl focus-within:border-brand-500/30 transition-colors">
            <MessageSquare className="h-5 w-5 text-brand-400/50 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask a health question..."
              className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
              disabled={isTyping}
              autoFocus
            />
            <button
              onClick={() => sendMessage()}
              disabled={isTyping || !input.trim()}
              className="p-2 rounded-lg bg-brand-500/20 text-brand-400 hover:bg-brand-500/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-white/15 text-xs text-center mt-2">
            GoDavaii AI can make mistakes. Not a substitute for professional medical advice.
          </p>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => { setShowLogin(false); setLimitMessage(""); }}
        onSuccess={handleLoginSuccess}
        message={limitMessage}
      />
    </div>
  );
}
