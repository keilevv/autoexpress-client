"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  CarFront,
  Paintbrush,
  Shield,
  Sparkles,
  BadgeCheck,
  Phone,
  Instagram,
  MapPin,
  Clock,
  Globe,
  Navigation,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackCTA } from "@/lib/track";
import Providers from "@/components/Providers";
import "../landing.css";

/* ─── data ─── */

const SERVICES = [
  {
    id: "colision",
    title: "Colisión",
    desc: "Reparación estructural y de carrocería tras impactos",
    icon: CarFront,
    waMessage: "Colisión (reparación de carrocería)",
    color: "#E10600",
  },
  {
    id: "pintura",
    title: "Pintura",
    desc: "Pintura parcial o total con acabado de fábrica",
    icon: Paintbrush,
    waMessage: "Pintura automotriz",
    color: "#FF4D00",
  },
  {
    id: "protecciones",
    title: "Protecciones",
    desc: "PPF, ceramic coating y protección de superficies",
    icon: Shield,
    waMessage: "Protecciones (PPF / Ceramic Coating)",
    color: "#E10600",
  },
  {
    id: "detailing",
    title: "Detailing",
    desc: "Limpieza profunda interior y exterior profesional",
    icon: Sparkles,
    waMessage: "Detailing profesional",
    color: "#FF4D00",
  },
  {
    id: "calidad",
    title: "Calidad Garantizada",
    desc: "Procesos documentados y control de calidad en cada paso",
    icon: BadgeCheck,
    waMessage: "Información sobre garantía de calidad",
    color: "#E10600",
  },
];

const CONTACT_LINKS = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    subtitle: "+57 318 206 6879",
    icon: Phone,
    href: "", // filled dynamically
    color: "#22C55E",
    track: "whatsapp_linktree",
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "@autoexpressctg",
    icon: Instagram,
    href: "https://instagram.com/autoexpressctg",
    color: "#E1306C",
    track: "instagram_linktree",
  },
  {
    id: "web",
    title: "Sitio Web",
    subtitle: "autoexpressas.com",
    icon: Globe,
    href: "https://autoexpressas.com",
    color: "#E10600",
    track: "web_linktree",
  },
  {
    id: "maps",
    title: "Google Maps",
    subtitle: "Cra. 83 #26-18, Medellín, Cartagena",
    icon: MapPin,
    href: "https://www.google.com/maps/place/AUTO+EXPRESS+CENTRO+DE+COLISION+Y+DETALLADO/@10.3827167,-75.4685994,17z",
    color: "#4285F4",
    track: "maps_linktree",
  },
  {
    id: "waze",
    title: "Waze",
    subtitle: "Navegar al taller",
    icon: Navigation,
    href: "https://www.waze.com/ul?ll=10.382717,-75.468599&navigate=yes&zoom=16",
    color: "#33CCFF",
    track: "waze_linktree",
  },
];

/* ─── floating particles ─── */

function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = Math.random() * 10 + 12;
        const opacity = Math.random() * 0.3 + 0.1;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: "-5%",
              background:
                i % 3 === 0
                  ? `rgba(225, 6, 0, ${opacity})`
                  : `rgba(255, 255, 255, ${opacity * 0.5})`,
            }}
            animate={{
              y: [0, -(typeof window !== "undefined" ? window.innerHeight : 1200) * 1.2],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, opacity, opacity, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}

/* ─── animated background glow ─── */

function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(225,6,0,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(225,6,0,0.05) 0%, transparent 50%)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(225,6,0,0.12) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* ─── animation variants ─── */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ─── WhatsApp icon SVG ─── */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── link card component ─── */

function LinkCard({
  href,
  icon: Icon,
  title,
  subtitle,
  color,
  onClick,
  customIcon,
}: {
  href: string;
  icon: typeof Phone;
  title: string;
  subtitle?: string;
  color: string;
  onClick?: () => void;
  customIcon?: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      variants={itemVariants}
      whileHover={{
        scale: 1.03,
        y: -2,
        boxShadow: `0 8px 30px ${color}20, 0 0 20px ${color}10`,
      }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex items-center gap-4 w-full px-5 py-4 bg-surface/80 backdrop-blur-sm border border-border rounded-card overflow-hidden transition-colors hover:border-white/15"
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}08 0%, transparent 60%)`,
        }}
      />

      {/* icon */}
      <div
        className="relative flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}15` }}
      >
        {customIcon ?? <Icon size={20} style={{ color }} />}
      </div>

      {/* text */}
      <div className="relative flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{title}</p>
        {subtitle && (
          <p className="text-xs text-text-secondary truncate mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* arrow */}
      <ExternalLink
        size={16}
        className="relative text-muted group-hover:text-white transition-colors flex-shrink-0"
      />

      {/* animated border shine */}
      <motion.div
        className="absolute inset-0 rounded-card pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}15, transparent)`,
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </motion.a>
  );
}

/* ─── schedule badge ─── */

