import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddMaterialModal from "./AddMaterialModal";
import AddSaleModal from "./AddSaleModal";

function InventoryOptions({ onFinish, type, owner }) {
  const [addButtontitle, setAddButtontitle] = useState("Agregar");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    switch (type) {
      case "storage":
        setAddButtontitle("Agregar material a almacén");
        break;
      case "consumption":
        setAddButtontitle("Agregar material de consumo");
        break;
      case "sales":
        setAddButtontitle("Agregar venta");
        break;
      default:
        setAddButtontitle("agregar");
    }
  }, [type]);

  return (
    <div className="flex flex-row">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        {addButtontitle}
      </Button>
      <AddMaterialModal
        owner={owner}
        type={type}
        onFinish={onFinish}
        isModalOpen={type === "sales" ? false : isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <AddSaleModal
        onFinish={onFinish}
        isModalOpen={type !== "sales" ? false : isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default InventoryOptions;
