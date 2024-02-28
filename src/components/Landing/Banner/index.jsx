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
    <div className="banner-content">
      <div className="tenant-logo-container">
        <img src={Logo} alt="tenant-logo" className="tenant-logo"></img>
      </div>
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
    </div>
  );
}
export default Banner;
