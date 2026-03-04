import { useEffect, useState } from "react";
import { Spin, Pagination, Skeleton } from "antd";
import JobCard from "../../../../components/operations/Production/JobCard";
import useJobOrder from "../../../../hooks/useJobOrder";
import { formatToCurrency } from "../../../../helpers";
import {
  FiClock,
  FiLoader,
  FiCheckCircle,
  FiInbox,
  FiDollarSign,
} from "react-icons/fi";

function JobsContainer({ refresh, searchValue, filterString = "", owner }) {
  const { getJobOrders, jobOrders, loading, count, total, statusCounts } =
    useJobOrder();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });

  useEffect(() => {
    getJobOrders(
      pagination.current,
      pagination.pageSize,
      `&archived=false&owner=${owner ? owner : "autoexpress"}${
        searchValue && searchValue.length ? "&search=" + searchValue : ""
      }${filterString ? filterString : ""}`,
    );
  }, [
    owner,
    refresh,
    searchValue,
    filterString,
    pagination.current,
    pagination.pageSize,
  ]);

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1].map((i) => (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-6 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-4 pr-6 mr-2 flex-wrap">
                <div className="flex items-center gap-4 border-r border-gray-100 pr-6">
                  <div className="bg-slate-50 p-3 rounded-full text-slate-600">
                    <FiInbox size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium whitespace-nowrap ">
                      Total O.T
                    </p>
                    <p className="text-2xl font-bold text-gray-800">{count}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <FiDollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-green-700 font-medium whitespace-nowrap">
                      Precio total
                    </p>
                    <p className="text-2xl font-bold text-green-800">
                      {formatToCurrency(total)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-[280px]">
                <p className="text-sm  text-slate-600 font-medium mb-3">
                  Estado de Órdenes
                </p>
                <div className="flex items-center justify-between gap-2 text-xs font-semibold ">
                  <div className="flex flex-col">
                    <span className="text-orange-500 uppercase text-[10px] tracking-wider">
                      Pendientes
                    </span>
                    <span className="text-xl text-orange-700">
                      {statusCounts.pending}
                    </span>
                  </div>
                  <div className="w-px h-8 bg-blue-100" />
                  <div className="flex flex-col">
                    <span className="text-blue-500 uppercase text-[10px] tracking-wider">
                      En progreso
                    </span>
                    <span className="text-xl text-blue-700">
                      {statusCounts["in-progress"]}
                    </span>
                  </div>
                  <div className="w-px h-8 bg-blue-100" />
                  <div className="flex flex-col">
                    <span className="text-green-500 uppercase text-[10px] tracking-wider">
                      Completadas
                    </span>
                    <span className="text-xl text-green-700">
                      {statusCounts.completed}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading ? (
          <Spin size="large" className="my-10 w-full" />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {jobOrders.map((job, index) => (
                <JobCard jobOrder={job} key={index} />
              ))}
            </div>
            <Pagination
              responsive
              pageSize={pagination.pageSize}
              showSizeChanger={false}
              current={pagination.current}
              total={pagination.total}
              onChange={(e) => {
                setPagination({ ...pagination, current: e });
              }}
              className="flex"
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default JobsContainer;
