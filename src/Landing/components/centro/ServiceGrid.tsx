"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { getServicesByCenter } from "@/data/services";
import type { CenterSlug } from "@/data/centers";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import SectionHeader from "@/components/shared/SectionHeader";

interface ServiceGridProps {
  center: CenterSlug;
}

export default function ServiceGrid({ center }: ServiceGridProps) {
  const services = getServicesByCenter(center);
  const [selectedService, setSelectedService] = useState<{ src: string; alt: string; label: string } | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    if (selectedService) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedService]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background orbs */}
      <div
        className="absolute top-10 -left-20 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none"
        style={{ animation: "float-orb 20s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-10 -right-20 w-[300px] h-[300px] rounded-full bg-indigo-500/[0.03] blur-[100px] pointer-events-none"
        style={{ animation: "float-orb-reverse 16s ease-in-out infinite" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Servicios"
          subtitle="Selecciona un servicio para ver la imagen."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
            >
              <div
                onClick={() => setSelectedService({
                  src: service.image || "",
                  alt: service.title,
                  label: service.shortTitle
                })}
                className="group relative bg-surface border border-border rounded-card overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/20"
              >
                {/* Image section */}
                <div className="relative h-48 overflow-hidden">
                  {service.image ? (
                    <>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    </>
                  ) : (
                    <ImagePlaceholder label={service.shortTitle} />
                  )}
                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-full bg-accent/90 shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={20} className="text-white" />
                  </div>
                  {/* Bottom gradient overlay for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                    {service.shortTitle}
                  </h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: "rgba(255,255,255,0.72)" }}>
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#E10600" }}>
                    Ver imagen
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1.5 transition-transform duration-300"
                    />
                  </span>
                </div>

                {/* Hover glow overlay */}
                <div className="absolute inset-0 rounded-card bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden bg-surface border border-border shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:scale-110 transition-all duration-200"
              >
                <X size={20} />
              </button>
              
              <div className="relative w-full h-[60vh] sm:h-[70vh]">
                {selectedService.src ? (
                  <Image
                    src={selectedService.src}
                    alt={selectedService.alt}
                    fill
                    className="object-contain bg-black/20"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full">
                    <ImagePlaceholder label={selectedService.label} />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
