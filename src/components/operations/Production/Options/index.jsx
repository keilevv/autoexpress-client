import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";


function ProductionOptions({ onFinish, type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-row">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Agregar orden de servicio
      </Button>
    </div>
  );
}

export default ProductionOptions;
