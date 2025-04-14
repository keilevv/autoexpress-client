import { Skeleton, Card, Statistic, Typography } from "antd";
import MaterialsTable from "../../../../components/operations/Inventory/MaterialsTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useInventory from "../../../../hooks/useInventory";
import { formatToCurrency } from "../../../../helpers";
import { DollarOutlined, ContainerOutlined } from "@ant-design/icons";

function StorageInventoryContainer({ refresh, searchValue, owner }) {
  const {
    storageMaterials,
    getStorageMaterials,
    loading,
    count,
    totalPriceStorage,
  } = useInventory();
  const user = useSelector((state) => state.auth.user);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    position: "topLeft",
  });

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    if (user) {
      getStorageMaterials(
        pagination.current,
        pagination.pageSize,
        `&archived=false&owner=${owner ? owner : "autocheck"}${
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
    getStorageMaterials(
      pagination.current,
      pagination.pageSize,
      `&archived=false${
        searchValue ? "&plate=" + searchValue : ""
      }${getFilterString(values)}`
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Cost Card */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[250px] max-w-sm">
          <Card className="h-full">
            {loading ? (
              <Skeleton />
            ) : (
              <Statistic
                title="Valor Total de Almacén"
                value={totalPriceStorage}
                precision={2}
                formatter={(value) => formatToCurrency(value)}
                prefix={<DollarOutlined className="text-blue-800 mr-1" />}
              />
            )}
          </Card>
        </div>
        <div className="flex-1 min-w-[250px] max-w-sm">
          <Card className="h-full">
            {loading ? (
              <Skeleton />
            ) : (
              <Statistic
                title="Total de productos"
                value={count}
                prefix={<ContainerOutlined className="text-blue-800 mr-1" />}
              />
            )}
          </Card>
        </div>
      </div>
      <MaterialsTable
        owner={owner}
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
