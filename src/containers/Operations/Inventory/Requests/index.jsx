import useInventory from "../../../../hooks/useInventory";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MaterialRequestsTable from "../../../../components/operations/Inventory/MaterialRequestsTable";
import { notification } from "antd";

function InventoryRequestsContainer({ refresh }) {
  const user = useSelector((state) => state.auth.user);
  const {
    inventoryRequests,
    getInventoryRequests,
    loading,
    updateInventoryRequest,
    approveInventoryRequest,
    rejectInventoryRequest,
  } = useInventory();

  useEffect(() => {
    getInventoryRequests(1, 10, "");
  }, [user, refresh]);

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

  const handleApprove = (id) => {
    approveInventoryRequest(id)
      .then(() => {
        notification.success({
          message: "Solicitud aprobada",
          description: "La solicitud ha sido aprobada",
        });
        getInventoryRequests(1, 10, "");
      })
      .catch((error) => {
        notification.error({
          message: "Error al aprobar solicitud",
          description: error,
        });
      });
  };

  const handleReject = (id) => {
    rejectInventoryRequest(id)
      .then(() => {
        notification.success({
          message: "Solicitud rechazada",
          description: "La solicitud ha sido rechazada",
        });
        getInventoryRequests(1, 10, "");
      })
      .catch((error) => {
        notification.error({
          message: "Error al rechazar solicitud",
          description: error,
        });
      });
  };

  return (
    <div className="bg-gray-100 overflow-auto">
      <MaterialRequestsTable
        data={inventoryRequests}
        loading={loading}
        onApprove={(id) => handleApprove(id)}
        onReject={(id) => handleReject(id)}
        onArchive={(id, archived) => handleArchive(id, archived)}
      />
    </div>
  );
}

export default InventoryRequestsContainer;
