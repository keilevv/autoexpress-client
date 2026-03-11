import { Skeleton } from "antd";
import { formatToCurrency } from "../../../../helpers";
import {
  FiInbox,
  FiDollarSign,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiFileText,
} from "react-icons/fi";
import "./style.css";

function DashboardGrid({ data, loading }) {
  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <Skeleton.Avatar active size="large" shape="circle" />
            <div className="flex flex-col gap-2">
              <Skeleton.Input style={{ width: 80 }} active size="small" />
              <Skeleton.Input style={{ width: 120 }} active size="small" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const { jobOrders, requests, storage, consumption } = data;

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Job Orders Summary */}
      <h3 className="text-lg font-semibold text-gray-700 mb-[-10px]">
        Producción (Órdenes de Trabajo)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-4 border-r border-gray-100 pr-6 mr-2">
            <div className="bg-slate-50 p-3 rounded-full text-slate-600">
              <FiInbox size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium whitespace-nowrap">
                Total O.T
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {jobOrders.count}
              </p>
            </div>
          </div>
          <div className="flex-1 min-w-[280px]">
            <p className="text-sm text-blue-700 font-medium mb-3">
              Estado de Órdenes
            </p>
            <div className="flex items-center justify-between gap-2 text-xs font-semibold">
              <div className="flex flex-col">
                <span className="text-orange-500 uppercase text-[10px] tracking-wider">
                  Pendientes
                </span>
                <span className="text-xl text-orange-700">
                  {jobOrders.statusCounts.pending || 0}
                </span>
              </div>
              <div className="w-px h-8 bg-blue-100" />
              <div className="flex flex-col">
                <span className="text-blue-500 uppercase text-[10px] tracking-wider">
                  En curso
                </span>
                <span className="text-xl text-blue-700">
                  {jobOrders.statusCounts["in-progress"] || 0}
                </span>
              </div>
              <div className="w-px h-8 bg-blue-100" />
              <div className="flex flex-col">
                <span className="text-green-500 uppercase text-[10px] tracking-wider">
                  Listas
                </span>
                <span className="text-xl text-green-700">
                  {jobOrders.statusCounts.completed || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <FiDollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-green-700 font-medium whitespace-nowrap">
              Gasto total en materiales
            </p>
            <p className="text-2xl font-bold text-green-800">
              {formatToCurrency(jobOrders.value)}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Materials & Inventory */}
      <h3 className="text-lg font-semibold text-gray-700 mb-[-10px] mt-2">
        Inventario
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md">
          <div className="bg-purple-50 p-3 rounded-full text-purple-600">
            <FiBox size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium whitespace-nowrap">
              Almacén (Items)
            </p>
            <p className="text-2xl font-bold text-gray-800">{storage.count}</p>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md">
          <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
            <FiDollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-indigo-700 font-medium whitespace-nowrap">
              Valor Almacén
            </p>
            <p className="text-xl font-bold text-indigo-800">
              {formatToCurrency(storage.value)}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md">
          <div className="bg-cyan-50 p-3 rounded-full text-cyan-600">
            <FiBox size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium whitespace-nowrap">
              Consumo (Items)
            </p>
            <p className="text-2xl font-bold text-gray-800">
              {consumption.count}
            </p>
          </div>
        </div>

        <div className="bg-teal-50 p-6 rounded-xl shadow-sm border border-teal-100 flex items-center gap-4 transition-all duration-300 hover:shadow-md">
          <div className="bg-teal-100 p-3 rounded-full text-teal-600">
            <FiDollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-teal-700 font-medium whitespace-nowrap">
              Valor Consumo
            </p>
            <p className="text-xl font-bold text-teal-800">
              {formatToCurrency(consumption.value)}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Inventory Requests */}
      <h3 className="text-lg font-semibold text-gray-700 mb-[-10px] mt-2">
        Solicitudes de Material
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-4 border-r border-gray-100 pr-6 mr-2">
            <div className="bg-slate-50 p-3 rounded-full text-slate-600">
              <FiFileText size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium whitespace-nowrap">
                Total Solicitudes
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {requests.count}
              </p>
            </div>
          </div>
          <div className="flex-1 min-w-[280px]">
            <p className="text-sm text-indigo-700 font-medium mb-3">
              Estado de Solicitudes
            </p>
            <div className="flex items-center justify-between gap-2 text-xs font-semibold">
              <div className="flex flex-col">
                <span className="text-orange-500 uppercase text-[10px] tracking-wider">
                  Pendientes
                </span>
                <span className="text-xl text-orange-700">
                  {requests.statusCounts.pending || 0}
                </span>
              </div>
              <div className="w-px h-8 bg-indigo-100" />
              <div className="flex flex-col">
                <span className="text-green-500 uppercase text-[10px] tracking-wider">
                  Aprobadas
                </span>
                <span className="text-xl text-green-700">
                  {requests.statusCounts.approved || 0}
                </span>
              </div>
              <div className="w-px h-8 bg-indigo-100" />
              <div className="flex flex-col">
                <span className="text-red-500 uppercase text-[10px] tracking-wider">
                  Rechazadas
                </span>
                <span className="text-xl text-red-700">
                  {requests.statusCounts.rejected || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardGrid;
