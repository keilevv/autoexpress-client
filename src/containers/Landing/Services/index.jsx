import { useState } from "react";
/* Components */
import { Row, Col } from "antd";
import ServicesCard from "../../../components/Landing/Services/ServicesCard";
import LogoSlider from "../../../components/Landing/LogoSlider";
/* Hooks */
import useViewport from "../../../hooks/useViewport";
import useCardsConfig from "../../../components/Landing/Services/ServicesCard/useCardsConfig.jsx";

/* Style */
import "./style.css";
/**
 * @param {{ servicesRef: any }} props
 */
function ServicesContainer({ servicesRef }) {
  const { ServicesCardConfig } = useCardsConfig();
  const [open, setOpen] = useState(false);

  function renderServicesContent() {
    return (
      <div className="flex gap-8 flex-wrap justify-center">
        {ServicesCardConfig.map((props) => {
          return (
            <div
              className={`w-[250px]`}
              key={props.key}
              onClick={() => setOpen(!open)}
            >
              <ServicesCard {...props} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <section key="services" ref={servicesRef}>
        <div className="container py-20">
          <h1 className="text-3xl text-center font-semibold mb-20">
            Nuestros servicios
          </h1>
          {renderServicesContent()}
        </div>
      </section>
      <div className="py-20 mb-10">
        <h1 className="text-3xl text-center font-semibold mb-20">
          Aseguradoras aliadas:
        </h1>
        <LogoSlider />
      </div>
    </div>
  );
}
export default ServicesContainer;
