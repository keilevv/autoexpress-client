"use client";

import { Star, Users, Wrench, Instagram } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

const METRICS = [
  {
    icon: Star,
    value: "★★★★★",
    label: "Clientes reales",
    isCounter: false,
  },
  {
    icon: Users,
    value: "+13K",
    label: "Seguidores",
    isCounter: true,
  },
  {
    icon: Wrench,
    value: "Taller",
    label: "Especializado",
    isCounter: false,
  },
  {
    icon: Instagram,
    value: "Resultados",
    label: "En Instagram",
    isCounter: false,
  },
];

export default function SocialProof() {
  return (
    <section
      id="social"
      className="relative py-8 border-y border-border bg-surface/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {METRICS.map((metric, i) => (
            <FadeIn key={metric.label} delay={i * 0.1}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                  <metric.icon size={18} className="text-accent" />
                </div>
                <div>
                  {metric.isCounter ? (
                    <AnimatedCounter value={metric.value} className="text-sm font-bold text-white" />
                  ) : (
                    <p className="text-sm font-bold text-white">{metric.value}</p>
                  )}
                  <p className="text-xs text-muted">{metric.label}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
