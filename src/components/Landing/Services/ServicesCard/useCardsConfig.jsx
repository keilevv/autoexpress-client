import BodyWorkIcon from "../../../../assets/icons/piston-icon.png";
import PaintIcon from "../../../../assets/icons/car-wash-icon.png";
import DetailingIcon from "../../../../assets/icons/brakes-icon.png";
import PartsIcon from "../../../../assets/icons/wheel-icon.png";
import MembershipIcon from "../../../../assets/icons/transmission-icon.png";
import ServiceModalContent from "../ServiceModal/Content";

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
      key: "bodywork",
      type: "bodywork",
      placement: "top",
      icon: BodyWorkIcon,
      title: "Latonería",
      content: <ServiceModalContent type={"bodywork"} />,
      description: bodyworkDescription,
    },
    {
      key: "paint",
      type: "paint",
      placement: "top",
      icon: PaintIcon,
      title: "Pintura",
      content: <ServiceModalContent type={"paint"} />,
      description: paintDescription,
    },
    {
      type: "detailing",
      key: "detailing",
      placement: "bottom",
      icon: DetailingIcon,
      title: "Detailing",
      content: <ServiceModalContent type={"detailing"} />,
      description: detailingDescription,
    },
    {
      type: "parts",
      key: "parts",
      placement: "bottom",
      icon: PartsIcon,
      title: "Repuestos",
      description:
        "Importamos repuestos originales con proveedores de confianza para cualquier marca.",
    },
    {
      key: "membership",
      type: "membership",
      placement: "bottom",
      icon: MembershipIcon,
      title: "Membresía",
      description:
        "¡Espere próximamente nuestro plan para miembros amantes de su vehículo!",
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
