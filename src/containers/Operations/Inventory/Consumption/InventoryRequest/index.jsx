import RequestMaterialForm from "../../../../../components/operations/Inventory/RequestMaterialForm";
import useInventory from "../../../../../hooks/useInventory";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

function InventoryRequest({ owner }) {
  const { loading, createConsumptionMaterialRequest } = useInventory();
  const navigate = useNavigate();
  
  const handleRequestStorageMaterial = (payload) => {
    createConsumptionMaterialRequest(payload)
      .then(() => {
        notification.success({
          message: "Material solicitado",
          description: "Material solicitado exitosamente",
        });
        navigate("/operations/inventory/autoexpress/requests");
      })
      .catch((error) => {
        notification.error({
          message: "Error al solicitar material",
          description: error.message,
        });
      });
  };

  return (
    <>
      <h1 className="pl-4 pt-4 text-2xl text-red-700 font-medium mb-6 ">
        Solicitar materiales
      </h1>
      <RequestMaterialForm
        loading={loading}
        owner={owner}
        handleRequestStorageMaterial={handleRequestStorageMaterial}
      />
    </>
  );
}

export default InventoryRequest;
