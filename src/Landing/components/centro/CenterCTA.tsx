"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import type { CenterData } from "@/data/centers";

interface CenterCTAProps {
  center: CenterData;
  otherCenter: CenterData;
}

export default function CenterCTA({ center, otherCenter }: CenterCTAProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-base via-[#0d0f14] to-base" />

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/[0.06] blur-[150px] pointer-events-none" />

      {/* Floating orbs */}
      <div
        className="absolute top-10 left-10 w-[250px] h-[250px] rounded-full bg-accent/[0.04] blur-[80px] pointer-events-none"
        style={{ animation: "float-orb 18s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full bg-indigo-500/[0.03] blur-[80px] pointer-events-none"
        style={{ animation: "float-orb-reverse 14s ease-in-out infinite" }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
            whileInView={{ scale: [0.95, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ¿Listo para empezar?
          </motion.h2>
          <p className="mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.72)" }}>
            Cotiza sin compromiso. Te respondemos rápido por WhatsApp.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppCTA
              label={center.heroCTA}
              center={center.waMessage}
              trackLabel={`whatsapp_cta_${center.slug}`}
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8">
            <Link
              href={`/${otherCenter.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Ver {otherCenter.name}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
