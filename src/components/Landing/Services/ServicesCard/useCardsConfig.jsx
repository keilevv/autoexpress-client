import ServiceModalContent from "../ServiceModal/Content";
import PaintBodyworkIcon from "../../../../assets/icons/spray-gun-white.png";
import DiagnosticIcon from "../../../../assets/icons/magnifier-white.png";
import ElectromecanicIcon from "../../../../assets/icons/tools-white.png";
import SpecialServicesIcon from "../../../../assets/icons/star-white.png";
import SoatIcon from "../../../../assets/icons/soat-icon.png";

function useCardsConfig() {
  const bodyworkDescription = (
    <ul className="list-disc">
      <li>Golpes y abolladuras</li>
      <li>Enderezado de chasis</li>
      <li>Reemplazo de páneles</li>
      <li>Pintura de fábrica</li>
      <li>Pintura personalizada</li>
    </ul>
  );

  const diagnosticDescription = (
    <ul className="list-disc">
      <li>Cotización de reparaciones</li>
      <li>Convenios con aseguradoras</li>
      <li>Reclamo y/o aviso del siniestro</li>
    </ul>
  );
  const electromecanicDescription = (
    <p>
      Se detectan fallas y/o partes averiadas y se procede a su reparación o
      sustitución, dejando en optimas condiciones motor y demás sistemas
      electromecánicos.
    </p>
  );

  const specialServicesDescription = (
    <ul className="list-disc">
      <li>Alistamiento y mantenimiento</li>
      <li>Servicios correctivos</li>
    </ul>
  );

  const soatDescription = (
    <p>
      Le ofrecemos la venta de SOAT para su vehículo de manera segura y
      confiable por medio de nosotros.
    </p>
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
      title: "Diagnóstico y peritaje",
      // content: <ServiceModalContent type={"diagnostic"} />,
      description: diagnosticDescription,
      color: "#13c2c2",
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
      type: "soat",
      key: "soat",
      placement: "bottom",
      icon: SoatIcon,
      title: "Venta de SOAT",
      content: <ServiceModalContent type={"soat"} />,
      description: soatDescription,
      color: "#7cb305",
      showMore: true,
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
