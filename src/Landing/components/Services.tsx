"use client";

import Image from "next/image";
import {
  CarFront,
  Paintbrush,
  Shield,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackCTA } from "@/lib/track";
import FadeIn from "@/components/motion/FadeIn";
import StaggerWords from "@/components/motion/StaggerWords";
import AccentLine from "@/components/motion/AccentLine";

const SERVICES = [
  {
    id: "colision",
    title: "Colisión",
    description: "Reparación estructural y de carrocería tras impactos.",
    icon: CarFront,
    image: "/assets/hero/colision-taller.png",
    focus: "center 50%",
    waMessage: "Colisión (reparación de carrocería)",
  },
  {
    id: "pintura",
    title: "Pintura",
    description: "Pintura parcial o total con acabado de fábrica.",
    icon: Paintbrush,
    image: "/assets/hero/pintura-cabina.png",
    focus: "center 50%",
    waMessage: "Pintura automotriz",
  },
  {
    id: "protecciones",
    title: "Protecciones",
    description: "PPF, ceramic coating y protección de superficies.",
    icon: Shield,
    image: "/assets/hero/protecciones-prep.png",
    focus: "center 50%",
    waMessage: "Protecciones (PPF / Ceramic Coating)",
  },
  {
    id: "detailing",
    title: "Detailing",
    description: "Limpieza profunda interior y exterior profesional.",
    icon: Sparkles,
    image: "/assets/hero/Detailing.png",
    focus: "center 50%",
    waMessage: "Detailing profesional",
  },
  {
    id: "calidad",
    title: "Calidad garantizada",
    description: "Procesos documentados y control de calidad en cada paso.",
    icon: BadgeCheck,
    image: "/assets/hero/calidad-cabina.png",
    focus: "center 50%",
    waMessage: "Información sobre garantía de calidad",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <StaggerWords
            text="Servicios"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold"
          />
          <AccentLine />
          <FadeIn delay={0.3}>
            <p className="mt-4 text-text-secondary text-base max-w-md mx-auto">
              Selecciona lo que necesitas y cotiza en minutos.
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.1}>
              <div className="group bg-surface border border-border rounded-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 h-full">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: service.focus }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-full bg-accent/90">
                    <service.icon size={20} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {service.description}
                  </p>
                  <a
                    href={getWhatsAppLink({ service: service.waMessage })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackCTA(`whatsapp_service_${service.id}`)
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-whatsapp bg-whatsapp/10 hover:bg-whatsapp/20 px-4 py-2 rounded-btn transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Cotizar este servicio
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
