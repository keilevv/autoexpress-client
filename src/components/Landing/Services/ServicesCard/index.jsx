import { Card } from "antd";
import ServiceModal from "../ServiceModal";
import useViewPort from "../../../../hooks/useViewport";
import "./style.css";
import { useState } from "react";
function ServicesCard(props) {
  const [showText, setShowText] = useState(false);
  const [open, setOpen] = useState(false);
  const { type } = props;
  const { isMobileScreen } = useViewPort();

  const handleCardClick = (show = false) => {
    setShowText(show);
  };

  const renderDescription = () => {
    if (typeof props.description === "string") {
      return (
        <p className={`service-card-description ${showText ? "expanded" : ""}`}>
          {props.description}
        </p>
      );
    }
    return props.description;
  };

  return (
    <>
      <Card
        style={{ width: "100%" }}
        className={`service-card ${showText ? "expanded" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick((prev) => {
            return !prev;
          });
        }}
      >
        <div className="service-icon-container">
          <img src={props.icon} className="service-icon" />
        </div>
        <h2 className="service-card-title">{props.title}</h2>
        {(!isMobileScreen || showText) && (
          <>
            <span
              className={`service-card-description ${
                showText ? "expanded" : ""
              }`}
            >
              {renderDescription()}
            </span>
            {props.type !== "parts" && props.type !== "membership" && (
              <p
                onClick={() => {
                  setOpen(true);
                }}
                className={`service-card-description more ${
                  showText ? "expanded" : ""
                }`}
              >
                Ver más
              </p>
            )}
          </>
        )}
      </Card>
      <ServiceModal open={open} setOpen={setOpen} {...props} />
    </>
  );
}
export default ServicesCard;
