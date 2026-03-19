import {
  Wrench,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  CarFront,
  Wind,
  Gem,
  Brush,
  type LucideIcon,
} from "lucide-react";
import type { CenterSlug } from "./centers";

export interface ServiceData {
  slug: string;
  center: CenterSlug;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  image: string | null;
  waMessage: string;
  features: string[];
  benefits: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const COLISION_SERVICES: ServiceData[] = [
  {
    slug: "lamina-reparacion-estructural",
    center: "colision",
    title: "Lámina y Reparación Estructural",
    shortTitle: "Lámina y Estructura",
    description:
      "Restauración bajo especificaciones de fábrica priorizando seguridad.",
    longDescription:
      "Restauramos la estructura y lámina de tu vehículo bajo especificaciones de fábrica, priorizando la seguridad y el valor de tu inversión. Contamos con bancos de enderezado profesional, sistemas de medición y alineación estructural, y herramientas especializadas para chasis y carrocería.",
    icon: Wrench,
    image: null,
    waMessage: "Lámina y reparación estructural",
    features: [
      "Bancos de enderezado profesional",
      "Sistemas de medición y alineación estructural",
      "Herramientas especializadas para chasis y carrocería",
      "Soldadura MIG/TIG certificada",
    ],
    benefits: [
      "Restauración bajo especificaciones de fábrica",
      "Seguridad estructural garantizada",
      "Procesos documentados paso a paso",
      "Garantía real en cada reparación",
    ],
    seo: {
      title:
        "Lámina y Reparación Estructural | Auto Express Cartagena",
      description:
        "Reparación profesional de lámina y estructura automotriz en Cartagena. Bancos de enderezado, medición digital y soldadura certificada.",
      keywords: [
        "reparación estructural Cartagena",
        "enderezado chasis Cartagena",
        "lámina automotriz Cartagena",
      ],
    },
  },
  {
    slug: "pintura-automotriz",
    center: "colision",
    title: "Pintura Automotriz Profesional",
    shortTitle: "Pintura",
    description:
      "Acabados uniformes y coincidencia precisa del color original.",
    longDescription:
      "Logramos acabados uniformes y coincidencia precisa del color original de tu vehículo. Trabajamos con cabinas de pintura presurizadas, bancos de preparación y acabado, y procesos controlados de aplicación y secado para un resultado de fábrica.",
    icon: Paintbrush,
    image: "/assets/hero/protecciones-prep.png",
    waMessage: "Pintura automotriz profesional",
    features: [
      "Cabinas de pintura presurizadas",
      "Bancos de preparación y acabado",
      "Procesos controlados de aplicación y secado",
      "Coincidencia precisa del color con espectrofotómetro",
    ],
    benefits: [
      "Acabado de fábrica garantizado",
      "Pinturas de alta durabilidad",
      "Proceso controlado en ambiente limpio",
      "Pintura parcial o total disponible",
    ],
    seo: {
      title: "Pintura Automotriz Profesional | Auto Express Cartagena",
      description:
        "Pintura automotriz profesional en Cartagena. Cabinas presurizadas, coincidencia exacta de color y acabado de fábrica.",
      keywords: [
        "pintura automotriz Cartagena",
        "pintura vehículo Cartagena",
        "cabina pintura Cartagena",
      ],
    },
  },
  {
    slug: "proteccion-anticorrosiva",
    center: "colision",
    title: "Protección Anticorrosiva Especializada",
    shortTitle: "Anticorrosivo",
    description:
      "Evaluamos cada vehículo y recomendamos el tratamiento adecuado.",
    longDescription:
      "Evaluamos cada vehículo de forma individual y recomendamos el tratamiento anticorrosivo adecuado. Para vehículos usados ofrecemos correctivos y preventivos. Para vehículos nuevos aplicamos pintura epóxica especializada. Incluye 1 año de garantía + revisiones cada 4 meses sin costo.",
    icon: ShieldCheck,
    image: null,
    waMessage: "Protección anticorrosiva",
    features: [
      "Vehículos usados: tratamientos correctivos y preventivos",
      "Vehículos nuevos: pintura epóxica especializada",
      "1 año de garantía incluido",
      "Revisiones cada 4 meses sin costo",
    ],
    benefits: [
      "Protege la inversión a largo plazo",
      "Evaluación personalizada por vehículo",
      "Garantía real con seguimiento",
      "Productos profesionales de alta durabilidad",
    ],
    seo: {
      title:
        "Protección Anticorrosiva Especializada | Auto Express Cartagena",
      description:
        "Protección anticorrosiva profesional en Cartagena. Tratamientos para vehículos nuevos y usados con garantía de 1 año y revisiones incluidas.",
      keywords: [
        "anticorrosivo Cartagena",
        "protección anticorrosiva vehículo",
        "pintura epóxica automotriz",
      ],
    },
  },
];

export const DETALLADO_SERVICES: ServiceData[] = [
  {
    slug: "detallado-exterior",
    center: "detallado",
    title: "Detallado Exterior",
    shortTitle: "Exterior",
    description:
      "Limpieza y restauración de cada superficie externa del vehículo.",
    longDescription:
      "Realizamos una limpieza profunda y restauración integral de cada superficie exterior de tu vehículo: accesorios exteriores, juntas y empaques, boseles y molduras, partes plásticas y acrílicos, emblemas, pulido de vidrios, y lámparas y stops.",
    icon: Sparkles,
    image: null,
    waMessage: "Detallado exterior",
    features: [
      "Accesorios exteriores",
      "Juntas y empaques",
      "Boseles y molduras",
      "Partes plásticas y acrílicos",
      "Emblemas",
      "Pulido de vidrios",
      "Lámparas y stops",
    ],
    benefits: [
      "Aspecto de vehículo nuevo",
      "Protege superficies del deterioro",
      "Aumenta el valor de reventa",
      "Productos profesionales de alta calidad",
    ],
    seo: {
      title: "Detallado Exterior | Auto Express Cartagena",
      description:
        "Detallado exterior profesional en Cartagena. Limpieza y restauración de vidrios, molduras, emblemas y todas las superficies externas.",
      keywords: [
        "detallado exterior Cartagena",
        "limpieza exterior auto Cartagena",
        "pulido vidrios auto",
      ],
    },
  },
  {
    slug: "detallado-interior",
    center: "detallado",
    title: "Detallado Interior",
    shortTitle: "Interior",
    description:
      "Limpieza profunda de tapicería, paneles, consolas y superficies delicadas.",
    longDescription:
      "Limpieza profunda y detallada de tapicería, paneles, consolas y todas las superficies interiores delicadas de tu vehículo. Tratamos cada material (tela, cuero, plásticos, madera) con productos y técnicas específicas para restaurar su aspecto original.",
    icon: CarFront,
    image: null,
    waMessage: "Detallado interior",
    features: [
      "Limpieza profunda de tapicería",
      "Tratamiento de paneles y consolas",
      "Limpieza de cielo raso y alfombras",
      "Acondicionamiento de cueros",
      "Eliminación de olores",
    ],
    benefits: [
      "Interior como nuevo",
      "Elimina bacterias y alérgenos",
      "Productos seguros para cada material",
      "Restaura el aspecto original",
    ],
    seo: {
      title: "Detallado Interior | Auto Express Cartagena",
      description:
        "Detallado interior profesional en Cartagena. Limpieza profunda de tapicería, paneles, cueros y todas las superficies interiores.",
      keywords: [
        "detallado interior Cartagena",
        "limpieza tapicería auto Cartagena",
        "limpieza interior vehículo",
      ],
    },
  },
  {
    slug: "detallado-motor",
    center: "detallado",
    title: "Detallado de Motor",
    shortTitle: "Motor",
    description:
      "Limpieza especializada cuidando componentes eléctricos.",
    longDescription:
      "Limpieza especializada del compartimiento del motor, cuidando meticulosamente los componentes eléctricos y sensibles. Utilizamos productos desengrasantes profesionales y técnicas que restauran la apariencia del motor sin riesgo para los sistemas electrónicos.",
    icon: Wind,
    image: null,
    waMessage: "Detallado de motor",
    features: [
      "Desengrase profesional del motor",
      "Protección de componentes eléctricos",
      "Limpieza de mangueras y accesorios",
      "Acondicionamiento de plásticos del motor",
    ],
    benefits: [
      "Motor con aspecto de nuevo",
      "Sin riesgo para sistemas electrónicos",
      "Facilita detección de fugas",
      "Aumenta el valor de reventa",
    ],
    seo: {
      title: "Detallado de Motor | Auto Express Cartagena",
      description:
        "Detallado de motor profesional en Cartagena. Limpieza especializada con protección de componentes eléctricos.",
      keywords: [
        "detallado motor Cartagena",
        "limpieza motor auto",
        "desengrase motor profesional",
      ],
    },
  },
  {
    slug: "correccion-pintura",
    center: "detallado",
    title: "Corrección de Pintura",
    shortTitle: "Corrección Pintura",
    description:
      "Eliminamos hasta un 97% de daños superficiales de la pintura.",
    longDescription:
      "Eliminamos hasta un 97% de daños superficiales de la pintura: rayones, marcas de remolino (swirl marks), oxidación y opacidad. Se evalúa el espesor de la pintura con medidor digital antes de cada intervención para garantizar un proceso seguro y efectivo.",
    icon: Gem,
    image: null,
    waMessage: "Corrección de pintura",
    features: [
      "Eliminación de rayones y swirl marks",
      "Corrección de oxidación y opacidad",
      "Medición de espesor de pintura con equipo digital",
      "Pulido en múltiples pasos",
      "Evaluación previa detallada",
    ],
    benefits: [
      "Hasta 97% de daños eliminados",
      "Proceso seguro con medición digital",
      "Brillo de showroom",
      "Prepara la pintura para protecciones",
    ],
    seo: {
      title: "Corrección de Pintura | Auto Express Cartagena",
      description:
        "Corrección de pintura profesional en Cartagena. Eliminamos rayones, swirl marks y opacidad con medición de espesor digital.",
      keywords: [
        "corrección pintura Cartagena",
        "pulido auto Cartagena",
        "eliminar rayones auto",
      ],
    },
  },
  {
    slug: "protecciones-pintura",
    center: "detallado",
    title: "Protecciones de Pintura",
    shortTitle: "Protecciones",
    description:
      "Nanocerámicas, recubrimientos y selladores de alta tecnología.",
    longDescription:
      "Aplicamos protecciones de pintura de alta tecnología para mantener tu vehículo impecable por más tiempo. Desde nanocerámicas y recubrimientos de dureza 7H, 9H y 10H, hasta selladores y ceras técnicas, y reactivadores de brillo para mantenimiento.",
    icon: ShieldCheck,
    image: null,
    waMessage: "Protecciones de pintura",
    features: [
      "Nanocerámicas profesionales",
      "Recubrimientos 7H, 9H, 10H",
      "Selladores y ceras técnicas",
      "Reactivadores de brillo",
    ],
    benefits: [
      "Protección duradera contra agentes externos",
      "Efecto hidrofóbico (repele agua)",
      "Facilita la limpieza diaria",
      "Brillo intenso y prolongado",
    ],
    seo: {
      title: "Protecciones de Pintura | Auto Express Cartagena",
      description:
        "Protección de pintura profesional en Cartagena. Nanocerámicas, recubrimientos 7H-10H, selladores y ceras técnicas.",
      keywords: [
        "nanocerámica Cartagena",
        "protección pintura auto Cartagena",
        "ceramic coating Cartagena",
      ],
    },
  },
  {
    slug: "restauracion-tapiceria",
    center: "detallado",
    title: "Lavado y Restauración de Tapicería",
    shortTitle: "Tapicería",
    description:
      "Tratamiento especializado en tela, cuero y materiales mixtos.",
    longDescription:
      "Tratamiento especializado de lavado y restauración para todo tipo de tapicería: tela, cuero y materiales mixtos. Devolvemos la suavidad, el color y la frescura original a los interiores de tu vehículo con productos profesionales y técnicas avanzadas.",
    icon: Brush,
    image: null,
    waMessage: "Restauración de tapicería",
    features: [
      "Lavado profundo de tapicería en tela",
      "Restauración y acondicionamiento de cuero",
      "Tratamiento de materiales mixtos",
      "Eliminación de manchas difíciles",
      "Hidratación y protección post-lavado",
    ],
    benefits: [
      "Tapicería con aspecto de nueva",
      "Elimina manchas y olores",
      "Prolonga la vida del material",
      "Tratamiento seguro para cada tipo de tela",
    ],
    seo: {
      title:
        "Lavado y Restauración de Tapicería | Auto Express Cartagena",
      description:
        "Restauración de tapicería automotriz en Cartagena. Lavado profundo de tela, cuero y materiales mixtos con productos profesionales.",
      keywords: [
        "restauración tapicería Cartagena",
        "lavado tapicería auto",
        "limpieza cuero auto Cartagena",
      ],
    },
  },
];

export const ALL_SERVICES: ServiceData[] = [
  ...COLISION_SERVICES,
  ...DETALLADO_SERVICES,
];

export function getServiceBySlug(
  center: CenterSlug,
  slug: string
): ServiceData | undefined {
  return ALL_SERVICES.find((s) => s.center === center && s.slug === slug);
}

export function getServicesByCenter(center: CenterSlug): ServiceData[] {
  return ALL_SERVICES.filter((s) => s.center === center);
}
