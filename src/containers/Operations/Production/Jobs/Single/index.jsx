import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Tooltip,
  Form,
  Popconfirm,
  Spin,
  notification,
  Tag,
  Divider,
} from "antd";
import JobOrderDetails from "./Details";
import MaterialsList from "../../../../../components/operations/Inventory/MaterialsList";
import dayjs from "dayjs";
import useJobOrder from "../../../../../hooks/useJobOrder";
import ConsumedMaterials from "./ConsumedMaterials";

function JobOrdersSingleContainer() {
  const navigate = useNavigate();
  const {
    getJobOrder,
    jobOrder,
    loading,
    updateJobOrder,
    addMaterialToJobOrder,
  } = useJobOrder();
  const [consumedMaterials, setConsumedMaterials] = useState([]);
  const [consumedColors, setConsumedColors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingMaterials, setIsEditingMaterials] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [showSaveMaterials, setShowSaveMaterials] = useState(false);
  const [form] = Form.useForm();
  const [jobOrderId, setJobOrderId] = useState(null);

  useEffect(() => {
    window.location.pathname.split("/").forEach((item, index) => {
      if (item === "jobs") {
        setJobOrderId(window.location.pathname.split("/")[index + 1]);
      }
    });
  }, [window.location.pathname]);

  useEffect(() => {
    jobOrderId && getJobOrder(jobOrderId);
  }, [jobOrderId]);

  useEffect(() => {
    if (
      jobOrder?.consumed_colors?.length !== consumedColors.length ||
      jobOrder?.consumed_materials?.length !== consumedMaterials.length
    ) {
      if (jobOrder) {
        setShowSaveMaterials(true);
      }
    }
  }, [consumedMaterials, jobOrder, consumedColors]);

  useEffect(() => {
    if (jobOrder?.consumed_materials?.length > 0) {
      setConsumedMaterials(
        jobOrder.consumed_materials.map((item) => {
          return {
            consumption_material: item.consumption_material,
            quantity: item.quantity,
            storage_material: item.storage_material,
          };
        })
      );
    }
    if (jobOrder?.consumed_colors?.length > 0) {
      setConsumedColors(jobOrder.consumed_colors);
    }
  }, [jobOrder]);

  const handleArchiveJobOrder = () => {
    updateJobOrder(jobOrderId, { archived: !jobOrder?.archived })
      .then((response) => {
        notification.success({
          message: `O.T. ${
            jobOrder?.archived ? "desarchivado" : "archivado"
          } con éxito`,
          description: `O.T. #${response.data.results.number}`,
        });
        getJobOrder(jobOrderId);
      })
      .catch((err) => {
        notification.error({
          message: "Error archivando O.T.",
        });
      });
  };

  const handleUpdateJobOrder = () => {
    if (jobOrderId) {
      const values = form.getFieldsValue();
      values.due_date = dayjs(values.due_date).toISOString();
      updateJobOrder(jobOrderId, values)
        .then((response) => {
          notification.success({
            message: "O.T. actualizada con exito",
            description: `O.T. #${response.data.results.number}`,
          });
          getJobOrder(jobOrderId);
          setIsEditing(false);
          setShowSave(false);
          form.resetFields();
        })
        .catch((err) => {
          notification.error({
            message: "Error actualizando O.T.",
          });
        });
    }
  };
  const handleAddMaterialsToJobOrder = () => {
    if (jobOrderId) {
      addMaterialToJobOrder(jobOrderId, {
        consumed_materials: consumedMaterials.map((item) => {
          return {
            consumption_material: item.consumption_material._id,
            quantity: item.quantity,
          };
        }),
        consumed_colors: consumedColors,
      })
        .then((response) => {
          notification.success({
            message: "O.T. actualizada con exito",
            description: `O.T. #${response.data.results.number}`,
          });
          getJobOrder(jobOrderId);
          setIsEditingMaterials(false);
          setShowSaveMaterials(false);
          form.resetFields();
        })
        .catch((err) => {
          notification.error({
            message: "Error actualizando O.T.",
          });
        });
    }
  };

  function EditButton({ type = "information" }) {
    return (
      <Tooltip
        title={() => {
          switch (type) {
            case "materials":
              return !isEditingMaterials ? "Editar materiales " : "Cancelar";
            default:
              return !isEditing ? "Editar información " : "Cancelar";
          }
        }}
      >
        <Button
          className="edit-button"
          shape="circle"
          onClick={() => {
            switch (type) {
              case "materials":
                setIsEditingMaterials(!isEditingMaterials);
                setShowSaveMaterials(false);
                setConsumedColors(jobOrder?.consumed_colors);
                setConsumedMaterials(jobOrder?.consumed_materials);

                break;
              default:
                setIsEditing(!isEditing);
                form.resetFields();
                setShowSave(false);
                break;
            }
          }}
        >
          <i className="fa-solid fa-pen icon"></i>
        </Button>
      </Tooltip>
    );
  }

  return (
    <div className="lg:flex lg:justify-between lg:items-top mb-5 flex-col">
      <div className="flex flex-col md:flex-row md:justify-between ">
        <div className="mb-4 flex flex-col gap-4">
          <Breadcrumb
            items={[
              {
                title: (
                  <a onClick={() => navigate("/operations")}>Operaciones</a>
                ),
              },
              {
                title: (
                  <a onClick={() => navigate("/operations/production")}>
                    Producción
                  </a>
                ),
              },
              {
                title: (
                  <p className="text text-red-700 font-semibold">
                    #{jobOrder?.number}
                  </p>
                ),
              },
            ]}
          />
          {jobOrder?.archived && (
            <Tag className={"max-w-[70px]"} color={"gray"}>
              Archivado
            </Tag>
          )}
          {jobOrder?.created_date && (
            <p className="text-sm text-gray-500 font-semibold">{`Fecha de creación: ${dayjs(
              jobOrder?.created_date
            ).format("DD/MM/YYYY")}`}</p>
          )}
        </div>

        <div className="single-jobOrder-buttons flex gap-2">
          <div className="flex gap-2 mb-4 md:mb-0">
            <Tooltip title={jobOrder?.archived ? "Desarchivar" : "Archivar"}>
              <Popconfirm
                title={`${
                  jobOrder?.archived ? "Desarchivar" : "Archivar"
                } orden de trabajo`}
                description={`¿Está seguro de ${
                  jobOrder?.archived ? "desarchivar" : "archivar"
                } esta orden de trabajo?`}
                onConfirm={handleArchiveJobOrder}
              >
                <Button className="edit-button" shape="circle">
                  {jobOrder?.archived ? (
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  ) : (
                    <i className="fa-solid fa-box-archive icon"></i>
                  )}{" "}
                </Button>
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      </div>
      <h1 className="text-2xl text-red-700 mb-4  font-semibold">
        Detalles de la orden de trabajo
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full max-w-md">
          <div
            className={` bg-gray-100 rounded-lg ${
              isEditing ? "outline" : ""
            } outline-blue-200 p-4 p-4 h-full `}
          >
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">Información</h1>
              <EditButton />
            </div>

            <Divider className="bg-gray-300 my-4 h-[2px]" />
            {loading ? (
              <Spin size="large" className="my-10 w-full" />
            ) : (
              <JobOrderDetails
                jobOrder={jobOrder}
                form={form}
                isEditing={isEditing}
                setIsChanged={setShowSave}
              />
            )}
            <div className="mt-8">
              {isEditing && (
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    form.resetFields();
                    setShowSave(false);
                  }}
                  className={`storageMaterial-form-cancel-button`}
                >
                  Cancelar
                </Button>
              )}
              {showSave && (
                <Button
                  type="primary"
                  className={`storageMaterial-form-save-button ml-2 ${
                    !showSave && "disabled"
                  }`}
                  icon={<i className="fa-solid fa-save"></i>}
                  onClick={handleUpdateJobOrder}
                >
                  Guardar
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="w-full max-w-md">
          <div
            className={` bg-gray-100 rounded-lg ${
              isEditingMaterials ? "outline" : ""
            } outline-blue-200 p-4 p-4 `}
          >
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold ">Materiales utilizados</h1>
              <EditButton type="materials" />
            </div>

            <Divider className="bg-gray-300 my-4 h-[2px]" />
            <ConsumedMaterials
              consumedMaterials={consumedMaterials}
              isEditing={isEditingMaterials}
              setConsumedMaterials={setConsumedMaterials}
              consumedColors={consumedColors}
              setConsumedColors={setConsumedColors}
            />
            <div className="mt-8">
              {isEditingMaterials && (
                <Button
                  onClick={() => {
                    setIsEditingMaterials(false);
                    form.resetFields();
                    setShowSaveMaterials(false);
                    setConsumedColors(jobOrder?.consumed_colors);
                    setConsumedMaterials(jobOrder?.consumed_materials);
                  }}
                  className={`storageMaterial-form-cancel-button`}
                >
                  Cancelar
                </Button>
              )}
              {showSaveMaterials && (
                <Button
                  loading={loading}
                  type="primary"
                  className={`storageMaterial-form-save-button ml-2 ${
                    !showSave && "disabled"
                  }`}
                  icon={<i className="fa-solid fa-save"></i>}
                  onClick={handleAddMaterialsToJobOrder}
                >
                  Guardar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobOrdersSingleContainer;
