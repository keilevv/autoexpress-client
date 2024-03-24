/**
 * @param {{ type: string }} props
 */
function ServiceModalContent({ type }) {
  if (type === "bodywork") {
    return (
      <>
        <ul className="service-modal-subtitle">
          <li className="service-modal-item">
            Reparación de Golpes y Abolladuras
          </li>
        </ul>
        <p>
          Utilizando técnicas avanzadas y herramientas especializadas,
          restauramos la forma original de la carrocería de tu vehículo.
        </p>
        <ul className="service-modal-subtitle">
          <li>Enderezado de chasis</li>
        </ul>
        <p>
          Corregimos cualquier desalineación en el chasis para garantizar la
          seguridad y el rendimiento óptimo del vehículo.
        </p>
        <ul className="service-modal-subtitle">
          <li>Reemplazo de páneles</li>
        </ul>
        <p>
          Somos expertos en la sustitución de paneles dañados por piezas de alta
          calidad para una apariencia impecable.
        </p>
      </>
    );
  }

  if (type === "paint") {
    return (
      <>
        <ul className="service-modal-subtitle">
          <li className="service-modal-item">Pintura de fábrica</li>
        </ul>
        <p>
          Utilizamos técnicas y materiales que cumplen con los estándares de
          fábrica para restaurar el color y el brillo original de tu vehículo.
        </p>
        <ul className="service-modal-subtitle">
          <li>Pintura personalizada</li>
        </ul>
        <p>
          Transforma tu automóvil con una paleta ilimitada de colores y acabados
          personalizados para reflejar tu estilo único.
        </p>
        <ul className="service-modal-subtitle">
          <li>Correción de defectos</li>
        </ul>
        <p>
          Eliminamos arañazos, marcas de remolinos y otras imperfecciones para
          lograr un acabado perfecto y duradero.
        </p>
      </>
    );
  }

  if (type === "special-services") {
    return (
      <>
        <p className="service-modal-subtitle">
          Servicios de alistamiento y mantenimiento
        </p>
        <ul>
          <li className="item">Lavados profesionales</li>
          <li className="item">Detallado exterior e interior</li>
          <li className="item">Detallado de motor</li>
          <li className="item">Nebulización de aire acondicionado</li>
          <li className="item">Lavado de tapicería</li>
          <li className="item">Restauración de farolas</li>
          <li className="item">Polarizado</li>
        </ul>
        <p className="service-modal-subtitle">Servicios correctivos</p>
        <ul>
          <li className="item">Corrección de pintura</li>
        </ul>
        <p className="service-modal-subtitle">Servicios de protección</p>
        <ul>
          <li className="item">Protección nanocerámcia de largo plazo</li>
          <li className="item">Protección anticorrosiva de chasis</li>
        </ul>
      </>
    );
  }
}

export default ServiceModalContent;
