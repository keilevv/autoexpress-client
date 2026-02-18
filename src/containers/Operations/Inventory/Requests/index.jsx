import useInventory from "../../../../hooks/useInventory";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MaterialRequestsTable from "../../../../components/operations/Inventory/MaterialRequestsTable";

function InventoryRequestsContainer() {
  const user = useSelector((state) => state.auth.user);
  const { inventoryRequests, getInventoryRequests, loading } = useInventory();
  
  useEffect(() => {
    getInventoryRequests(1, 10, "");
  }, [user]);

  return (
    <div className="bg-gray-100 overflow-auto">
      <MaterialRequestsTable 
        data={inventoryRequests} 
        loading={loading} 
        onApprove={() => {}} 
      />
    </div>
  );
}

export default InventoryRequestsContainer;
