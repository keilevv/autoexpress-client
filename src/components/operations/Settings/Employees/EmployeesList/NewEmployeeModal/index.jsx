import {
  Modal,
  Form,
  Input,
  Select,
  notification,
  Button,
  Popconfirm,
} from "antd";
import { SaveOutlined, RestOutlined, ToTopOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import useEmployees from "../../../../../../hooks/useEmployee";
import { employeeRolesOptions } from "../../../../../../helpers/constants";

function NewEmployeeModal({
  isModalOpen,
  setModalOpen,
  form,
  onFinish,
  employeeId,
}) {
  const {
    createEmployee,
    getEmployee,
    employee,
    setEmployee,
    updateEmployee,
    loading,
    deleteEmployee,
  } = useEmployees();

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (employee) {
        updateEmployee(employeeId, values)
          .then((response) => {
            notification.success({
              message: "Empleado editado con exito",
              description: `${response.data.results.name}`,
            });
            form.resetFields();
            setModalOpen(false);
            onFinish();
          })
          .catch((err) => {
            notification.error({
              message: "Error editando empleado",
            });
          });
      } else {
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
            });
          });
      }
    });
  };

  const handleArchiveEmployee = () => {
    updateEmployee(employeeId, { archived: !employee.archived })
      .then((response) => {
        notification.success({
          message: `Empleado ${
            employee.archived ? "desarchivado" : "archivado"
          }`,
          description: `${response.data.results.name}`,
        });
        setModalOpen(false);
        onFinish();
      })
      .catch((err) => {
        notification.error({
          message: "Error al editar el empleado",
        });
      });
  };

  const handleDeleteEmployee = () => {
    deleteEmployee(employeeId)
      .then(() => {
        notification.success({
          message: `Empleado eliminado`,
        });
        setModalOpen(false);
        onFinish();
      })
      .catch((err) => {
        notification.error({
          message: "Error al eliminar el empleado",
        });
      });
  };

  useEffect(() => {
    if (employeeId) {
      getEmployee(employeeId);
    }
  }, [employeeId]);

  useEffect(() => {
    if (employee) {
      form.setFieldsValue(employee);
    }
  }, [employee]);

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      setEmployee(null);
    }
  }, [isModalOpen]);
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => {
        form.resetFields();
        setModalOpen(false);
      }}
      footer={
        <div className="flex flex-wrap-reverse gap-2 justify-end">
          {employee && employee.archived && (
            <Popconfirm
              onConfirm={handleDeleteEmployee}
              title="¿Esta seguro de borrar el empleado?"
            >
              <Button
                danger
                type="text"
                icon={<RestOutlined />}
                disabled={loading}
              >
                Borrar
              </Button>
            </Popconfirm>
          )}
          {employee && (
            <Popconfirm
              onConfirm={handleArchiveEmployee}
              title={`¿Esta seguro de ${
                employee.archived ? "desarchivar" : "archivar"
              } este empleado?`}
            >
              <Button
                icon={employee.archived ? <ToTopOutlined /> : <RestOutlined />}
                disabled={loading}
              >
                {employee.archived ? "Desarchivar" : "Archivar"}
              </Button>
            </Popconfirm>
          )}
          <Button
            onClick={() => {
              form.resetFields();
              setModalOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            type="primary"
            onClick={handleOk}
            icon={<SaveOutlined />}
            disabled={loading}
          >
            Guardar
          </Button>
        </div>
      }
    >
      <h1 className="text-xl text-blue-800 font-semibold mb-5 ">
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
          {loading ? (
            <div className="bg-gray-200 width-full h-8 rounded-md animate-pulse" />
          ) : (
            <Input />
          )}
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
          {loading ? (
            <div className="bg-gray-200 width-full h-8 rounded-md animate-pulse" />
          ) : (
            <Select>
              {employeeRolesOptions.map((role) => (
                <Select.Option key={role.value} value={role.value}>
                  {role.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewEmployeeModal;
