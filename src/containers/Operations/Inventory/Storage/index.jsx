import { Skeleton, Button, Space } from "antd";
import MaterialsTable from "../../../../components/operations/Inventory/MaterialsTable";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import useInventory from "../../../../hooks/useInventory";
import useServices from "../../../../hooks/useServices";
import StockSimulation from "../../../../components/operations/Inventory/StockSimulation";
import { formatToCurrency } from "../../../../helpers";

import { FiDollarSign, FiBox } from "react-icons/fi";
import { CalculatorOutlined } from "@ant-design/icons";

function StorageInventoryContainer({
  refresh,
  searchValue,
  owner,
  currentTab,
}) {
  const {
    storageMaterials,
    getStorageMaterials,
    getStorageMaterialsSimulation,
    loading,
    count,
    totalPriceStorage,
  } = useInventory();
  
  const { services, getServices } = useServices();
  
  const user = useSelector((state) => state.auth.user);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationMaterials, setSimulationMaterials] = useState([]);
  const [simulatedResults, setSimulatedResults] = useState([]);

  const simulatedTotalPrice = useMemo(() => {
    return simulatedResults.reduce((acc, curr) => {
      return acc + (curr.simulated_quantity || 0) * (curr.price || 0);
    }, 0);
  }, [simulatedResults]);

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    if (user && currentTab === "storage") {
      getStorageMaterials(
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

  useEffect(() => {
    if (owner === "autodetailing") {
      getServices(1, 100, "&owner=autodetailing");
      getStorageMaterialsSimulation(`archived=false&owner=autodetailing`).then(res => {
        if (res) setSimulationMaterials(res);
      });
    }
  }, [owner]);

  const handleApplyFilters = (values) => {
    getStorageMaterials(
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
            <div className="bg-blue-50 p-3 rounded-full text-blue-600">
              <FiDollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium whitespace-nowrap">
                {isSimulating ? "Valor simulado" : "Valor de almacén"}
              </p>
              <p className={`text-2xl font-bold ${isSimulating ? "text-orange-600" : "text-gray-800"}`}>
                {formatToCurrency(isSimulating ? simulatedTotalPrice : totalPriceStorage)}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md">
            <div className="bg-orange-50 p-3 rounded-full text-orange-600">
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

      {owner === "autodetailing" && (
        <div className="px-4 pb-4">
          <Button 
            type={isSimulating ? "primary" : "default"} 
            icon={<CalculatorOutlined />}
            onClick={() => setIsSimulating(!isSimulating)}
            className="w-full md:w-auto"
          >
            {isSimulating ? "Cerrar Simulador" : "Simular Stock Proyectado"}
          </Button>
        </div>
      )}

      {isSimulating && owner === "autodetailing" ? (
        <div className="px-4 pb-4">
          <StockSimulation 
            services={services} 
            storageMaterials={simulationMaterials} 
            onSimulationResult={setSimulatedResults}
          />
        </div>
      ) : (
        <MaterialsTable
          owner={owner}
          type="storage"
          data={storageMaterials}
          getMaterials={getStorageMaterials}
          loading={loading}
          setPagination={setPagination}
          pagination={pagination}
        />
      )}
    </div>
  );
}
export default StorageInventoryContainer;
