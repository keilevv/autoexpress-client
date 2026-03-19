"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BlurReveal from "@/components/motion/BlurReveal";
import FadeIn from "@/components/motion/FadeIn";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import type { ServiceData } from "@/data/services";
import { CENTERS } from "@/data/centers";

interface ServiceHeroProps {
  service: ServiceData;
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  const center = CENTERS[service.center];

  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-base">
      {service.image ? (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0">
          <ImagePlaceholder label={service.title} aspectRatio="hero" className="w-full h-full" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 lg:pt-36 lg:pb-16 w-full">
        <FadeIn>
          <div className="mb-6">
            <BreadcrumbNav
              items={[
                { label: center.name, href: `/${service.center}` },
                { label: service.shortTitle },
              ]}
            />
          </div>
        </FadeIn>

        <BlurReveal delay={0.1}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight max-w-2xl">
            {service.title}
          </h1>
        </BlurReveal>

        <FadeIn delay={0.25}>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
            {service.description}
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-6">
            <WhatsAppCTA
              label={`Cotizar ${service.shortTitle}`}
              service={service.waMessage}
              trackLabel={`whatsapp_service_${service.slug}`}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
