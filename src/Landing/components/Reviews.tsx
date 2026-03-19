"use client";

import { Star } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerWords from "@/components/motion/StaggerWords";
import AccentLine from "@/components/motion/AccentLine";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/AUTO+EXPRESS+CENTRO+DE+COLISION+Y+DETALLADO/";

const RATING = 4.3;
const TOTAL_REVIEWS = 145;

const REVIEWS = [
  {
    name: "Carlos M.",
    rating: 5,
    date: "Hace 2 meses",
    text: "Excelente atención al cliente. Me entregaron el carro como nuevo, la pintura quedó perfecta. Muy recomendados.",
  },
  {
    name: "Andrea P.",
    rating: 5,
    date: "Hace 3 meses",
    text: "Precios espectaculares y trabajo de primera calidad. El dueño estuvo pendiente de todo el proceso. Volveré sin duda.",
  },
  {
    name: "Jorge L.",
    rating: 5,
    date: "Hace 1 mes",
    text: "Llevé mi camioneta con un golpe fuerte y quedó impecable. Atención personalizada del propietario y cumplieron con el tiempo de entrega.",
  },
  {
    name: "María F.",
    rating: 4,
    date: "Hace 4 meses",
    text: "Muy buen servicio de detailing, mi carro quedó brillante. Los materiales que usan son profesionales. Totalmente recomendados.",
  },
  {
    name: "Roberto D.",
    rating: 5,
    date: "Hace 2 semanas",
    text: "La mejor experiencia en un taller de Cartagena. Transparentes con los procesos y el resultado fue espectacular.",
  },
  {
    name: "Laura G.",
    rating: 5,
    date: "Hace 3 semanas",
    text: "Les confié la pintura completa de mi carro y quedó de showroom. El equipo es muy profesional y amable.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-white/10 text-white/10"
          }
        />
      ))}
    </div>
  );
}

function GoogleStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="relative">
          <Star size={28} className="fill-white/10 text-white/10" />
          {i < full && (
            <Star
              size={28}
              className="absolute inset-0 fill-yellow-400 text-yellow-400"
            />
          )}
          {i === full && partial > 0 && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${partial * 100}%` }}
            >
              <Star size={28} className="fill-yellow-400 text-yellow-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="opiniones" className="relative py-20 lg:py-28 bg-base overflow-hidden">
      {/* Animated background orbs */}
      <div
        className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent/[0.07] blur-[100px] pointer-events-none"
        style={{ animation: "float-orb 18s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full bg-blue-500/[0.05] blur-[100px] pointer-events-none"
        style={{ animation: "float-orb-reverse 22s ease-in-out infinite" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none"
        style={{ animation: "pulse-glow 8s ease-in-out infinite" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <StaggerWords
            text="Opiniones de nuestros clientes"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold"
          />
          <AccentLine />
        </div>

        {/* Google Rating Summary */}
        <FadeIn>
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-3 mb-2">
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-4xl font-extrabold text-white">
                {RATING}
              </span>
              <GoogleStars rating={RATING} />
            </div>
            <p className="text-sm text-muted">
              Basado en{" "}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {TOTAL_REVIEWS} reseñas en Google
              </a>
            </p>
          </div>
        </FadeIn>

        {/* Review Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:snap-none sm:pb-0">
          {REVIEWS.map((review, i) => (
            <FadeIn key={review.name} delay={i * 0.1} className="min-w-[280px] sm:min-w-0 snap-start">
              <div className="bg-surface border border-border rounded-card p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted">{review.date}</p>
                  </div>
                </div>

                {/* Stars */}
                <StarRating rating={review.rating} />

                {/* Text */}
                <p className="mt-3 text-sm text-white/80 leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA to Google */}
        <FadeIn delay={0.5}>
          <div className="mt-10 text-center">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-7 py-3.5 rounded-btn transition-colors text-base backdrop-blur-sm"
            >
              Ver todas las opiniones en Google
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
