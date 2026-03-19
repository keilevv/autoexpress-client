"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BlurReveal from "@/components/motion/BlurReveal";
import FadeIn from "@/components/motion/FadeIn";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import type { CenterData } from "@/data/centers";

interface CentroHeroProps {
  center: CenterData;
}

export default function CentroHero({ center }: CentroHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-base">
      {center.heroImage ? (
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={center.heroImage}
            alt={center.name}
            fill
            className="object-cover animate-ken-burns"
            priority
            quality={85}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0">
          <ImagePlaceholder label={center.name} aspectRatio="hero" className="w-full h-full" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24 w-full">
        <div className="max-w-2xl">
          <BlurReveal>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              {center.heroTitle}
            </h1>
          </BlurReveal>

          <FadeIn delay={0.2}>
            <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
              {center.heroSubtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-8">
              <WhatsAppCTA
                label={center.heroCTA}
                center={center.waMessage}
                trackLabel={`whatsapp_hero_${center.slug}`}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
