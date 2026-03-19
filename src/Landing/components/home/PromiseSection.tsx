"use client";

import Link from "next/link";
import { Wrench, Sparkles, ArrowRight } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";

const CENTERS_PREVIEW = [
  {
    icon: Wrench,
    title: "Centro de Colisión",
    description:
      "Reparación estructural, lámina, pintura y protección anticorrosiva. Taller multimarca certificado por CESVI Colombia con convenios de aseguradoras.",
    href: "/colision",
    highlights: ["Certificación CESVI", "Convenios aseguradoras", "Garantía real"],
  },
  {
    icon: Sparkles,
    title: "Centro de Detallado",
    description:
      "Desde lavado exterior hasta protección nanocerámica y corrección de pintura. Transformación estética con resultados visibles.",
    href: "/detallado",
    highlights: ["Nanocerámicas profesionales", "Corrección de pintura", "Detallado integral"],
  },
];

export default function PromiseSection() {
  return (
    <section className="relative py-20 lg:py-28 border-t border-border overflow-hidden">
      {/* Animated background mesh */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-[120px] pointer-events-none"
        style={{ animation: "float-orb 20s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.04] blur-[100px] pointer-events-none"
        style={{ animation: "float-orb-reverse 16s ease-in-out infinite" }}
      />
      <div
        className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-white/[0.02] blur-[80px] pointer-events-none"
        style={{ animation: "drift-slow 12s ease-in-out infinite" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Dos centros, una promesa"
          subtitle="Confianza y respaldo en cada servicio que realizamos."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CENTERS_PREVIEW.map((center, i) => (
            <FadeIn key={center.href} delay={i * 0.15}>
              <div className="group bg-surface border border-border rounded-card p-8 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10">
                    <center.icon size={22} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">{center.title}</h3>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {center.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {center.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-medium bg-accent/10 text-accent px-3 py-1 rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <Link
                  href={center.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  Conocer más
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
