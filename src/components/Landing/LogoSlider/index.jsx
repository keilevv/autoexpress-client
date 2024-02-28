import SegurosBolivarLogo from "../../../assets/icons/seguros-bolivar.svg";
import SuraLogo from "../../../assets/icons/sura.svg";
import SegurosDelEstadoLogo from "../../../assets/icons/seguros-del-estado.svg";
import useViewport from "../../../hooks/useViewport";

import "./style.scss";
function LogoSlider() {
  const { isMobileScreen } = useViewport();
  function renderContent() {
    if (!isMobileScreen) {
      return (
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="container rounded">
              <div className="slider">
                <div className="logos">
                  <img src={SuraLogo} className="fab"></img>
                  <img src={SegurosBolivarLogo} className="fab"></img>
                  <img
                    src={SegurosDelEstadoLogo}
                    className="fab seguros-del-estado"
                  ></img>
                </div>
                <div className="logos">
                  <img src={SuraLogo} className="fab"></img>
                  <img src={SegurosBolivarLogo} className="fab"></img>
                  <img
                    src={SegurosDelEstadoLogo}
                    className="fab seguros-del-estado"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="logos-column">
          <img src={SuraLogo} className="logos-column-item"></img>
          <img
            src={SegurosBolivarLogo}
            className="logos-column-item seguros-bolivar"
          ></img>
          <img src={SegurosDelEstadoLogo} className="logos-column-item"></img>
        </div>
      );
    }
  }
  return renderContent();
}
export default LogoSlider;
