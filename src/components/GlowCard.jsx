"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GlowCard({ children, className, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn(
        "group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl p-6 transition-all duration-500",
        "hover:bg-white/[0.06] hover:border-brand-500/30 hover:shadow-[0_0_30px_rgba(0,255,170,0.08)]",
        "hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
