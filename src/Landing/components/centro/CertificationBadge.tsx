"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Award } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";

const STATS = [
  { label: "Certificación", value: "CESVI", icon: Award },
  { label: "Estándar", value: "Internacional", icon: ShieldCheck },
  { label: "Cobertura", value: "Multimarca", icon: BadgeCheck },
];

export default function CertificationBadge() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative bg-surface border border-border rounded-card p-8 lg:p-10 overflow-hidden">
            {/* Animated accent line at top */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{ background: "linear-gradient(90deg, transparent, #E10600, transparent)", transformOrigin: "left" }}
            />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Pulsing badge icon */}
              <motion.div
                className="relative flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 flex-shrink-0"
                whileInView={{ scale: [1, 1.08, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <div className="absolute inset-0 rounded-full bg-accent/5 animate-ping" style={{ animationDuration: "3s" }} />
                <BadgeCheck size={32} style={{ color: "#E10600" }} />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  Infraestructura, precisión y durabilidad.
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Taller multimarca certificado por{" "}
                  <span className="text-white font-semibold">CESVI Colombia</span>.
                  Contamos con la infraestructura, los procesos y el equipo técnico
                  para garantizar reparaciones con estándares internacionales de calidad.
                </p>
              </div>
            </div>

            {/* Mini stat badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 px-4 py-2 bg-accent/[0.08] border border-accent/20 rounded-full"
                >
                  <stat.icon size={14} style={{ color: "#E10600" }} />
                  <span className="text-xs font-semibold text-white">{stat.value}</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.52)" }}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
