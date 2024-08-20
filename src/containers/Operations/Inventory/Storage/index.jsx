import MaterialsTable from "../../../../components/operations/Inventory/MaterialsTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMaterials from "../../../../hooks/useMaterials";

function StorageInventoryContainer() {
  const { storageMaterials, getStorageMaterials } = useMaterials();
  const user = useSelector((state) => state.auth.user);
  
  useEffect(() => {
    getStorageMaterials();
  }, [user]);

  return (
    <div>
      <MaterialsTable data={storageMaterials} />
    </div>
  );
}
export default StorageInventoryContainer;
