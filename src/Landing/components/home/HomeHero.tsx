"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import BlurReveal from "@/components/motion/BlurReveal";
import FadeIn from "@/components/motion/FadeIn";
import AnimatedButton from "@/components/motion/AnimatedButton";

export default function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-base">
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/assets/hero/hero-bmw-front.png"
          alt="BMW X7 en taller Auto Express Cartagena"
          fill
          className="object-cover animate-ken-burns object-[center_70%] sm:object-center"
          priority
          quality={85}
        />
      </motion.div>

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24 w-full">
        <div className="max-w-3xl">
          <BlurReveal>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Cartagena – Colombia
            </p>
          </BlurReveal>

          <BlurReveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
              AUTOEXPRESS
            </h1>
          </BlurReveal>

          <FadeIn delay={0.2}>
            <p className="mt-2 text-lg sm:text-xl lg:text-2xl text-text-secondary font-medium">
              Centro de Colisión & Centro de Detallado Automotriz
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
              Dos centros especializados. Una sola promesa:{" "}
              <span className="text-white font-semibold">Confianza y Respaldo.</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="mt-4 text-base text-muted max-w-xl leading-relaxed">
              ¿Tu vehículo necesita reparación o transformación estética? Nosotros hacemos ambas.
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <AnimatedButton
                href="/colision"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-white/90 text-accent font-semibold px-7 py-3.5 rounded-btn transition-colors text-base shadow-lg shadow-white/20"
              >
                Centro de Colisión
              </AnimatedButton>
              <Link
                href="/detallado"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-3.5 rounded-btn transition-colors text-base backdrop-blur-sm"
              >
                Centro de Detallado
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.75}>
            <div className="mt-10 flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} className="text-accent" />
              <span>Cartagena de Indias, Colombia</span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
