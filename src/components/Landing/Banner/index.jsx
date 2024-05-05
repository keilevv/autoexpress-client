import Logo from "../../../assets/images/autoexpresslogo.png";
import { Button } from "antd";
import useViewport from "../../../hooks/useViewport";
import { WhatsAppOutlined } from "@ant-design/icons";
import "./style.css";
/**
 * @param {{  agendaRef: any }} props
 */
function Banner({ agendaRef }) {
  const { isMobileScreen } = useViewport();
  return (
    <div className="container">
      <img src={Logo} alt="tenant-logo" className="tenant-logo max-w-90 mx-auto"></img>
      <div className={`banner-actions`}>
        <Button
          ghost={true}
          className="banner-actions-button-left"
          size="large"
          icon={<WhatsAppOutlined />}
          onClick={() => {
            window.open(
              "https://api.whatsapp.com/send?phone=3157414153",
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
            agendaRef?.current?.scrollIntoView({ behavior: "smooth" });
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
