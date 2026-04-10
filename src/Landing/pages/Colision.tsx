import React from 'react';
import Providers from "@/components/Providers";
import MainLayout from "@/components/layout/MainLayout";
import CentroHero from "@/components/centro/CentroHero";
import CertificationBadge from "@/components/centro/CertificationBadge";
import InsurancePartners from "@/components/centro/InsurancePartners";
import ServiceGrid from "@/components/centro/ServiceGrid";
import Process from "@/components/Process";
import FAQAccordion from "@/components/centro/FAQAccordion";
import CenterCTA from "@/components/centro/CenterCTA";
import BeforeAfter from "@/components/BeforeAfter";
import BaslacPartner from "@/components/centro/BaslacPartner";
import { CENTERS } from "@/data/centers";

import "../landing.css";

export default function ColisionPage() {
  return (
    <div className="landing-wrapper">
      <Providers>
        <MainLayout activeCenter="colision">
          <CentroHero center={CENTERS.colision} />
          <CertificationBadge />
          <InsurancePartners />
          <ServiceGrid center="colision" />
          <Process />
          <BeforeAfter />
          <BaslacPartner />
          <FAQAccordion center="colision" />
          <CenterCTA center={CENTERS.colision} otherCenter={CENTERS.detallado} />
        </MainLayout>
      </Providers>
    </div>
  );
}
