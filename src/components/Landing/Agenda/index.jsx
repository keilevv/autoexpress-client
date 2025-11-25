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
      <button
        className="flex m-auto bg-red-700 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded items-center mt-4 text-xl transition-colors duration-300"
        onClick={() => navigate("/appointment")}
      >
        Agendar ahora
      </button>
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
