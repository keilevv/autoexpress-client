"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Sparkles, ArrowRight } from "lucide-react";
import type { CenterSlug } from "@/data/centers";
import { CENTERS } from "@/data/centers";
import { getServicesByCenter } from "@/data/services";
import FadeIn from "@/components/motion/FadeIn";

const TABS: { key: CenterSlug; label: string; icon: typeof Wrench }[] = [
  { key: "colision", label: "Colisión", icon: Wrench },
  { key: "detallado", label: "Detallado", icon: Sparkles },
];

const DESCRIPTIONS: Record<CenterSlug, string> = {
  colision:
    "Infraestructura, precisión y durabilidad. Reparamos tu vehículo bajo especificaciones de fábrica con garantía real y seguimiento personalizado.",
  detallado:
    "Transformación, protección y detalle real. Devolvemos el brillo y protegemos cada superficie de tu vehículo con productos profesionales.",
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function CentroSwitcher() {
  const [active, setActive] = useState<CenterSlug>("colision");
  const isColision = active === "colision";
  const data = CENTERS[active];
  const services = getServicesByCenter(active);
  const visibleServices = services.slice(0, 3);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Elevated background — stands out from the rest */}
      <div className="absolute inset-0 bg-[#0f1117]" />

      {/* Top/bottom accent glow edges */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-accent/[0.06] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-accent/[0.06] to-transparent pointer-events-none" />

      {/* Central radial glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[180px] pointer-events-none"
        animate={{
          opacity: isColision ? 0.08 : 0.06,
          background: isColision
            ? "radial-gradient(circle, #E10600, transparent 70%)"
            : "radial-gradient(circle, #7C3AED, transparent 70%)",
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        animate={{
          top: isColision ? "5%" : "55%",
          left: isColision ? "10%" : "60%",
          opacity: isColision ? 0.1 : 0.07,
          background: isColision
            ? "radial-gradient(circle, #E10600, transparent)"
            : "radial-gradient(circle, #7C3AED, transparent)",
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        animate={{
          bottom: isColision ? "10%" : "25%",
          right: isColision ? "5%" : "40%",
          opacity: isColision ? 0.08 : 0.06,
          background: isColision
            ? "radial-gradient(circle, #FF4500, transparent)"
            : "radial-gradient(circle, #3B82F6, transparent)",
        }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Nuestros Centros
            </h2>
            <div className="mt-3 mx-auto w-12 h-0.5 bg-white/40 rounded-full" />
          </div>
        </FadeIn>

        {/* Toggle with glow */}
        <FadeIn delay={0.1}>
          <div className="flex justify-center mb-14">
            <div className="relative">
              {/* Glow behind toggle */}
              <motion.div
                className="absolute -inset-3 rounded-full blur-xl pointer-events-none"
                animate={{
                  background: isColision
                    ? "radial-gradient(circle, rgba(225,6,0,0.2), transparent)"
                    : "radial-gradient(circle, rgba(124,58,237,0.2), transparent)",
                }}
                transition={{ duration: 0.5 }}
              />
              <div className="relative inline-flex bg-surface border border-border rounded-full p-1">
                <motion.div
                  className="absolute top-1 bottom-1 rounded-full bg-accent shadow-lg shadow-accent/30"
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{
                    left: isColision ? "4px" : "50%",
                    right: isColision ? "50%" : "4px",
                  }}
                />
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActive(tab.key)}
                    className={`relative z-10 flex items-center gap-2 px-6 sm:px-8 py-3 text-sm font-semibold rounded-full transition-colors duration-300 cursor-pointer ${
                      active === tab.key
                        ? "text-white"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Animated content */}
        <div className="max-w-2xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease }}
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                {data.name}
              </h3>

              <p className="mt-4 text-text-secondary text-base lg:text-lg leading-relaxed">
                {DESCRIPTIONS[active]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Staggered service pills */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`pills-${active}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
                hidden: {},
              }}
              className="mt-7 flex flex-wrap justify-center gap-2"
            >
              {visibleServices.map((s) => (
                <motion.span
                  key={s.slug}
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                  transition={{ duration: 0.35, ease }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/[0.06] border border-border rounded-full text-xs font-medium text-white/90"
                >
                  <s.icon size={13} className="opacity-70" />
                  {s.shortTitle}
                </motion.span>
              ))}
              {services.length > 3 && (
                <motion.span
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center px-3 py-2 text-xs text-muted"
                >
                  +{services.length - 3} más
                </motion.span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA with entrance */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${active}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, delay: 0.25, ease }}
              className="mt-9"
            >
              <Link
                href={`/${active}`}
                className="group inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-white font-semibold px-7 py-3.5 rounded-btn transition-colors shadow-lg shadow-accent/20"
              >
                {data.heroCTA}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
