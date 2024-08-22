import SegurosBolivarLogo from "../../../assets/icons/seguros-bolivar.svg";
import SuraLogo from "../../../assets/icons/sura.svg";
import SegurosDelEstadoLogo from "../../../assets/icons/seguros-del-estado.svg";
import MapfreLogo from "../../../assets/icons/mapfre.svg";

import "./style.scss";
function LogoSlider() {
  return (
    <div className="flex flex-wrap justify-center gap-5 lg:gap-20 m-auto align-middle">
      <img src={SuraLogo} className="w-[250px]"></img>
      <img src={SegurosBolivarLogo} className="w-[250px]"></img>
      <img
        src={SegurosDelEstadoLogo}
        className="w-[250px] translate-y-[-10px]"
      ></img>
      <img
        src={MapfreLogo}
        className="w-[250px] h-[30px] sm:mt-10 lg:mt-10 max-w-[250px]"
      ></img>
    </div>
  );
}
export default LogoSlider;
