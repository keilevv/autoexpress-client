"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { getFAQsByCenter } from "@/data/faqs";
import type { CenterSlug } from "@/data/centers";
import SectionHeader from "@/components/shared/SectionHeader";

interface FAQAccordionProps {
  center: CenterSlug;
}

export default function FAQAccordion({ center }: FAQAccordionProps) {
  const faqs = getFAQsByCenter(center);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background orb */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Preguntas frecuentes" />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            >
              <div
                className={`bg-surface border rounded-card overflow-hidden transition-all duration-300 ${
                  openId === faq.id
                    ? "border-accent/30 shadow-lg shadow-accent/5"
                    : "border-border hover:border-white/15"
                }`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggle(faq.id)}
                  onKeyDown={(e) => e.key === "Enter" && toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer select-none"
                >
                  <span className="text-sm sm:text-base font-medium" style={{ color: "#E10600" }}>
                    {faq.question}
                  </span>
                  <motion.span
                    className="flex-shrink-0"
                    style={{ color: "#E10600" }}
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openId === faq.id ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </motion.span>
                </div>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
