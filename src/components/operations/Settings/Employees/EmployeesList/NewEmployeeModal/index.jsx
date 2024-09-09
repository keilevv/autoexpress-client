import { Modal, Form, Input, Select, notification } from "antd";
import useEmployees from "../../../../../../hooks/useEmployee";
import { employeeRolesOptions } from "../../../../../../helpers/constants";

function NewEmployeeModal({ isModalOpen, setModalOpen, form, onFinish }) {
  const { createEmployee } = useEmployees();

  const handleCreateEmployee = () => {
    form.validateFields().then((values) => {
      createEmployee(values)
        .then((response) => {
          notification.success({
            message: "Empleado creado con exito",
            description: `${response.data.results.name}`,
          });
          form.resetFields();
          setModalOpen(false);
          onFinish();
        })
        .catch((err) => {
          notification.error({
            message: "Error creando empleado",
            description: err.message || err.message._message,
          });
        });
    });
  };
  return (
    <Modal
      okText="Guardar"
      cancelText="Cancelar"
      onCancel={() => {
        form.resetFields();
        setModalOpen(false);
      }}
      onOk={() => handleCreateEmployee()}
      open={isModalOpen}
    >
      <h1 className="text-xl text-red-700 font-semibold mb-5 ">
        Nuevo Empleado
      </h1>
      <Form
        form={form}
        layout="vertical"
        name="new-employee-form"
        initialValues={{ roles: "painter" }}
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="roles"
          label="Rol"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el rol del empleado",
            },
          ]}
        >
          <Select>
            {employeeRolesOptions.map((role) => (
              <Select.Option key={role.value} value={role.value}>
                {role.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewEmployeeModal;
