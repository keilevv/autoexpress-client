import type { CenterSlug } from "./centers";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  center: CenterSlug;
}

export const COLISION_FAQS: FAQ[] = [
  {
    id: "colision-1",
    question: "¿Cuándo debo afectar mi póliza?",
    answer:
      "Te recomendamos afectar la póliza cuando el costo de reparación supera el deducible. En Auto Express te ayudamos a evaluar tu caso sin compromiso para que tomes la mejor decisión.",
    center: "colision",
  },
  {
    id: "colision-2",
    question: "¿Mi color quedará original?",
    answer:
      "Sí. Utilizamos espectrofotómetros digitales para lograr una coincidencia exacta del color original de fábrica. Además, nuestras cabinas de pintura presurizadas garantizan un acabado uniforme y duradero.",
    center: "colision",
  },
  {
    id: "colision-3",
    question: "¿Qué garantía ofrecen?",
    answer:
      "Ofrecemos garantía real en cada reparación. Los plazos dependen del servicio: la protección anticorrosiva incluye 1 año con revisiones cada 4 meses sin costo. Para pintura y lámina, te explicamos los términos antes de iniciar.",
    center: "colision",
  },
  {
    id: "colision-4",
    question: "¿Trabajan con aseguradoras?",
    answer:
      "Sí. Tenemos convenios con Sura – Suramericana, Mapfre, Seguros Bolívar, Qualitas y Seguros del Estado. Gestionamos todo el proceso con tu aseguradora para que no tengas que preocuparte.",
    center: "colision",
  },
  {
    id: "colision-5",
    question: "¿Cuánto tarda la reparación?",
    answer:
      "El tiempo depende del alcance del daño. Tras la evaluación inicial, te damos un cronograma claro con tiempos estimados. Nuestro compromiso es cumplir con la fecha pactada.",
    center: "colision",
  },
];

export const DETALLADO_FAQS: FAQ[] = [
  {
    id: "detallado-1",
    question: "¿Mi carro necesita detallado si se ve limpio?",
    answer:
      "Sí. Un vehículo puede verse limpio pero tener contaminantes incrustados, micro rayones y oxidación que solo se detectan con inspección profesional. El detallado protege la pintura y mantiene el valor del vehículo.",
    center: "detallado",
  },
  {
    id: "detallado-2",
    question: "¿La corrección de pintura daña el barniz?",
    answer:
      "No, si se hace correctamente. Medimos el espesor de la pintura con equipo digital antes de intervenir para garantizar un proceso seguro. Trabajamos capa por capa, removiendo solo lo necesario.",
    center: "detallado",
  },
  {
    id: "detallado-3",
    question: "¿Cuánto dura una protección nanocerámica?",
    answer:
      "Dependiendo del producto y el mantenimiento, una protección nanocerámica puede durar entre 1 y 5 años. Te recomendamos el producto ideal según tu uso y te damos un plan de mantenimiento.",
    center: "detallado",
  },
  {
    id: "detallado-4",
    question: "¿Cada cuánto hacer mantenimiento estético?",
    answer:
      "Recomendamos un detallado completo cada 3 a 6 meses y un mantenimiento ligero mensual. Si tienes protección nanocerámica, el mantenimiento es más sencillo y espaciado.",
    center: "detallado",
  },
];

export function getFAQsByCenter(center: CenterSlug): FAQ[] {
  return center === "colision" ? COLISION_FAQS : DETALLADO_FAQS;
}
