import { Card, Statistic, Progress, Typography, Space } from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  RiseOutlined,
  FileTextOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import { formatToCurrency, isNotNumberThenZero } from "../../../../helpers";

const { Title, Text } = Typography;

const statusTypes = [
  {
    value: "pending",
    label: "Pendientes",
    color: "orange-300",
    hexColor: "#FFD7A8",
  },
  {
    value: "in-progress",
    label: "En progreso",
    color: "blue-300",
    hexColor: "#BEDBFF",
  },
  {
    value: "completed",
    label: "Completadas",
    color: "green-300",
    hexColor: "#B9F8CF",
  },
  {
    value: "archived",
    label: "Archivadas",
    color: "gray-300",
    hexColor: "#79716B",
  },
];

export default function Metrics({ data, count, statusPercentages, loading }) {
  // Calculate percentages for progress indicators
  const profitMargin = isNotNumberThenZero(
    ((data.profit / data.sell_price) * 100).toFixed(2)
  );
  const materialMargin = isNotNumberThenZero(
    ((data.material_profit / data.sell_price) * 100).toFixed(2)
  );

  return (
    <div>
      {/* Main Metrics - Using Tailwind flex and wrap */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Cost Card */}
        <div className="flex-1 min-w-[250px]">
          <Card  className="h-full">
            {loading ? (
              <Skeleton />
            ) : (
              <>
                <Statistic
                  title="Total Costo"
                  value={data.cost}
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
        </div>

        {/* Sales Card */}
        <div className="flex-1 min-w-[250px]">
          <Card  className="h-full">
            {loading ? (
              <Skeleton />
            ) : (
              <>
                {" "}
                <Statistic
                  title="Total Ventas"
                  value={data.sell_price}
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
        </div>

        {/* Material Profit Card */}
        <div className="flex-1 min-w-[250px]">
          <Card  className="h-full">
            {loading ? (
              <Skeleton />
            ) : (
              <>
                {" "}
                <Statistic
                  title="Margen de Materiales"
                  value={data.material_profit}
                  precision={2}
                  formatter={(value) => formatToCurrency(value)}
                  prefix={<BarChartOutlined />}
                  valueStyle={
                    data.profit < 0
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
        </div>

        {/* Net Profit Card */}
        <div className="flex-1 min-w-[250px]">
          <Card  className="h-full">
            {loading ? (
              <Skeleton />
            ) : (
              <>
                {" "}
                <Statistic
                  title="Utilidad Neta"
                  value={data.profit}
                  precision={2}
                  formatter={(value) => formatToCurrency(value)}
                  prefix={<RiseOutlined />}
                  valueStyle={
                    data.profit < 0
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
      </div>

      {/* Financial Summary */}
      <div>
        <Card
          title={
            <Space>
              <LineChartOutlined className="text-blue-800 text-xl" />
              <span className="text-xl">Reporte Financiero</span>
            </Space>
          }
        >
          <div className="flex flex-wrap gap-6">
            {/* Profit Margin */}
            <div className="flex-1 min-w-[250px]">
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  <Statistic
                    title="Margen de Utilidad Neta"
                    value={profitMargin}
                    suffix="%"
                    valueStyle={{ color: "#3f8600" }}
                  />
                  <Progress
                    percent={Number.parseFloat(profitMargin)}
                    status="active"
                  />
                </>
              )}
            </div>

            {/* Material Margin */}
            <div className="flex-1 min-w-[250px]">
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  <Statistic
                    title="Margen de Materiales"
                    value={materialMargin}
                    suffix="%"
                    valueStyle={{ color: "#1890ff" }}
                  />
                  <Progress
                    percent={Number.parseFloat(materialMargin)}
                    status="active"
                    strokeColor="#1890ff"
                  />
                </>
              )}
            </div>

            {/* Average Sale */}
            <div className="flex-1 min-w-[250px]">
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  {" "}
                  <Statistic
                    title="Precio de Venta Promedio"
                    value={isNotNumberThenZero(data.sell_price / count)}
                    precision={2}
                    formatter={(value) => formatToCurrency(value)}
                  />
                  <div className="h-[1px] bg-gray-200 my-3"></div>
                  <div className="flex justify-between">
                    <Text strong>O.T.</Text>
                    <Text strong>{count}</Text>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Work Orders */}
      <div className="mt-4">
        <Card
          title={
            <Space>
              <FileTextOutlined className="text-blue-800 text-xl" />
              <span className="text-xl">Órdenes de Trabajo</span>
            </Space>
          }
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              {loading ? (
                <Skeleton />
              ) : (
                <Statistic title="Total O.T." value={count} />
              )}
            </div>
            <div className="flex-[2] min-w-[300px]">
              {loading ? (
                <Skeleton />
              ) : (
                statusPercentages.map((status, index) => (
                  <div key={index}>
                    <Title level={5}>
                      {
                        statusTypes.find(
                          (statusType) => statusType.value === status.key
                        )?.label
                      }
                    </Title>
                    <Progress
                      percent={status.value}
                      strokeColor={
                        statusTypes.find(
                          (statusType) => statusType.value === status.key
                        )?.hexColor
                      }
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
