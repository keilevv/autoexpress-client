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
  const { isMobileScreen } = useViewport();

  function renderServicesContent() {
    if (isMobileScreen) {
      const oneColumn = (
        <div className="services-one-column">
          {ServicesCardConfig.map((props) => {
            return (
              <Row justify={"center"} key={props.key}>
                <Col
                  xs={13}
                  sm={8}
                  md={5}
                  key={props.key}
                  style={{ marginTop: "16px" }}
                >
                  <ServicesCard {...props} />
                </Col>
              </Row>
            );
          })}
        </div>
      );
      return oneColumn;
    } else {
      const twoColumns = (
        <div className="services-two-colomns">
          <Row justify={"center"} gutter={16}>
            {ServicesCardConfig.map((props) => {
              if (props.placement === "top") {
                return (
                  <Col xs={8} sm={7} md={7} lg={8} xl={6} key={props.key}>
                    <ServicesCard {...props} />
                  </Col>
                );
              }
            })}
          </Row>
          <Row justify={"center"} gutter={16} style={{ marginTop: "16px" }}>
            {ServicesCardConfig.map((props) => {
              if (props.placement === "bottom") {
                return (
                  <Col xs={8} sm={7} md={7} lg={8} xl={6} key={props.key}>
                    <ServicesCard {...props} />
                  </Col>
                );
              }
            })}
          </Row>
        </div>
      );
      return twoColumns;
    }
  }

  return (
    <div>
      <section key="services" ref={servicesRef}>
        <div className="services-container">
          <h1 className="services-title">Nuestros servicios</h1>
          {renderServicesContent()}
        </div>
      </section>
      <div className="logo-slider-container">
        <h1 className="logo-slider-title">Aseguradoras aliadas: </h1>
        <LogoSlider />
      </div>
    </div>
  );
}
export default ServicesContainer;
