"use client";

import { useState } from "react";
import { MapPin, Clock, Phone, Instagram, Facebook, Navigation } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackCTA } from "@/lib/track";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/shared/SectionHeader";

type MapProvider = "google" | "waze";

export default function ContactSection() {
  const [activeMap, setActiveMap] = useState<MapProvider>("google");

  return (
    <section id="contacto" className="py-20 lg:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Contacto" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Dirección</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Cra. 83 #26-18, Medellín, Cartagena de Indias, Bolívar
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0">
                  <Clock size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Horarios</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Lunes a Viernes: 8:00 – 12:00 / 14:00 – 17:00
                    <br />
                    Sábados: 8:00 – 12:30
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0">
                  <Phone size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">WhatsApp</h3>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTA("whatsapp_contacto")}
                    className="text-sm text-whatsapp hover:text-whatsapp/80 transition-colors mt-1 inline-block"
                  >
                    +57 318 206 6879
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0">
                  <Instagram size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Instagram</h3>
                  <a
                    href="https://instagram.com/autoexpressctg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-white transition-colors mt-1 inline-block"
                  >
                    @autoexpressctg
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 flex-shrink-0">
                  <Facebook size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Facebook</h3>
                  <a
                    href="https://www.facebook.com/autoexpressctg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-white transition-colors mt-1 inline-block"
                  >
                    Auto Express CTG
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-4">
              {/* Map toggle */}
              <div className="relative flex bg-surface border border-border rounded-full p-1">
                {/* Sliding indicator */}
                <div
                  className="absolute top-1 bottom-1 rounded-full bg-accent transition-all duration-300 ease-out"
                  style={{
                    width: "calc(50% - 4px)",
                    left: activeMap === "google" ? "4px" : "calc(50% + 0px)",
                  }}
                />
                <button
                  onClick={() => setActiveMap("google")}
                  className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                    activeMap === "google" ? "text-white" : "text-text-secondary hover:text-white"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google Maps
                </button>
                <button
                  onClick={() => setActiveMap("waze")}
                  className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                    activeMap === "waze" ? "text-white" : "text-text-secondary hover:text-white"
                  }`}
                >
                  <Navigation size={16} />
                  Waze
                </button>
              </div>

              {/* Map container */}
              <div className="relative bg-surface border border-border rounded-card overflow-hidden h-[300px]">
                {/* Google Maps */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    activeMap === "google"
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4 pointer-events-none"
                  }`}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.48855539906!2d-75.4685994!3d10.3827167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625865b88f375%3A0x6fd6038591599cd2!2sAUTO%20EXPRESS%20CENTRO%20DE%20COLISION%20Y%20DETALLADO!5e0!3m2!1ses-419!2sco!4v1770395180422!5m2!1ses-419!2sco"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Auto Express en Google Maps"
                    className="w-full h-full"
                  />
                </div>

                {/* Waze */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    activeMap === "waze"
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4 pointer-events-none"
                  }`}
                >
                  <iframe
                    src="https://embed.waze.com/iframe?zoom=16&lat=10.3827167&lon=-75.4685994&pin=1"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Ubicación de Auto Express en Waze"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Open in app button */}
              <a
                href={
                  activeMap === "google"
                    ? "https://www.google.com/maps/place/AUTO+EXPRESS+CENTRO+DE+COLISION+Y+DETALLADO/@10.3827167,-75.4685994,17z"
                    : "https://www.waze.com/ul?ll=10.382717,-75.468599&navigate=yes&zoom=16"
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeMap === "google"
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "bg-[#33CCFF] text-black hover:bg-[#33CCFF]/90"
                }`}
              >
                {activeMap === "google" ? <MapPin size={16} /> : <Navigation size={16} />}
                Abrir en {activeMap === "google" ? "Google Maps" : "Waze"}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
