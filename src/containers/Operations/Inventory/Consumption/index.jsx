import MaterialsTable from "../../../../components/operations/Inventory/MaterialsTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMaterials from "../../../../hooks/useInventory";

function ConsumptionInventoryContainer({ refresh, searchValue }) {
  const { consumptionMaterials, getConsumptionMaterials, loading, count } =
    useMaterials();
  const user = useSelector((state) => state.auth.user);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    if (searchValue && searchValue.length) {
      getConsumptionMaterials(1, 10, `&archived=false&search=${searchValue}`);
    } else {
      getConsumptionMaterials(1, 10, `&archived=false`);
    }
  }, [user, refresh, searchValue]);

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    getConsumptionMaterials(
      pagination.current,
      pagination.pageSize,
      `&archived=false`
    );
  }, [pagination.current, pagination.pageSize, user]);

  const handleSearch = (value) => {
    setSearchValue(value);
    getConsumptionMaterials(
      pagination.current,
      pagination.pageSize,
      `&archived=false&plate=${value}`
    );
  };

  const handleApplyFilters = (values) => {
    getConsumptionMaterials(
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
        type={"consumption"}
        data={consumptionMaterials}
        getMaterials={getConsumptionMaterials}
        loading={loading}
        setPagination={setPagination}
        pagination={pagination}
      />
    </div>
  );
}
export default ConsumptionInventoryContainer;
