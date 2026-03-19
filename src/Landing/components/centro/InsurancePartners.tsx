"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { INSURANCE_PARTNERS } from "@/data/insurance";
import SectionHeader from "@/components/shared/SectionHeader";

export default function InsurancePartners() {
  return (
    <section className="relative py-16 lg:py-20 border-t border-border overflow-hidden">
      {/* Floating orb */}
      <div
        className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none"
        style={{ animation: "float-orb 18s ease-in-out infinite" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Convenios con aseguradoras"
          subtitle="Gestionamos todo el proceso con tu aseguradora para que no tengas que preocuparte."
        />

        <div className="flex flex-wrap items-center justify-center gap-4">
          {INSURANCE_PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="group relative flex items-center gap-3 px-6 py-4 bg-surface border border-border rounded-card cursor-default transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-card bg-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <Shield size={20} style={{ color: "#E10600" }} className="flex-shrink-0 relative z-10" />
              <span className="text-sm font-medium text-white relative z-10">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