function ScheduleBadge() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeNum = hour + minute / 60;

  let isOpen = false;
  if (day >= 1 && day <= 5) {
    isOpen = (timeNum >= 8 && timeNum < 12) || (timeNum >= 14 && timeNum < 17);
  } else if (day === 6) {
    isOpen = timeNum >= 8 && timeNum < 12.5;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/80 backdrop-blur-sm border border-border text-xs"
    >
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: isOpen ? "#22C55E" : "#EF4444" }}
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-text-secondary">
        {isOpen ? "Abierto ahora" : "Cerrado ahora"}
      </span>
      <Clock size={12} className="text-muted" />
    </motion.div>
  );
}

/* ─── main page ─── */

export default function LinkPage() {
  const [servicesOpen, setServicesOpen] = useState(true);

  return (
    <div className="landing-wrapper">
      <Providers>
        <main className="relative min-h-screen bg-base flex flex-col items-center overflow-hidden">
      <BackgroundGlow />
      <Particles />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-10 flex flex-col items-center gap-6">
        {/* ── avatar / logo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
          className="relative"
        >
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-accent/50 shadow-lg shadow-accent/20 bg-surface flex items-center justify-center">
            <Image
              src="/assets/brand/logo-autoexpress.png"
              alt="Auto Express"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
          {/* pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent/30"
            animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.div>

        {/* ── title ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-xl font-bold tracking-tight">
            Auto Express{" "}
            <span className="text-accent">Cartagena</span>
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Colisión &middot; Pintura &middot; Protecciones &middot; Detailing
          </p>
        </motion.div>

        {/* ── schedule ── */}
        <ScheduleBadge />

        {/* ── horarios ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-muted space-y-0.5"
        >
          <p>Lun - Vie: 8:00 – 12:00 / 14:00 – 17:00</p>
          <p>Sáb: 8:00 – 12:30</p>
        </motion.div>

        {/* ── CTA principal WhatsApp ── */}
        <motion.a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTA("whatsapp_linktree_main")}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(34,197,94,0.3)" }}
          whileTap={{ scale: 0.96 }}
          className="relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp text-white font-semibold rounded-card text-base shadow-lg shadow-whatsapp/20 overflow-hidden"
        >
          {/* shimmer effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <WhatsAppIcon className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Cotizar por WhatsApp</span>
        </motion.a>

        {/* ── services section ── */}
        <div className="w-full space-y-3">
          {/* collapsible header */}
          <motion.button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="flex items-center justify-between w-full px-1 py-2 text-left"
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Servicios
            </span>
            <motion.span
              animate={{ rotate: servicesOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} className="text-muted" />
            </motion.span>
          </motion.button>

          <AnimatePresence initial={false}>
            {servicesOpen && (
              <motion.div
                key="services"
                initial="hidden"
                animate="visible"
                exit={{ height: 0, opacity: 0 }}
                variants={{
                  hidden: { height: 0, opacity: 0 },
                  visible: {
                    height: "auto",
                    opacity: 1,
                    transition: {
                      duration: 0.4,
                      ease: "easeInOut",
                      staggerChildren: 0.08,
                      when: "beforeChildren",
                    },
                  },
                }}
                className="overflow-hidden space-y-3"
              >
                {SERVICES.map((service) => (
                  <LinkCard
                    key={service.id}
                    href={getWhatsAppLink({ service: service.waMessage })}
                    icon={service.icon}
                    title={service.title}
                    subtitle={service.desc}
                    color={service.color}
                    onClick={() =>
                      trackCTA(`whatsapp_linktree_${service.id}`)
                    }
                    customIcon={
                      <service.icon size={20} style={{ color: service.color }} />
                    }
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── contact section ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full space-y-3"
        >
          <div className="px-1 py-2">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Contacto
            </span>
          </div>

          {CONTACT_LINKS.map((link) => (
            <LinkCard
              key={link.id}
              href={link.id === "whatsapp" ? getWhatsAppLink() : link.href}
              icon={link.icon}
              title={link.title}
              subtitle={link.subtitle}
              color={link.color}
              onClick={() => trackCTA(link.track)}
              customIcon={
                link.id === "whatsapp" ? (
                  <WhatsAppIcon className="w-5 h-5 text-whatsapp" />
                ) : undefined
              }
            />
          ))}
        </motion.div>

        {/* ── address card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="w-full bg-surface/60 backdrop-blur-sm border border-border rounded-card p-5 text-center space-y-2"
        >
          <MapPin size={18} className="text-accent mx-auto" />
          <p className="text-sm font-medium">
            Cra. 83 #26-18, Medellín
          </p>
          <p className="text-xs text-text-secondary">
            Cartagena de Indias, Bolívar
          </p>
        </motion.div>

        {/* ── footer ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center space-y-2 pt-4 pb-6"
        >
          <a
            href="/"
            className="text-xs text-accent hover:text-accent-hover transition-colors"
          >
            autoexpressas.com
          </a>
          <p className="text-[10px] text-muted">
            &copy; {new Date().getFullYear()} Auto Express Cartagena
          </p>
          <p className="text-[10px] text-muted/60">
            Desarrollado por{" "}
            <a
              href="https://dtgrowthpartners.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent/60 hover:text-accent transition-colors"
            >
              DT Growth Partners
            </a>
          </p>
        </motion.footer>
      </div>
    </main>
      </Providers>
    </div>
  );
}
