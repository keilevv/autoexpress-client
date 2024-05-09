import SegurosBolivarLogo from "../../../assets/icons/seguros-bolivar.svg";
import SuraLogo from "../../../assets/icons/sura.svg";
import SegurosDelEstadoLogo from "../../../assets/icons/seguros-del-estado.svg";
import useViewport from "../../../hooks/useViewport";

import "./style.scss";
function LogoSlider() {
  return (
    <div className="flex flex-wrap justify-center sm:gap-5 lg:gap-20 m-auto">
      <img src={SuraLogo} className="w-[250px]"></img>
      <img src={SegurosBolivarLogo} className="w-[250px]"></img>
      <img src={SegurosDelEstadoLogo} className="w-[250px]"></img>
    </div>
  );
}
export default LogoSlider;
