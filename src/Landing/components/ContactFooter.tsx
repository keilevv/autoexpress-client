"use client";

import Image from "next/image";
import { MapPin, Clock, Phone, Instagram, Facebook } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackCTA } from "@/lib/track";
import FadeIn from "@/components/motion/FadeIn";
import StaggerWords from "@/components/motion/StaggerWords";
import AccentLine from "@/components/motion/AccentLine";

export default function ContactFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Contact Section */}
      <section id="contacto" className="py-20 lg:py-28 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <StaggerWords
              text="Contacto"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold"
            />
            <AccentLine />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Info */}
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
                    {/* TODO: reemplazar con link real de Instagram */}
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
              </div>
            </FadeIn>

            {/* Google Maps */}
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <div className="bg-surface border border-border rounded-card overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.48855539906!2d-75.4685994!3d10.3827167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625865b88f375%3A0x6fd6038591599cd2!2sAUTO%20EXPRESS%20CENTRO%20DE%20COLISION%20Y%20DETALLADO!5e0!3m2!1ses-419!2sco!4v1770395180422!5m2!1ses-419!2sco"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Auto Express en Google Maps"
                    className="w-full"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/place/AUTO+EXPRESS+CENTRO+DE+COLISION+Y+DETALLADO/@10.3827167,-75.4685994,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <MapPin size={16} />
                  Ver en Google Maps
                </a>

                {/* Waze */}
                <div className="bg-surface border border-border rounded-card overflow-hidden">
                  <iframe
                    src="https://embed.waze.com/iframe?zoom=16&lat=10.382717&lon=-75.468599&ct=livemap"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Ubicación de Auto Express en Waze"
                    className="w-full"
                  />
                </div>
                <a
                  href="https://www.waze.com/ul?ll=10.382717,-75.468599&navigate=yes&zoom=16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#33CCFF] text-black text-sm font-medium rounded-lg hover:bg-[#33CCFF]/90 transition-colors"
                >
                  <MapPin size={16} />
                  Ver en Waze
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Logo + descripción */}
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-start">
                <a href="#hero" className="transition-transform hover:scale-105 -ml-6 -mb-6">
                  <Image
                    src="/assets/brand/logo-autoexpress.png"
                    alt="Auto Express Cartagena"
                    width={250}
                    height={250}
                    className="w-auto"
                    style={{ width: "auto", height: "200px" }}
                  />
                </a>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                  Centro especializado en colisión, pintura y detailing automotriz en Cartagena de Indias.
                </p>
              </div>
            </FadeIn>

            {/* Links rápidos */}
            <FadeIn delay={0.25}>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">
                  Navegación
                </h4>
                <nav className="flex flex-col gap-3">
                  {[
                    { label: "Inicio", href: "#hero" },
                    { label: "Servicios", href: "#servicios" },
                    { label: "Opiniones", href: "#opiniones" },
                    { label: "Resultados", href: "#resultados" },
                    { label: "Contacto", href: "#contacto" },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 w-fit"
                    >
                      <span className="w-0 h-px bg-accent transition-all duration-200 group-hover:w-3" />
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </FadeIn>

            {/* Redes sociales */}
            <FadeIn delay={0.4}>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">
                  Síguenos
                </h4>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://instagram.com/autoexpressctg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 group-hover:bg-[#E4405F]/20 group-hover:scale-110 transition-all duration-300">
                      <Instagram size={20} className="text-white group-hover:text-[#E4405F] transition-colors" />
                    </div>
                    <span className="text-sm text-text-secondary group-hover:text-white transition-colors">@autoexpressctg</span>
                  </a>

                  <a
                    href="https://www.facebook.com/autoexpressctg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 group-hover:bg-[#1877F2]/20 group-hover:scale-110 transition-all duration-300">
                      <Facebook size={20} className="text-white group-hover:text-[#1877F2] transition-colors" />
                    </div>
                    <span className="text-sm text-text-secondary group-hover:text-white transition-colors">Auto Express CTG</span>
                  </a>

                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTA("whatsapp_footer")}
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 group-hover:bg-whatsapp/20 group-hover:scale-110 transition-all duration-300">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white group-hover:text-whatsapp transition-colors">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary group-hover:text-white transition-colors">+57 318 206 6879</span>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-xs text-muted text-center">
                &copy; {currentYear} Auto Express Cartagena. Todos los derechos
                reservados. Desarrollado con tecnología propia por{" "}
                <a
                  href="https://dtgrowthpartners.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 transition-colors underline"
                >
                  DT Growth Partners
                </a>
                .
              </p>
          </div>
        </div>
      </footer>
    </>
  );
}
