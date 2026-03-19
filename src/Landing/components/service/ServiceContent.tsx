"use client";

import { Check, ShieldCheck, Wrench } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import type { ServiceData } from "@/data/services";

interface ServiceContentProps {
  service: ServiceData;
}

export default function ServiceContent({ service }: ServiceContentProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Descripción y features */}
          <FadeIn>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Sobre este servicio
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                {service.longDescription}
              </p>

              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Wrench size={16} className="text-accent" />
                Qué incluye
              </h3>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-text-secondary">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Beneficios */}
          <FadeIn delay={0.15}>
            <div className="bg-surface border border-border rounded-card p-8">
              <h3 className="text-base font-semibold mb-6 flex items-center gap-2">
                <ShieldCheck size={16} className="text-accent" />
                Beneficios
              </h3>
              <ul className="space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-accent" />
                    </div>
                    <span className="text-sm text-text-secondary">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-sm font-semibold mb-3">
                  ¿Por qué Auto Express?
                </h4>
                <ul className="space-y-2 text-xs text-muted">
                  <li>Confianza y respaldo en cada servicio</li>
                  <li>Procesos documentados y transparentes</li>
                  <li>Resultados visibles y garantizados</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
