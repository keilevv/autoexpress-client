"use client";

import { motion } from "framer-motion";
import { MessageCircle, Camera, Wrench, PackageCheck } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackCTA } from "@/lib/track";
import AnimatedButton from "@/components/motion/AnimatedButton";
import StaggerWords from "@/components/motion/StaggerWords";
import AccentLine from "@/components/motion/AccentLine";
import FadeIn from "@/components/motion/FadeIn";

const STEPS = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Escríbenos por WhatsApp",
    description: "Cuéntanos qué necesita tu vehículo y te respondemos rápido.",
  },
  {
    number: "02",
    icon: Camera,
    title: "Evaluamos tu vehículo",
    description: "Envíanos fotos o agenda una visita al taller para diagnóstico.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Ejecutamos el servicio",
    description: "Realizamos el trabajo con materiales profesionales y procesos claros.",
  },
  {
    number: "04",
    icon: PackageCheck,
    title: "Entrega y recomendaciones",
    description: "Te entregamos el vehículo con recomendaciones de cuidado.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Elevated background */}
      <div className="absolute inset-0 bg-[#0d0f14]" />

      {/* Top/bottom accent edges */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Floating orbs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[120px] pointer-events-none"
        style={{ animation: "float-orb 20s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none"
        style={{ animation: "float-orb-reverse 16s ease-in-out infinite" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <StaggerWords
            text="Así trabajamos"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold"
          />
          <AccentLine />
        </div>

        {/* Steps with animated connecting line (desktop) */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <motion.div
            className="hidden lg:block absolute top-[88px] left-[12.5%] right-[12.5%] h-px"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            style={{
              background: "linear-gradient(90deg, transparent, #E10600, #E10600, transparent)",
              transformOrigin: "left",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group relative"
              >
                <div className="relative bg-surface border border-border rounded-card p-6 h-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/20">
                  {/* Animated number */}
                  <motion.span
                    className="text-4xl font-extrabold block"
                    style={{ color: "rgba(225,6,0,0.25)" }}
                    whileInView={{ opacity: [0, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  >
                    {step.number}
                  </motion.span>

                  {/* Icon with hover scale */}
                  <div className="mt-3 flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300 relative z-10">
                    <step.icon size={22} style={{ color: "#E10600" }} />
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                    {step.description}
                  </p>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-card bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn delay={0.5}>
          <div className="mt-12 text-center">
            <AnimatedButton
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTA("whatsapp_proceso")}
              className="inline-flex items-center gap-2.5 bg-white hover:bg-white/90 text-accent font-semibold px-7 py-3.5 rounded-btn transition-colors text-base shadow-lg shadow-white/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablar ahora por WhatsApp
            </AnimatedButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
