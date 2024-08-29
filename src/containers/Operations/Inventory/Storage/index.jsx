import MaterialsTable from "../../../../components/operations/Inventory/MaterialsTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useInventory from "../../../../hooks/useInventory";

function StorageInventoryContainer({ refresh, searchValue }) {
  const { storageMaterials, getStorageMaterials, loading, count } =
    useInventory();
  const user = useSelector((state) => state.auth.user);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    getStorageMaterials(
      1,
      10,
      `&archived=false${searchValue ? "&name=" + searchValue : ""}`
    );
  }, [user, refresh, searchValue]);

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    getStorageMaterials(
      pagination.current,
      pagination.pageSize,
      `&archived=false`
    );
  }, [pagination.current, pagination.pageSize, user]);

  const handleSearch = (value) => {
    setSearchValue(value);
    getStorageMaterials(
      pagination.current,
      pagination.pageSize,
      `&archived=false&plate=${value}`
    );
  };

  const handleApplyFilters = (values) => {
    getStorageMaterials(
      pagination.current,
      pagination.pageSize,
      `&archived=false${
        searchValue ? "&plate=" + searchValue : ""
      }${getFilterString(values)}`
    );
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      <MaterialsTable
        type="storage"
        data={storageMaterials}
        getMaterials={getStorageMaterials}
        loading={loading}
        setPagination={setPagination}
        pagination={pagination}
      />
    </div>
  );
}
export default StorageInventoryContainer;
