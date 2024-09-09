import { useState, useEffect } from "react";
import { Button, List, Form } from "antd";
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

  useEffect(() => {
    getEmployees();
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
            className={`hover:bg-gray-100 cursor-pointer${
              selectedEmployeeId === item._id ||
              (payload && payload.service_id === item._id)
                ? "bg-gray-100 "
                : ""
            }`}
            key={item._id}
            onClick={(e) => {
              setSelectedEmployeeId(item._id);
              setIsModalOpen(true);
            }}
          >
            <List.Item.Meta
              className="pl-4"
              title={<a href="#">{item.name}</a>}
              description={employeeRolesOptions.find(
                (role) => role.value === item.roles
              ).label}
            />
          </List.Item>
        )}
      />
      {!isSelect && (
        <div className="flex justify-center mt-10 ">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedEmployeeId(undefined);
              setIsModalOpen(true);
              form.resetFields();
            }}
          >
            Agregar
          </Button>
        </div>
      )}
      <NewEmployeeModal
        onFinish={() => {
          getEmployees();
          setIsModalOpen(false);
        }}
        isModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        form={form}
      />
    </div>
  );
}
export default EmployeesList;
