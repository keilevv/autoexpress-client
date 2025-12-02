import { useState, useEffect } from "react";
import { Button, List, Form, Tag } from "antd";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import useEmployee from "../../../../../hooks/useEmployee";
import NewEmployeeModal from "./NewEmployeeModal";
import { employeeRolesOptions } from "../../../../../helpers/constants";
import "./style.css";
function EmployeesList({ isSelect, setPayload, payload }) {
  const { getEmployees, employees, loading } = useEmployee();
  const user = useSelector((state) => state.auth.user);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userIsADOperator = user.roles.includes("autodetailing-operator");

  useEffect(() => {
    getEmployees(1, 100, userIsADOperator ? `&owner=autodetailing` : "");
  }, [user]);

  return (
    <div>
      <List
        loading={loading}
        className="max-h-[600px] overflow-y-scroll rounded-lg"
        itemLayout="horizontal"
        dataSource={employees}
        renderItem={(item, index) => (
          <List.Item
            className={`hover:bg-gray-100 ${
              selectedEmployeeId === item._id ||
              (payload && payload.service_id === item._id)
                ? "bg-gray-100 "
                : ""
            }`}
            key={item._id}
            onClick={(e) => {
              if (!userIsADOperator) {
                setSelectedEmployeeId(item._id);
                setIsModalOpen(true);
              }
            }}
          >
            <List.Item.Meta
              className="pl-4 cursor-pointer "
              title={
                <div className="flex gap-4 justify-between ">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {
                        employeeRolesOptions.find(
                          (role) => role.value === item.roles
                        )?.label
                      }
                    </p>
                  </div>
                  {item.archived && (
                    <Tag color="grey" className="h-6 m-auto mr-10">
                      Archivado
                    </Tag>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
      {!isSelect && !userIsADOperator && (
        <div className="flex justify-center mt-10 ">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
            Agregar
          </Button>
        </div>
      )}
      <NewEmployeeModal
        onFinish={() => {
          getEmployees();
          setIsModalOpen(false);
        }}
        employeeId={selectedEmployeeId}
        isModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        form={form}
      />
    </div>
  );
}
export default EmployeesList;
