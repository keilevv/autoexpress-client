import useInventory from "../../../../hooks/useInventory";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MaterialRequestsTable from "../../../../components/operations/Inventory/MaterialRequestsTable";
import { notification } from "antd";

function InventoryRequestsContainer() {
  const user = useSelector((state) => state.auth.user);
  const {
    inventoryRequests,
    getInventoryRequests,
    loading,
    updateInventoryRequest,
  } = useInventory();

  useEffect(() => {
    getInventoryRequests(1, 10, "");
  }, [user]);

  const handleArchive = (id, archived = false) => {
    updateInventoryRequest(id, { archived })
      .then(() => {
        notification.success({
          message: "Solicitud archivada",
          description: "La solicitud ha sido archivada",
        });
        getInventoryRequests(1, 10, "");
      })
      .catch((error) => {
        notification.error({
          message: "Error al archivar solicitud",
          description: error.message,
        });
      });
  };

  return (
    <div className="bg-gray-100 overflow-auto">
      <MaterialRequestsTable
        data={inventoryRequests}
        loading={loading}
        onApprove={(id) => {}}
        onReject={(id) => {}}
        onArchive={(id, archived) => handleArchive(id, archived)}
      />
    </div>
  );
}

export default InventoryRequestsContainer;
