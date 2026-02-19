import { Table, Tag, Typography, Popover, Badge } from "antd";
import dayjs from "dayjs";
import { SyncOutlined, UserOutlined, ToolOutlined } from "@ant-design/icons";
import { unitOptions } from "../../../../helpers/constants";
import MaterialRequestsActionsMenu from "./ActionsMenu";

const { Text } = Typography;

function MaterialRequestsTable({
  data = [],
  loading = false,
  onApprove = () => {},
  onReject = () => {},
  onArchive = () => {},
}) {
  const columns = [
    {
      title: "Fecha",
      dataIndex: "created_date",
      key: "created_date",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
      width: 150,
    },
    {
      title: "Usuario",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <span>
          <UserOutlined style={{ marginRight: 8 }} />
          {user ? user.username : "Desconocido"}
        </span>
      ),
    },
    {
      title: "Materiales",
      dataIndex: "materials",
      key: "materials",
      render: (materials) => {
        const content = (
          <div className="max-w-[300px]">
            <ul className="list-none p-0 m-0">
              {materials.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="py-1 border-b border-gray-100 last:border-0"
                  >
                    <Text strong>
                      {item.material?.name || "Material no encontrado"}
                    </Text>
                    <Text type="secondary">
                      {" "}
                      x{item.quantity} -{" "}
                      {
                        unitOptions.find(
                          (unit) => unit.value === item.material.unit,
                        )?.label
                      }{" "}
                    </Text>
                  </li>
                );
              })}
            </ul>
          </div>
        );

        return (
          <Popover content={content} trigger="hover" placement="right">
            <div className="flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 px-3 py-1 rounded-full border border-gray-200 transition-all duration-300 w-fit group">
              <ToolOutlined className="text-gray-500 group-hover:text-blue-500" />
              <Badge
                count={materials.length}
                className="text-white"
                style={{ backgroundColor: "#1890ff", fontSize: "10px" }}
              />
              {/* <Text className="text-xs text-gray-500 group-hover:text-gray-700">
                Materiales
              </Text> */}
            </div>
          </Popover>
        );
      },
    },
    {
      title: "Estado",
      dataIndex: "approved",
      key: "approved",
      render: (approved) => (
        <Tag
          icon={approved ? <CheckCircleOutlined /> : <SyncOutlined />}
          color={approved ? "success" : "processing"}
        >
          {approved ? "Aprobado" : "Pendiente"}
        </Tag>
      ),
    },
    {
      title: "Firma",
      dataIndex: "signature",
      key: "signature",
      render: (signature) => {
        const content = (
          <img
            src={signature}
            alt="Firma"
            className="w-full h-full object-contain max-w-[250px] max-h-[200px] md:max-w-[300px] md:max-h-[250px]"
          />
        );

        return (
          <Popover content={content} trigger="hover" placement="right">
            <img
              src={signature}
              alt="Firma"
              className="max-w-[100px] max-h-[50px] border border-gray-200 rounded-md"
            />
          </Popover>
        );
      },
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record) => (
        <MaterialRequestsActionsMenu
          isArchived={record.isArchived}
          onApprove={() => onApprove(record._id)}
          onReject={() => onReject(record._id)}
          onArchive={() => onArchive(record._id, !record.isArchived)}
          loading={loading}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="_id"
      pagination={{ pageSize: 10 }}
      className="premium-table"
    />
  );
}

export default MaterialRequestsTable;
