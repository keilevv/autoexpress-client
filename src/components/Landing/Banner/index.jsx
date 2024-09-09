import Logo from "../../../assets/images/autoexpresslogo.png";
import { Button } from "antd";
import useViewport from "../../../hooks/useViewport";
import { useNavigate } from "react-router-dom";
import { WhatsAppOutlined } from "@ant-design/icons";
import RegisteredMarkIcon from "../../../assets/icons/svg/RegisteredMarkIcon";
import "./style.css";

function Banner({ appointmentRef }) {
  const navigate = useNavigate();
  const { isMobileScreen } = useViewport();

  return (
    <div className="container">
      <div className="flex justify-center">
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
      <div className={`banner-actions`}>
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
          className={`banner-actions-button ${isMobileScreen ? "mobile" : ""}`}
          size="large"
          onClick={() => {
            navigate("/appointment");
          }}
        >
          Agende una cita con nosotros
        </Button>
      </div>
      <div className="banner-socials">
        <a href="https://www.instagram.com/autoexpress_ctg/" target="_blank">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com/ADSANAUTOS" target="_blank">
          <i className="fa-brands fa-square-facebook"></i>{" "}
        </a>
        <a href="https://www.youtube.com/@AUTOEXPRESS_CTG" target="_blank">
          <i className="fa-brands fa-square-youtube"></i>{" "}
        </a>
      </div>
    </div>
  );
}

export default Banner;
