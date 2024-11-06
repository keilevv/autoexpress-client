import { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select, notification } from "antd";
import useEmployee from "../../../../../hooks/useEmployee";
import useJobOrder from "../../../../../hooks/useJobOrder";
import { employeeRolesOptions } from "../../../../../helpers/constants";
import { validateCarPlate } from "../../../../../helpers";
import dayjs from "dayjs";
function NewJobOrderModal({
  onFinish,
  isModalOpen,
  setIsModalOpen,
  form,
  owner = "autoexpress",
}) {
  const { getEmployees, employees } = useEmployee();
  const { createJobOrder } = useJobOrder();
  const handleCreateJobOrder = () => {
    form.validateFields().then((values) => {
      values.owner = owner;
      values.due_date = dayjs(values.due_date).toISOString();
      createJobOrder(values)
        .then((response) => {
          notification.success({
            message: "Orden de trabajo creada con exito",
            description: response.data.results.number,
          });
          setIsModalOpen(false);
          form.resetFields();
          onFinish();
        })
        .catch((err) => {
          notification.error({
            message: "Error al crear orden de trabajo",
          });
        });
    });
  };

  useEffect(() => {
    getEmployees(1, 100, "&archived=false");
  }, []);

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleCreateJobOrder}
    >
      <h1 className="text-2xl font-semibold mb-5 text-red-700">
        Nueva orden de trabajo
      </h1>
      <Form layout="vertical" form={form}>
        <Form.Item
          name="number"
          label="Número"
          rules={[{ required: true, message: "Por favor ingrese el número" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="employee"
          label="Trabajador"
          rules={[
            { required: true, message: "Por favor escoja el trabajador" },
          ]}
        >
          <Select>
            {employees.map((employee) => (
              <Select.Option key={employee._id} value={employee._id}>
                {employee.name} -{" "}
                {
                  employeeRolesOptions.find(
                    (role) => role.value === employee.roles
                  ).label
                }
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="car_plate"
          label="Placa"
          rules={[
            { required: true, message: "Por favor ingrese la placa " },
            {
              validator: validateCarPlate,
              message: "Por favor ingrese una placa valida",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="due_date"
          label="Fecha de entrega"
          rules={[
            { required: true, message: "Por favor ingrese la descripción" },
          ]}
        >
          <DatePicker format={"DD/MM/YYYY"} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewJobOrderModal;
