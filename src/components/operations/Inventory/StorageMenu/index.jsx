import { useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddProductModal from "../AddProductModal";
function StorageMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-row mb-5  ">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Agregar producto
      </Button>
      <AddProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default StorageMenu;
