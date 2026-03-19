"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServicesByCenter } from "@/data/services";
import type { ServiceData } from "@/data/services";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";

interface RelatedServicesProps {
  currentService: ServiceData;
}

export default function RelatedServices({ currentService }: RelatedServicesProps) {
  const siblings = getServicesByCenter(currentService.center).filter(
    (s) => s.slug !== currentService.slug
  );

  if (siblings.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Otros servicios" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siblings.slice(0, 3).map((service, i) => (
            <FadeIn key={service.slug} delay={i * 0.1}>
              <Link
                href={`/${service.center}/${service.slug}`}
                className="group flex items-center gap-4 p-5 bg-surface border border-border rounded-card hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0">
                  <service.icon size={18} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold mb-0.5">
                    {service.shortTitle}
                  </h3>
                  <p className="text-xs text-muted truncate">
                    {service.description}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0"
                />
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href={`/${currentService.center}`}
              className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
            >
              ← Volver al centro
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
