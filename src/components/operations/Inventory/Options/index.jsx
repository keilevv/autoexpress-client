import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddMaterialModal from "../AddMaterialModal";

function InventoryOptions({ onFinish, type }) {
  const [addButtontitle, setAddButtontitle] = useState("Agregar");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    switch (type) {
      case "storage-inventory":
        setAddButtontitle("Agregar material a almacén");
        break;
      case "consumption-inventory":
        setAddButtontitle("Agregar material de consumo");
        break;
      default:
        setAddButtontitle("agregar");
    }
  }, [type]);

  return (
    <div className="flex flex-row mb-5  ">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        {addButtontitle}
      </Button>
      <AddMaterialModal
        type={type}
        onFinish={onFinish}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default InventoryOptions;
