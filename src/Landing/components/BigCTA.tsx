"use client";

import Link from "next/link";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackCTA } from "@/lib/track";
import FadeIn from "@/components/motion/FadeIn";
import AnimatedButton from "@/components/motion/AnimatedButton";
import StaggerWords from "@/components/motion/StaggerWords";

interface BigCTAProps {
  heading?: string;
  highlight?: string;
  center?: string;
  showCenterLinks?: boolean;
}

export default function BigCTA({
  heading = "¿Tu vehículo necesita reparación o detailing profesional?",
  highlight = "detailing",
  center,
  showCenterLinks = false,
}: BigCTAProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-base via-surface to-base" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <StaggerWords
          text={heading}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
          highlight={highlight}
        />

        <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedButton
              href={getWhatsAppLink({ center })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTA("whatsapp_big_cta")}
              className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-accent font-bold px-10 py-4 rounded-btn transition-colors text-lg shadow-lg shadow-white/25"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablar ahora por WhatsApp
            </AnimatedButton>
          </div>
        </FadeIn>

        {showCenterLinks && (
          <FadeIn delay={0.3}>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/colision"
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
              >
                Ir al Centro de Colisión →
              </Link>
              <Link
                href="/detallado"
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
              >
                Ir al Centro de Detallado →
              </Link>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.35}>
          <p className="mt-5 text-sm text-muted">
            Respuesta rápida en horario laboral.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
