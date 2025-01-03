import { Skeleton } from "antd";
import MaterialsTable from "../../../../components/operations/Inventory/MaterialsTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMaterials from "../../../../hooks/useInventory";
import { formatToCurrency } from "../../../../helpers";

function ConsumptionInventoryContainer({ refresh, searchValue, owner }) {
  const {
    consumptionMaterials,
    getConsumptionMaterials,
    loading,
    count,
    totalPriceConsumption,
  } = useMaterials();
  const user = useSelector((state) => state.auth.user);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    if (user) {
      getConsumptionMaterials(
        pagination.current,
        pagination.pageSize,
        `&archived=false&owner=${owner ? owner : "autoexpress"}${
          searchValue ? "&search=" + searchValue : ""
        }`
      );
    }
  }, [
    pagination.current,
    pagination.pageSize,
    user,
    owner,
    searchValue,
    refresh,
  ]);

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
      {loading ? (
        <div className="flex flex-col gap-2 p-4">
          <Skeleton.Input size="small" /> <Skeleton.Input size="small" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-4">
          <p className="font-semibold text-base">{`Valor de consumo: ${formatToCurrency(
            totalPriceConsumption
          )}`}</p>
          <p className="font-semibold"># de productos: {count}</p>
        </div>
      )}
      <MaterialsTable
        owner={owner}
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
