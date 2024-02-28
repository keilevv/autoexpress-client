import { useState, useEffect } from "react";
/* Components */
import Location from "../../../components/Landing/Location";
import { Row, Col } from "antd";
/* Hooks */
import useViewport from "../../../hooks/useViewport";
/* Style */
import "./style.css";
import LogoSlider from "../../../components/Landing/LogoSlider";
/**
 * @param {{ locationRef: any }} props
 */
function LocationContainer({ locationRef }) {
  const [locationContent, setLocationContent] = useState(null);
  const { isMobileScreen } = useViewport();
  const redirect = () => {
    window.open(
      "https://www.google.com/maps/place/AUTO+EXPRESS+CENTRO+DE+COLISION+Y+DETALLADO/@10.3827167,-75.4685994,15z/data=!4m6!3m5!1s0x8ef625865b88f375:0x6fd6038591599cd2!8m2!3d10.3827167!4d-75.4685994!16s%2Fg%2F1tdrycgx?entry=ttu",
      "_blank"
    );
  };
  return (
    <>
      <section key="location" ref={locationRef}>
        <div className="location-container">
          <div className="location-text-container">
            <h1
              className="location-text"
              onClick={redirect}
              style={{ fontWeight: "500" }}
            >
              Ubicación:
            </h1>
            <h1 className="location-text" onClick={redirect}>
              Cra. 83 #26-18, Medellín, Cartagena de Indias, Provincia de
              Cartagena, Bolívar
            </h1>
          </div>
          <div className="location-map-container">
            <Location />
          </div>
        </div>
      </section>
    </>
  );
}
export default LocationContainer;
