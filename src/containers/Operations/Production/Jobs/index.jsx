import { useEffect, useState } from "react";
import { Spin, Pagination, Skeleton } from "antd";
import JobCard from "../../../../components/operations/Production/JobCard";
import useJobOrder from "../../../../hooks/useJobOrder";
import { formatToCurrency } from "../../../../helpers";

function JobsContainer({ refresh, searchValue, filterString = "", owner }) {
  const { getJobOrders, jobOrders, loading, count, total } = useJobOrder();
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
      }${filterString ? filterString : ""}`
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
          <div className="flex flex-col gap-2">
            <Skeleton.Input size="small" /> <Skeleton.Input size="small" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-base">{`Precio total: ${formatToCurrency(
              total
            )}`}</p>
            <p className="font-semibold">Total de O.T: {count}</p>
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
