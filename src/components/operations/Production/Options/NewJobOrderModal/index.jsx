import { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, DatePicker, Select, notification } from "antd";
import useEmployee from "../../../../../hooks/useEmployee";
import useCars from "../../../../../hooks/useCars";
import useJobOrder from "../../../../../hooks/useJobOrder";
import { employeeRolesOptions } from "../../../../../helpers/constants";
import { validateCarPlate } from "../../../../../helpers";
import _debounce from "lodash/debounce";
import dayjs from "dayjs";
function NewJobOrderModal({
  onFinish,
  isModalOpen,
  setIsModalOpen,
  form,
  owner = "autoexpress",
}) {
  const { getEmployees, employees, loading } = useEmployee();
  const { getCarsApi, carBrands, loading: loadingCars, carModels } = useCars();
  const [disableModels, setDisableModels] = useState(false);
  const { createJobOrder } = useJobOrder();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

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

  const handleSearchEmployee = (value) => {
    getEmployees(1, 100, `&full_name=${value}`);
  };

  const debounceFn = useCallback(_debounce(handleSearchEmployee, 300), []);
  useEffect(() => {}, [employees]);

  function handleGetCarBrands(inputValue, brand) {
    getCarsApi(inputValue, brand);
  }
  const debounceFnCarBrands = useCallback(
    _debounce(handleGetCarBrands, 300),
    []
  );
  useEffect(() => {
    if (isModalOpen) {
      getEmployees(1, 100, "&archived=false");
      getCarsApi();
    }
  }, [isModalOpen]);

  useEffect(() => {
    getCarsApi("", brand);
    if (brand.length) {
      setDisableModels(false);
    } else {
      setDisableModels(true);
    }
  }, [brand]);

  useEffect(() => {
    if (brand && brand.length) {
      form.setFieldValue("car_brand", brand);
    }
    if (model && model.length) {
      form.setFieldValue("car_model", model);
    }
  }, [brand, model]);


  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleCreateJobOrder}
    >
      <h1 className="text-2xl font-semibold mb-5 text-blue-800">
        Nueva orden de trabajo
      </h1>
      <Form layout="vertical" form={form} className="flex flex-col gap-4">
        <div className={"flex flex-col gap-2"}>
          <label className={"font-semibold"}>Número</label>
          <Form.Item
            name="number"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el número de la orden de trabajo",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className={"flex flex-col gap-2"}>
          <label className={"font-semibold"}>Descripción</label>
          <Form.Item name="description">
            <Input.TextArea />
          </Form.Item>
        </div>
        <div className={"flex flex-col gap-2"}>
          <label className={"font-semibold"}>Marca</label>
          <Form.Item
            name="car_brand"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la marca",
              },
            ]}
          >
            <Select
              value={brand}
              allowClear
              loading={loadingCars}
              showSearch
              options={carBrands}
              onSearch={(value) => {
                debounceFnCarBrands(value);
                if (value) {
                  setBrand(value);
                  form.resetFields(["car_model"]);
                }
              }}
              onChange={(value) => {
                if (value.length) {
                  setBrand(value);
                  form.resetFields(["car_model"]);
                }
              }}
              onDeselect={() => {
                setBrand("");
                form.resetFields(["car_model"]);
              }}
            />
          </Form.Item>
        </div>
        <div className={"flex flex-col gap-2"}>
          <label className={"font-semibold"}>Modelo</label>
          <Form.Item
            name="car_model"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el modelo",
              },
            ]}
          >
            <Select
              disabled={disableModels}
              value={model}
              allowClear
              loading={loading}
              showSearch
              options={carModels}
              onSearch={(value) => {
                if (value) {
                  setModel(value);
                  debounceFnCarBrands(value, brand);
                }
              }}
              onChange={(value) => {
                if (value.length) {
                  setModel(value);
                }
              }}
              onDeselect={() => {
                setModel("");
                form.resetFields(["car_model"]);
              }}
            />
          </Form.Item>
        </div>

        <div className={"flex flex-col gap-2"}>
          <label className={"font-semibold"}>Trabajador </label>
          <Form.Item
            name="employee"
            rules={[
              { required: true, message: "Por favor escoja el trabajador" },
            ]}
          >
            <Select
              loading={loading}
              showSearch
              onSearch={(value) => debounceFn(value)}
              filterOption={false}
            >
              {employees.map((employee) => (
                <Select.Option key={employee._id} value={employee._id}>
                  {employee.name} -{"  "}
                  {
                    employeeRolesOptions.find(
                      (role) => role.value === employee.roles
                    ).label
                  }
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className={"flex flex-col gap-2"}>
          <label className={"font-semibold"}>Placa</label>
          <Form.Item
            name="car_plate"
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
        </div>
        <div className={"flex flex-col gap-2"}>
          <label className={"font-semibold"}>Fecha de entrega</label>
          <Form.Item
            name="due_date"
            rules={[
              { required: true, message: "Por favor ingrese la descripción" },
            ]}
          >
            <DatePicker format={"DD/MM/YYYY"} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

export default NewJobOrderModal;
