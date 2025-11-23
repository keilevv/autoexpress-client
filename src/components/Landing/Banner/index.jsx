import background from "../../../assets/images/carousel/entrance-1-min.jpg";
import Logo from "../../../assets/images/autoexpresslogo.png";
import { Button } from "antd";
import useViewport from "../../../hooks/useViewport";
import { useNavigate } from "react-router-dom";
import { WhatsAppOutlined } from "@ant-design/icons";
import RegisteredMarkIcon from "../../../assets/icons/svg/RegisteredMarkIcon";

function Banner({ appointmentRef }) {
  const navigate = useNavigate();
  const { isMobileScreen } = useViewport();

  return (
    <div className="relative flex flex-col bg-[#242424] justify-center duration-300 h-svh items-center overflow-hidden">
      <img
        src={background}
        alt="autoexpress-background"
        className="absolute inset-0 h-full w-full object-cover opacity-10 pointer-events-none"
      />
      <div className="flex justify-center relative z-10">
        <div className="relative inline-block">
          <img
            src={Logo}
            alt="tenant-logo"
            className="tenant-logo max-w-90 mx-auto"
          />
          <RegisteredMarkIcon
            className="absolute right-[10px] top-[10px]"
            width={isMobileScreen ? "20" : "40"}
            height={isMobileScreen ? "20" : "40"}
          />
        </div>
      </div>
      <div
        className={`flex flex-col md:flex-row justify-center gap-2 py-2 relative z-10`}
      >
        <Button
          ghost={true}
          className="banner-actions-button-left"
          size="large"
          icon={<WhatsAppOutlined />}
          onClick={() => {
            window.open(
              "https://api.whatsapp.com/send?phone=3182066879",
              "_blank"
            );
          }}
        >
          Contáctenos por whatsapp
        </Button>
        <Button
          type="secondary"
          size="large"
          onClick={() => {
            navigate("/appointment");
          }}
          className="bg-red-700 hover:bg-red-500 transition-all duration-300 text-white"
        >
          Agende una cita con nosotros
        </Button>
      </div>
      <div className="flex justify-center py-2 gap-4 relative z-10">
        <a href="https://www.instagram.com/autoexpress_._/" target="_blank">
          <i className="text-white text-3xl hover:text-red-700 transition-all duration-300 fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com/ADSANAUTOS" target="_blank">
          <i className="text-white text-3xl hover:text-red-700 transition-all duration-300 fa-brands fa-square-facebook"></i>{" "}
        </a>
        <a href="https://www.youtube.com/@AUTOEXPRESS_CTG" target="_blank">
          <i className="text-white text-3xl hover:text-red-700 transition-all duration-300 fa-brands fa-square-youtube"></i>{" "}
        </a>
      </div>
    </div>
  );
}

export default Banner;
