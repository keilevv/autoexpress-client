import Metrics from "../../../components/operations/Dashboard/Metrics";
import DashboardOptions from "../../../components/operations/Dashboard/Options";
import { Tabs } from "antd";
import { useState, useCallback, useEffect } from "react";
import { getFilterString, getFilterValue } from "../../../helpers";
import useMetrics from "../../../hooks/useMetrics";
import { set } from "lodash";

function DashboardContainer() {
  const [refresh, setRefresh] = useState(0);
  const [filterString, setFilterString] = useState("");
  const { total, count, statusPercentages, loading } = useMetrics(filterString);
  const [currentTab, setCurrentTab] = useState("job-orders");
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  function onApplyFilters(values) {
    if (Object.values(values).length > 0) {
      values.start_date &&
        setDateRange({ ...dateRange, startDate: values.start_date });
      values.end_date &&
        setDateRange({ ...dateRange, endDate: values.end_date });

      setFilterString(getFilterString(values));
    } else {
      setFilterString("");
    }
  }

  const items = [
    {
      key: "job-orders",
      label: <p className="font-semibold text-base">Órdenes de Trabajo</p>,
      children: (
        <Metrics
          loading={loading}
          data={total}
          count={count}
          statusPercentages={statusPercentages}
        />
      ),
    },
  ];

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Inicio</h2>
      <div className="flex flex-col md:flex-row gap-5 mb-4">
        <DashboardOptions
          onApplyFilters={onApplyFilters}
          onFinish={() => {
            setRefresh(refresh + 1);
          }}
        />
      </div>
      <Tabs
        activeKey={currentTab}
        defaultActiveKey={currentTab}
        items={items}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      />
    </div>
  );
}
export default DashboardContainer;
