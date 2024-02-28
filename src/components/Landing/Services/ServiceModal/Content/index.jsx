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

  if (type === "detailing") {
    return (
      <>
        <ul className="service-modal-subtitle">
          <li className="service-modal-item">Pulido general</li>
        </ul>
        <p>
          Restauramos el brillo y la claridad de la pintura mediante un proceso
          de pulido meticuloso para dejar tu vehículo como nuevo.
        </p>
        <ul className="service-modal-subtitle">
          <li>Lavado de tapicería</li>
        </ul>
        <p>
          Limpiamos a fondo los asientos, alfombras y paneles interiores para
          eliminar manchas y olores, devolviendo el interior de tu vehículo a su
          estado original.
        </p>
        <ul className="service-modal-subtitle">
          <li>Lavado premium de carrocería</li>
        </ul>
        <p>
          Utilizando técnicas de lavado avanzadas y productos de calidad,
          eliminamos la suciedad y los residuos sin dañar la pintura, dejando tu
          vehículo con un aspecto reluciente.
        </p>
        <ul className="service-modal-subtitle">
          <li>Aplicación de nanocerámica</li>
        </ul>
        <p>
          Proteja la pintura de tu vehículo contra los elementos y el desgaste
          diario con nuestro revestimiento de nanocerámica de última generación,
          que proporciona una barrera duradera y resistente a los arañazos.
        </p>
      </>
    );
  }
}

export default ServiceModalContent;
