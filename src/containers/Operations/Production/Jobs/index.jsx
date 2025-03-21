import { useEffect, useState } from "react";
import { Spin, Pagination, Skeleton, Tabs } from "antd";
import JobCard from "../../../../components/operations/Production/JobCard";
import useJobOrder from "../../../../hooks/useJobOrder";
import {
  formatToCurrency,
  updateFilterString,
  getFilterValue,
} from "../../../../helpers";
import { setProductionSubTab } from "../../../../redux/reducers/uiSlice";
import { useDispatch, useSelector } from "react-redux";

function JobsContainer({ refresh, searchValue, filterString = "", owner }) {
  const dispatch = useDispatch();
  const { getJobOrders, jobOrders, loading, count, total } = useJobOrder();
  const [currentTab, setCurrentTab] = useState("current");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });

  useEffect(() => {
    const filterOptions = {
      archived: currentTab === "archived",
      owner: owner ? owner : "autocheck",
      search: searchValue,
      status:
        currentTab === "completed"
          ? currentTab
          : getFilterValue(filterString, "status"),
    };
    const newFilterString = updateFilterString(filterString, filterOptions);

    getJobOrders(pagination.current, pagination.pageSize, newFilterString);
  }, [
    owner,
    refresh,
    searchValue,
    filterString,
    pagination.current,
    pagination.pageSize,
    currentTab,
  ]);

  useEffect(() => {
    setPagination({ ...pagination, total: count });
  }, [count]);

  useEffect(() => {
    dispatch(setProductionSubTab("jobs"));
    setPagination({ ...pagination, current: 1 });
  }, [currentTab]);

  const items = [
    {
      key: "current",
      label: <p className="font-semibold text-base">Actuales</p>,
    },
    {
      key: "completed",
      label: <p className="font-semibold text-base">Completadas</p>,
    },
    {
      key: "archived",
      label: <p className="font-semibold text-base">Archivadas</p>,
    },
  ];

  console.log("Array");
  return (
    <div>
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="flex flex-col gap-2">
            <Skeleton.Input size="small" />
            <Skeleton.Input size="small" />
            <Skeleton.Input size="small" />
            <Skeleton.Input size="small" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-base">{`Total costo: ${formatToCurrency(
              total.cost
            )}`}</p>
            <p className="font-semibold text-base">{`Total utilidad de materiales: ${formatToCurrency(
              total.material_profit
            )}`}</p>
            <p className="font-semibold text-base">{`Total utilidad de ventas: ${formatToCurrency(
              total.sell_profit
            )}`}</p>
            <p className="font-semibold">Total de O.T: {count}</p>
          </div>
        )}
        <Tabs
          activeKey={currentTab}
          defaultActiveKey={currentTab}
          items={items}
          onChange={(key) => {
            setCurrentTab(key);
            dispatch(setProductionSubTab(key));
          }}
        />
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
