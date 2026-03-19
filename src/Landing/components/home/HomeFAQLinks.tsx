"use client";

import Link from "next/link";
import { ArrowRight, Wrench, Sparkles } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";

const FAQ_LINKS = [
  {
    title: "Preguntas sobre Colisión",
    description: "¿Cuánto tarda? ¿Trabajan con aseguradoras? ¿Qué garantía ofrecen?",
    href: "/colision#faq",
    icon: Wrench,
  },
  {
    title: "Preguntas sobre Detallado",
    description: "¿Necesito detallado? ¿La corrección daña el barniz? ¿Cuánto dura la nanocerámica?",
    href: "/detallado#faq",
    icon: Sparkles,
  },
];

export default function HomeFAQLinks() {
  return (
    <section id="faq" className="relative py-20 lg:py-28 border-t border-border overflow-hidden">
      {/* Animated background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/[0.05] blur-[120px] pointer-events-none"
        style={{ animation: "pulse-glow 10s ease-in-out infinite" }}
      />
      <div
        className="absolute -top-10 -right-10 w-[300px] h-[300px] rounded-full bg-orange-500/[0.04] blur-[80px] pointer-events-none"
        style={{ animation: "float-orb 14s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-[250px] h-[250px] rounded-full bg-accent/[0.04] blur-[90px] pointer-events-none"
        style={{ animation: "float-orb-reverse 18s ease-in-out infinite" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Preguntas frecuentes" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {FAQ_LINKS.map((item, i) => (
            <FadeIn key={item.href} delay={i * 0.1}>
              <Link
                href={item.href}
                className="group flex flex-col gap-4 p-6 bg-surface border border-border rounded-card hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Ver respuestas
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
