"use client";

import {
  UserCheck,
  FlaskConical,
  Eye,
  Instagram,
  Truck,
} from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerWords from "@/components/motion/StaggerWords";
import AccentLine from "@/components/motion/AccentLine";

const REASONS = [
  { icon: UserCheck, text: "Técnicos especializados" },
  { icon: FlaskConical, text: "Materiales profesionales" },
  { icon: Eye, text: "Procesos visibles" },
  { icon: Instagram, text: "Resultados reales (Instagram)" },
  { icon: Truck, text: "Entrega responsable" },
];

export default function WhyUs() {
  return (
    <section id="por-que" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <StaggerWords
            text="¿Por qué Auto Express?"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold"
            highlight="Express?"
          />
          <AccentLine />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Checklist */}
          <div className="space-y-5">
            {REASONS.map((reason, i) => (
              <FadeIn key={reason.text} delay={i * 0.1}>
                <div className="flex items-center gap-4 group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0 transition-colors group-hover:bg-accent/20">
                    <reason.icon size={18} className="text-accent" />
                  </div>
                  <span className="text-base font-medium text-text-secondary">
                    {reason.text}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Guarantee card */}
          <FadeIn delay={0.2}>
            <div className="bg-surface border border-border rounded-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20">
              <h3 className="text-lg font-bold mb-3">
                Garantía &amp; Compromiso
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Cada trabajo que entregamos pasa por un proceso de control de
                calidad documentado. Si algo no cumple con el estándar acordado,
                lo corregimos sin costo adicional.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mt-3">
                Trabajamos con materiales de marcas reconocidas y técnicas
                actualizadas para garantizar durabilidad y acabado profesional.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
