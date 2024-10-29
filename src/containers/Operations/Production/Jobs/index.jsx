import { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";
import JobCard from "../../../../components/operations/Production/JobCard";
import useJobOrder from "../../../../hooks/useJobOrder";

function JobsContainer({ refresh, searchValue, filterString = "" }) {
  const { getJobOrders, jobOrders, loading, count } = useJobOrder();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });

  useEffect(() => {
    getJobOrders(
      pagination.current,
      pagination.pageSize,
      `&archived=false${
        searchValue && searchValue.length
          ? "&search=" + searchValue
          : searchValue
      }${filterString ? filterString : ""}`
    );
  }, [
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
      {loading ? (
        <Spin size="large" className="my-10 w-full" />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-4 max-h-">
            {jobOrders.map((job, index) => (
              <JobCard jobOrder={job} key={index} />
            ))}
          </div>
          <Pagination
            responsive
            showTotal={(total) => (
              <p className="text-red-700 text-lg">{`Total: ${total}`}</p>
            )}
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
  );
}
export default JobsContainer;
