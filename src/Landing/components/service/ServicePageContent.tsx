"use client";

import { notFound } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceContent from "@/components/service/ServiceContent";
import RelatedServices from "@/components/service/RelatedServices";
import BigCTA from "@/components/BigCTA";
import { getServiceBySlug } from "@/data/services";
import { CENTERS, type CenterSlug } from "@/data/centers";

interface ServicePageContentProps {
  center: CenterSlug;
  slug: string;
}

export default function ServicePageContent({ center, slug }: ServicePageContentProps) {
  const service = getServiceBySlug(center, slug);
  if (!service) notFound();

  const centerData = CENTERS[center];

  return (
    <MainLayout activeCenter={center} showContact={false}>
      <ServiceHero service={service} />
      <ServiceContent service={service} />
      <RelatedServices currentService={service} />
      <BigCTA
        heading="¿Necesitas este servicio?"
        highlight="servicio"
        center={centerData.waMessage}
      />
    </MainLayout>
  );
}
