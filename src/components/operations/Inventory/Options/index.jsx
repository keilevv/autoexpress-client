import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import AddMaterialModal from "./AddMaterialModal";
import AddSaleModal from "./AddSaleModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function InventoryOptions({ onFinish, type, owner }) {
  const [addButtontitle, setAddButtontitle] = useState("Agregar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    switch (type) {
      case "storage":
        setAddButtontitle("Agregar material a almacén");
        break;
      case "consumption":
        if (user.roles.includes("user")) {
          setShowButton(false);
        } else {
          setAddButtontitle("Agregar material de consumo");
          setShowButton(true);
        }
        break;
      case "sales":
        setAddButtontitle("Agregar venta");
        break;
      case "requests":
        setAddButtontitle("Solicitar material");
        setShowButton(true);
        break;
      default:
        setAddButtontitle("agregar");
    }
  }, [type, user]);

  const handleClick = () => {
    switch (type) {
      case "storage":
        setIsModalOpen(true);
        break;
      case "sales":
        setIsModalOpen(true);
        break;
      case "consumption":
        setIsModalOpen(true);
        break;
      case "requests":
        navigate("/operations/inventory/consumption/add");

        break;
      default:
        setIsModalOpen(true);
    }
  };

  return (
    <div className="flex flex-row">
      {showButton && (
        <Button type="primary" icon={<PlusOutlined />} onClick={handleClick}>
          {addButtontitle}
        </Button>
      )}
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
