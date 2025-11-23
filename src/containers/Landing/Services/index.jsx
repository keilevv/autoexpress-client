import { useState } from "react";
/* Components */
import ServicesCard from "../../../components/Landing/Services/ServicesCard";
import LogoSlider from "../../../components/Landing/LogoSlider";
/* Hooks */
import useCardsConfig from "../../../components/Landing/Services/ServicesCard/useCardsConfig.jsx";

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
        <div className="flex flex-col pt-20">
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
        <LogoSlider
          heightClasses={[
            "h-12 md:h-14", // Sura
            "h-10 md:h-12", // Seguros Bolívar
            "h-12 md:h-14", // Seguros del Estado
            "h-6  md:h-8", // Mapfre (shorter)
            "h-16 md:h-20", // Quálitas (taller)
          ]}
        />{" "}
      </div>
    </div>
  );
}
export default ServicesContainer;
