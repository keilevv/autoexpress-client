import { Skeleton } from "antd";
import MaterialsTable from "../../../../components/operations/Inventory/MaterialsTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMaterials from "../../../../hooks/useInventory";
import { formatToCurrency } from "../../../../helpers";

import { FiDollarSign, FiBox } from "react-icons/fi";

function ConsumptionInventoryContainer({
  refresh,
  searchValue,
  owner,
  currentTab,
}) {
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
    if (user && currentTab === "consumption") {
      getConsumptionMaterials(
        pagination.current,
        pagination.pageSize,
        `&archived=false&owner=${owner ? owner : "autoexpress"}${
          searchValue ? "&search=" + searchValue : ""
        }`,
      );
    }
  }, [
    pagination.current,
    pagination.pageSize,
    user,
    owner,
    searchValue,
    refresh,
    currentTab,
  ]);

  const handleApplyFilters = (values) => {
    getConsumptionMaterials(
      pagination.current,
      pagination.pageSize,
      `&archived=false${
        searchValue ? "&plate=" + searchValue : ""
      }${getFilterString(values)}`,
    );
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <Skeleton.Avatar active size="large" shape="circle" />
            <div className="flex flex-col gap-2">
              <Skeleton.Input style={{ width: 100 }} active size="small" />
              <Skeleton.Input style={{ width: 150 }} active size="small" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <Skeleton.Avatar active size="large" shape="circle" />
            <div className="flex flex-col gap-2">
              <Skeleton.Input style={{ width: 100 }} active size="small" />
              <Skeleton.Input style={{ width: 150 }} active size="small" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md">
            <div className="bg-green-50 p-3 rounded-full text-green-600">
              <FiDollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium whitespace-nowrap">
                Valor de consumo
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {formatToCurrency(totalPriceConsumption)}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md">
            <div className="bg-purple-50 p-3 rounded-full text-purple-600">
              <FiBox size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium whitespace-nowrap">
                # de productos
              </p>
              <p className="text-2xl font-bold text-gray-800">{count}</p>
            </div>
          </div>
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
