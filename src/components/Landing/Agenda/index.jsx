import React, { useState } from "react";
import { Button, Modal } from "antd";
import AgendaContent from "./AgendaContent";
import { useNavigate } from "react-router-dom";
import "./style.css";
function Agenda({ containerRef = null }) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        className="agenda-banner-button"
        size="large"
        onClick={() => navigate("/appointment")}
      >
        Agendar ahora
      </Button>
      <Modal
        className="agenda-modal"
        footer={null}
        title="Agendar cita"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AgendaContent
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </>
  );
}
export default Agenda;
