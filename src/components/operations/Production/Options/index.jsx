import { useState, useEffect } from "react";
import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NewJobOrderModal from "./NewJobOrderModal";

function ProductionOptions({ onFinish, type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  return (
    <div className="flex flex-row">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Agregar orden de trabajo
      </Button>
      <NewJobOrderModal
        onFinish={onFinish}
        form={form}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default ProductionOptions;
