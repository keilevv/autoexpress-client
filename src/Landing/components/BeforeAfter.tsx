"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";

interface ComparisonItem {
  title: string;
  context: string;
  before: string;
  after: string;
}

const COMPARISONS: ComparisonItem[] = [
  {
    title: "Reparación de golpe lateral",
    context: "Puerta y guardafango — pintura + enderezado",
    before: "/assets/results/Dañado 1.png",
    after: "/assets/results/Reparado1.png",
  },
  {
    title: "Pintura completa de capó",
    context: "Corrección de color y sellado cerámico",
    before: "/assets/results/Dañado2.png",
    after: "/assets/results/Reparado2.png",
  },
  {
    title: "Detailing interior profundo",
    context: "Limpieza profunda de tapicería y tablero",
    before: "/assets/results/antes3.jpg",
    after: "/assets/results/despues3.jpg",
  },
];

function ComparisonSlider({ item }: { item: ComparisonItem }) {
  const [position, setPosition] = useState(50);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPosition(Number(e.target.value));
    },
    []
  );

  return (
    <div className="group bg-surface border border-border rounded-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:border-white/15">
      <div className="relative aspect-[4/3] overflow-hidden select-none bg-black">
        {/* After image (full background) */}
        <Image
          src={item.after}
          alt={`${item.title} — después`}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={item.before}
            alt={`${item.title} — antes`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-accent flex items-center justify-center shadow-lg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 8L1 8M1 8L3 6M1 8L3 10M12 8L15 8M15 8L13 6M15 8L13 10"
                stroke="#0B0D10"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-2.5 py-1 rounded z-10">
          Antes
        </span>
        <span className="absolute top-3 right-3 bg-accent/90 text-white text-xs font-semibold px-2.5 py-1 rounded z-10">
          Después
        </span>

        {/* Range input (accessible) */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={handleChange}
          aria-label={`Comparar antes y después: ${item.title}`}
          className="before-after-slider absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.52)" }}>{item.context}</p>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section id="resultados" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Slightly different background */}
      <div className="absolute inset-0 bg-surface/30" />

      {/* Floating orb */}
      <div
        className="absolute top-20 -right-10 w-[350px] h-[350px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none"
        style={{ animation: "float-orb 18s ease-in-out infinite" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Antes / Después"
          subtitle="No prometemos milagros. Mostramos resultados."
          highlight="resultados"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPARISONS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
            >
              <ComparisonSlider item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
