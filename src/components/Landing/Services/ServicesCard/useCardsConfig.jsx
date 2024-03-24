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
        <li className="item">Pintura de fábrica</li>
        <li className="item">Pintura personalizada</li>
      </ul>
    </>
  );

  const diagnosticDescription = (
    <>
      <ul className="service-card-description list">
        <li className="item">Cotización de reparaciones y partes</li>
        <li className="item">Convenio con aseguradoras</li>
        <li className="item">Reclamo y/o aviso del siniestro</li>
      </ul>
    </>
  );
  const electromecanicDescription = (
    <>
      <p>
        Se detectan fallas y/o partes averiadas y se procede a su reparación o
        sustitución, dejando en optimas condiciones motor y demás sistemas
        electromecánicos.
      </p>
    </>
  );

  const specialServicesDescription = (
    <>
      <ul className="service-card-description list">
        <li className="item">Servicios de alistamiento y mantenimiento</li>
        <li className="item">Servicios correctivos</li>
        <li className="item">Servicios correctivos</li>
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
      // content: <ServiceModalContent type={"paint-bodywork"} />,
      description: bodyworkDescription,
      color: "#F90E0C",
    },
    {
      key: "diagnostic",
      type: "diagnostic",
      placement: "top",
      icon: DiagnosticIcon,
      title: "Diagnostico y peritaje",
      // content: <ServiceModalContent type={"diagnostic"} />,
      description: diagnosticDescription,
      color: "#06823D",
    },
    {
      type: "electromecanic",
      key: "electromecanic",
      placement: "bottom",
      icon: ElectromecanicIcon,
      title: "Electromecánica",
      // content: <ServiceModalContent type={"electromecanic"} />,
      description: electromecanicDescription,
      color: "#126398",
    },
    {
      type: "special-services",
      key: "special-services",
      placement: "bottom",
      icon: SpecialServicesIcon,
      title: "Servicios Especiales",
      content: <ServiceModalContent type={"special-services"} />,

      description: specialServicesDescription,
      color: "#FF9800",
      showMore: true,
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
