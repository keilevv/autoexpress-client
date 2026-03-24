"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Palette, Shield, Target, Headset } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";

const BENEFITS = [
  {
    icon: Palette,
    title: "Miles de referencias",
    desc: "Sistema de colorimetría con miles de referencias actualizadas",
  },
  {
    icon: Shield,
    title: "Alta durabilidad",
    desc: "Pinturas de alta cobertura y durabilidad",
  },
  {
    icon: Target,
    title: "Mezcla exacta",
    desc: "Tecnología de mezcla exacta para una igualación perfecta al color original",
  },
  {
    icon: Headset,
    title: "Soporte técnico",
    desc: "Soporte técnico especializado",
  },
];

export default function BaslacPartner() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Floating orbs */}
      <div
        className="absolute -top-10 -left-20 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none"
        style={{ animation: "float-orb 20s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-blue-500/[0.03] blur-[100px] pointer-events-none"
        style={{ animation: "float-orb 16s ease-in-out infinite reverse" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Nuestro Aliado en Colorimetría"
          subtitle="La combinación perfecta para que tu vehículo luzca como nuevo."
          highlight="Colorimetría"
        />

        {/* Main card */}
        <FadeIn>
          <div className="relative bg-surface border border-border rounded-card overflow-hidden">
            {/* Accent line top */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, #E10600, transparent)",
                transformOrigin: "left",
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Left — Logo + intro */}
              <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-border">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative w-48 h-24 mb-6"
                >
                  <Image
                    src="/assets/results/BASF_baslac_Logo_800.png"
                    alt="Baslac — Aliado oficial"
                    fill
                    className="object-contain"
                  />
                </motion.div>

                <p
                  className="text-sm leading-relaxed max-w-sm"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  Hemos unido fuerzas con{" "}
                  <span className="text-white font-semibold">Baslac</span>,
                  marca líder en sistemas de pintura y colorimetría automotriz,
                  como nuestro aliado estratégico oficial.
                </p>
              </div>

              {/* Right — Content */}
              <div className="lg:col-span-3 p-8 lg:p-10">
                <motion.p
                  className="text-sm leading-relaxed mb-8"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Contamos con acceso a la más amplia gama de colores,
                  herramientas de mezcla de precisión y la tecnología de
                  colorimetría más avanzada del mercado. Tanto si necesitas una
                  reparación puntual como una renovación completa de la
                  carrocería, la combinación de la experiencia de{" "}
                  <span className="text-white font-semibold">AutoExpress</span>{" "}
                  y la calidad de{" "}
                  <span className="text-white font-semibold">Baslac</span>{" "}
                  garantiza una igualación de color perfecta y un acabado
                  profesional.
                </motion.p>

                {/* Benefits grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BENEFITS.map((b, i) => (
                    <motion.div
                      key={b.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.3 + i * 0.1,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent/30 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 flex-shrink-0">
                        <b.icon size={18} style={{ color: "#E10600" }} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {b.title}
                        </h4>
                        <p
                          className="text-xs mt-0.5 leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.52)" }}
                        >
                          {b.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
