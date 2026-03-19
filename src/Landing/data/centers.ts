export interface CenterData {
  slug: "colision" | "detallado";
  name: string;
  shortName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  heroImage: string | null;
  waMessage: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const CENTERS: Record<"colision" | "detallado", CenterData> = {
  colision: {
    slug: "colision",
    name: "Centro de Colisión",
    shortName: "Colisión",
    heroTitle: "Colisión Automotriz en Cartagena.",
    heroSubtitle:
      "Reparación estructural, lámina, pintura y protección anticorrosiva con garantía real.",
    heroCTA: "Cotiza tu reparación",
    heroImage: "/assets/hero/colision-taller.png",
    waMessage: "Hola, quiero cotizar una reparación (Centro de Colisión).",
    seo: {
      title: "Centro de Colisión | Auto Express Cartagena",
      description:
        "Reparación profesional de colisión, lámina, pintura y protección anticorrosiva en Cartagena. Taller certificado CESVI con convenios de aseguradoras.",
      keywords: [
        "colisión Cartagena",
        "reparación carrocería Cartagena",
        "taller colisión Cartagena",
        "pintura automotriz Cartagena",
        "CESVI Colombia",
      ],
    },
  },
  detallado: {
    slug: "detallado",
    name: "Centro de Detallado",
    shortName: "Detallado",
    heroTitle: "Embellecimiento y Detallado Profesional.",
    heroSubtitle:
      "Desde lavado exterior hasta protección nanocerámica y corrección de pintura.",
    heroCTA: "Solicita tu evaluación sin compromiso",
    heroImage: "/assets/hero/Detailing.png",
    waMessage: "Hola, quiero una evaluación estética (Centro de Detallado).",
    seo: {
      title: "Centro de Detallado | Auto Express Cartagena",
      description:
        "Detallado profesional automotriz en Cartagena. Corrección de pintura, protección nanocerámica, lavado de tapicería y embellecimiento integral.",
      keywords: [
        "detallado automotriz Cartagena",
        "corrección pintura Cartagena",
        "nanocerámica Cartagena",
        "detailing Cartagena",
        "protección pintura Cartagena",
      ],
    },
  },
};

export type CenterSlug = "colision" | "detallado";
