"use client";

import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Divider,
  Typography,
  Space,
} from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  RiseOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// Format currency function
const formatToCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export default function Dashboard() {
  // Sample data - replace with your actual data source
  const [data, setData] = useState({
    cost: 12500,
    sell_price: 18750,
    material_profit: 3750,
    profit: 2500,
    count: 15,
  });

  // Calculate percentages for progress indicators
  const profitMargin = ((data.profit / data.sell_price) * 100).toFixed(2);
  const materialMargin = (
    (data.material_profit / data.sell_price) *
    100
  ).toFixed(2);

  return (
    <div style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Financial Dashboard
      </Title>

      {/* Main Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Total Cost"
              value={data.cost}
              precision={2}
              formatter={(value) => formatToCurrency(value)}
              prefix={<DollarOutlined />}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Base expenses
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Total Sales"
              value={data.sell_price}
              precision={2}
              formatter={(value) => formatToCurrency(value)}
              prefix={<ShoppingCartOutlined />}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Revenue from all sales
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Material Profit"
              value={data.material_profit}
              precision={2}
              formatter={(value) => formatToCurrency(value)}
              prefix={<BarChartOutlined />}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Expected material margin
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Net Profit"
              value={data.profit}
              precision={2}
              formatter={(value) => formatToCurrency(value)}
              prefix={<RiseOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Free margin after expenses
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Work Orders */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                <span>Work Orders</span>
              </Space>
            }
          >
            <Row align="middle" gutter={16}>
              <Col span={8}>
                <Statistic title="Total O.T" value={data.count} />
              </Col>
              <Col span={16}>
                <Title level={5}>Completion Status</Title>
                <Progress percent={70} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Financial Summary */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Financial Summary">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Statistic
                  title="Profit Margin"
                  value={profitMargin}
                  suffix="%"
                  valueStyle={{ color: "#3f8600" }}
                />
                <Progress
                  percent={Number.parseFloat(profitMargin)}
                  status="active"
                />
              </Col>

              <Col xs={24} md={8}>
                <Statistic
                  title="Material Margin"
                  value={materialMargin}
                  suffix="%"
                  valueStyle={{ color: "#1890ff" }}
                />
                <Progress
                  percent={Number.parseFloat(materialMargin)}
                  status="active"
                  strokeColor="#1890ff"
                />
              </Col>

              <Col xs={24} md={8}>
                <Statistic
                  title="Average Sale per Order"
                  value={data.sell_price / data.count}
                  precision={2}
                  formatter={(value) => formatToCurrency(value)}
                />
                <Divider style={{ margin: "12px 0" }} />
                <Row justify="space-between">
                  <Col>
                    <Text>Orders</Text>
                  </Col>
                  <Col>
                    <Text strong>{data.count}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
