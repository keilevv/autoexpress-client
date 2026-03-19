import React from 'react';
import Providers from "@/components/Providers";
import MainLayout from "@/components/layout/MainLayout";
import CentroHero from "@/components/centro/CentroHero";
import ServiceGrid from "@/components/centro/ServiceGrid";
import WhyUs from "@/components/WhyUs";
import FAQAccordion from "@/components/centro/FAQAccordion";
import CenterCTA from "@/components/centro/CenterCTA";
import { CENTERS } from "@/data/centers";

import "../landing.css";

export default function DetalladoPage() {
  return (
    <div className="landing-wrapper">
      <Providers>
        <MainLayout activeCenter="detallado">
          <CentroHero center={CENTERS.detallado} />
          <ServiceGrid center="detallado" />
          <WhyUs />
          <FAQAccordion center="detallado" />
          <CenterCTA center={CENTERS.detallado} otherCenter={CENTERS.colision} />
        </MainLayout>
      </Providers>
    </div>
  );
}
