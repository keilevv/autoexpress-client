import ServiceModalContent from "../ServiceModal/Content";
import PaintBodyworkIcon from "../../../../assets/icons/spray-gun-white.png";
import DiagnosticIcon from "../../../../assets/icons/magnifier-white.png";
import ElectromecanicIcon from "../../../../assets/icons/tools-white.png";
import SpecialServicesIcon from "../../../../assets/icons/star-white.png";

function useCardsConfig() {
  const bodyworkDescription = (
    <>
      <ul className="service-card-description list">
        <li className="item">Golpes y abolladuras</li>
        <li className="item">Enderezado de chasis</li>
        <li className="item">Reemplazo de páneles</li>
      </ul>
    </>
  );

  const paintDescription = (
    <>
      <ul className="service-card-description list">
        <li className="item">Pintura de fábrica</li>
        <li className="item">Pintura personalizada</li>
        <li className="item">Correción de defectos</li>
      </ul>
    </>
  );

  const detailingDescription = (
    <>
      <ul className="service-card-description list">
        <li className="item">Pulido general</li>
        <li className="item">Lavado de tapicería</li>
        <li className="item">Lavado premium de carrocería</li>
        <li className="item">Aplicación de nanocerámica</li>
      </ul>
    </>
  );
  const ServicesCardConfig = [
    {
      key: "paint-bodywork",
      type: "paint-bodywork",
      placement: "top",
      icon: PaintBodyworkIcon,
      title: "Latonería y pintura",
      content: <ServiceModalContent type={"paint-bodywork"} />,
      description: bodyworkDescription,
      color: "#F90E0C",
    },
    {
      key: "diagnostic",
      type: "diagnostic",
      placement: "top",
      icon: DiagnosticIcon,
      title: "Diagnostico y peritaje",
      content: <ServiceModalContent type={"diagnostic"} />,
      description: paintDescription,
      color: "#06823D",
    },
    {
      type: "electromecanic",
      key: "electromecanic",
      placement: "bottom",
      icon: ElectromecanicIcon,
      title: "Electromecánica",
      content: <ServiceModalContent type={"electromecanic"} />,
      description: detailingDescription,
      color: "#126398",
    },
    {
      type: "special-services",
      key: "special-services",
      placement: "bottom",
      icon: SpecialServicesIcon,
      title: "Servicios Especiales",
      description:
        "Importamos repuestos originales con proveedores de confianza para cualquier marca.",

      color: "#FF9800",
    },
  ];
  function getCardContent(key = "") {
    ServicesCardConfig.forEach((cardConfig) => {
      if (key === cardConfig.key) {
        return cardConfig;
      }
    });
  }

  return { ServicesCardConfig, getCardContent };
}

export default useCardsConfig;
