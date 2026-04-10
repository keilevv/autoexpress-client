import React from 'react';
import Providers from "@/components/Providers";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import { MoveLeft, AlertTriangle } from "lucide-react";

import "../landing.css";

export default function NotFound() {
  return (
    <div className="landing-wrapper">
      <Providers>
        <MainLayout showContact={false}>
          <div className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 overflow-hidden">
            {/* Background Orbs from landing.css */}
            <div 
              className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float-orb" 
              style={{ pointerEvents: 'none' }}
            />
            <div 
              className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float-orb-reverse" 
              style={{ pointerEvents: 'none' }}
            />

            <FadeIn>
              <div className="text-center relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="bg-accent/10 p-4 rounded-2xl border border-accent/20 animate-pulse-glow">
                    <AlertTriangle className="w-12 h-12 text-accent" />
                  </div>
                </div>

                <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter mb-4 leading-none" 
                    style={{ fontFamily: "'Zen Dots', sans-serif" }}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                    404
                  </span>
                </h1>

                <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-white">
                  ¡Ups! Ruta no encontrada
                </h2>

                <p className="text-text-secondary text-lg max-w-md mx-auto mb-10 leading-relaxed">
                  Parece que te has desviado del camino. Déjanos ayudarte a regresar a la ruta principal para seguir cuidando tu vehículo.
                </p>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-btn transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(225,6,0,0.3)]"
                >
                  <MoveLeft size={20} />
                  Volver al Inicio
                </Link>
              </div>
            </FadeIn>
          </div>
        </MainLayout>
      </Providers>
    </div>
  );
}
