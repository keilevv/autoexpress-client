import { useEffect, useState } from "react";
import {
  Spin,
  Pagination,
  Skeleton,
  Tabs,
  Card,
  Statistic,
  Typography,
  Divider,
} from "antd";
import JobCard from "../../../../components/operations/Production/JobCard";
import useJobOrder from "../../../../hooks/useJobOrder";
import {
  formatToCurrency,
  updateFilterString,
  getFilterValue,
} from "../../../../helpers";
import { setProductionSubTab } from "../../../../redux/reducers/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  RiseOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

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

  return (
    <div>
      <div className="flex flex-col">
        <Tabs
          activeKey={currentTab}
          defaultActiveKey={currentTab}
          items={items}
          onChange={(key) => {
            setCurrentTab(key);
            dispatch(setProductionSubTab(key));
          }}
        />
        {/* <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] max-w-sm">
            <Card className="h-full">
              {loading ? (
                <Skeleton />
              ) : (
                <Statistic
                  title="Total de O.T."
                  value={count}
                  prefix={<FileTextOutlined className="text-blue-800 mr-1" />}
                />
              )}
            </Card>
          </div> */}
        {/* Cost Card */}
        {/* <div className="flex-1 min-w-[250px]">
            <Card className="h-full">
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  <Statistic
                    title="Total Costo"
                    value={total.cost}
                    precision={2}
                    formatter={(value) => formatToCurrency(value)}
                    prefix={<DollarOutlined className="text-blue-800" />}
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Costo de materiales
                  </Text>
                </>
              )}
            </Card>
          </div> */}
        {/* Sales Card */}
        {/* <div className="flex-1 min-w-[250px]">
            <Card className="h-full">
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  {" "}
                  <Statistic
                    title="Total Ventas"
                    value={total.sell_price}
                    precision={2}
                    formatter={(value) => formatToCurrency(value)}
                    prefix={<ShoppingCartOutlined className="text-blue-800" />}
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Precio de venta
                  </Text>
                </>
              )}
            </Card>
          </div> */}
        {/* Material Profit Card */}
        {/* <div className="flex-1 min-w-[250px]">
            <Card className="h-full">
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  {" "}
                  <Statistic
                    title="Margen de Materiales"
                    value={total.material_profit}
                    precision={2}
                    formatter={(value) => formatToCurrency(value)}
                    prefix={<BarChartOutlined />}
                    valueStyle={
                      total.material_profit < 0
                        ? { color: "#ff4d4f" }
                        : { color: "#3f8600" }
                    }
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Margen esperado de materiales
                  </Text>
                </>
              )}
            </Card>
          </div> */}
        {/* Net Profit Card */}
        {/* <div className="flex-1 min-w-[250px]">
            <Card className="h-full">
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  {" "}
                  <Statistic
                    title="Utilidad Neta"
                    value={total.profit}
                    precision={2}
                    formatter={(value) => formatToCurrency(value)}
                    prefix={<RiseOutlined />}
                    valueStyle={
                      total.profit < 0
                        ? { color: "#ff4d4f" }
                        : { color: "#3f8600" }
                    }
                  />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Margen libre resultante
                  </Text>
                </>
              )}
            </Card>
          </div>
        </div> */}
        {loading ? (
          <Spin size="large" className="my-10 w-full" />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {jobOrders.map((job, index) => (
                <JobCard jobOrder={job} key={index} />
              ))}
            </div>
          </div>
        )}
        <Pagination
          responsive
          pageSize={pagination.pageSize}
          showSizeChanger={false}
          current={pagination.current}
          total={pagination.total}
          onChange={(e) => {
            setPagination({ ...pagination, current: e });
          }}
          className="flex mt-4"
        />
      </div>
    </div>
  );
}
export default JobsContainer;
