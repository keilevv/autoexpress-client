import { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
/* Hooks*/
import useInventory from "../../../../../hooks/useInventory";
/* Components */
import SingleConsumptionMaterialContent from "./Details";
import {
  Skeleton,
  Breadcrumb,
  Button,
  Tooltip,
  notification,
  Popconfirm,
  Tag,
  Form,
} from "antd";

function SingleConsumptionMaterialContainer() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [materialId, setClientId] = useState("");
  const [form] = Form.useForm();
  const [owner, setOwner] = useState("autoexpress");

  const {
    consumptionMaterial,
    getConsumptionMaterial,
    loading,
    updateConsumptionMaterial,
  } = useInventory();

  useEffect(() => {
    if (materialId) {
      getConsumptionMaterial(materialId);
    }
  }, [materialId]);

  useEffect(() => {
    window.location.pathname.split("/").forEach((item, index) => {
      if (item === "material") {
        setClientId(window.location.pathname.split("/")[index + 2]);
        setType(window.location.pathname.split("/")[index + 1]);
      }
    });
  }, [window.location.pathname]);

  useEffect(() => {
    setOwner(
      consumptionMaterial?.material?.owner
        ? consumptionMaterial.material.owner
        : "autoexpress"
    );
  }, [consumptionMaterial]);

  function handleUpdateMaterial() {
    if (materialId) {
      form.validateFields().then((values) => {
        updateConsumptionMaterial(materialId, values)
          .then(() => {
            notification.success({
              message: "Material actualizado con éxito",
              description: `${consumptionMaterial.material.name} Ref. #${consumptionMaterial.material.reference}`,
            });
            setIsEditing(false);
            setShowSave(false);
            getConsumptionMaterial(materialId);
          })
          .catch((err) => {
            notification.error({
              message: "Error actualizando material",
              description: err.message || err.message._message,
            });
          });
      });
    }
  }

  function handleArchiveMaterial() {
    if (materialId) {
      updateConsumptionMaterial(materialId, {
        archived: consumptionMaterial.archived ? false : true,
      })
        .then((response) => {
          notification.success({
            message: `Material ${
              consumptionMaterial.archived ? "desarchivado" : "archivado"
            } con éxito`,
            description: `${consumptionMaterial.material.name} Ref. #${consumptionMaterial.material.reference}`,
          });
          getConsumptionMaterial(materialId);
        })
        .catch((err) => {
          notification.error({
            message: "Error archivando material",
            description: err.message || err.message._message,
          });
        });
    }
  }

  return (
    <div className="single-material-container">
      {loading || !consumptionMaterial ? (
        <Skeleton />
      ) : (
        <div>
          <div className="lg:flex lg:justify-between lg:items-top">
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
                      <a
                        onClick={() =>
                          navigate(`/operations/inventory/${owner}`)
                        }
                      >
                        Inventario
                      </a>
                    ),
                  },
                  {
                    title: (
                      <a
                        onClick={() =>
                          navigate(`/operations/inventory/${owner}/consumption`)
                        }
                      >
                        Consumo
                      </a>
                    ),
                  },
                  {
                    title: (
                      <p className="text text-red-700 font-semibold">{`${consumptionMaterial?.material?.name} Ref. #${consumptionMaterial?.material?.reference}`}</p>
                    ),
                  },
                ]}
              />
              {consumptionMaterial.archived && (
                <Tag className="max-w-[70px]" color={"gray"}>
                  Archivado
                </Tag>
              )}
              {consumptionMaterial.created_date && (
                <p className="text-sm text-gray-500 font-semibold">{`Fecha de creación: ${dayjs(
                  consumptionMaterial.created_date
                ).format("DD/MM/YYYY")}`}</p>
              )}
            </div>
            <div className="flex gap-2 mb-4 md:mb-0">
              <Fragment>
                <Tooltip title={isEditing ? "Cancelar" : "Editar"}>
                  <Button
                    className="edit-button"
                    shape="circle"
                    onClick={() =>
                      setIsEditing((prev) => {
                        if (prev) {
                          form.resetFields();
                          setShowSave(false);
                          return false;
                        }
                        return true;
                      })
                    }
                  >
                    <i className="fa-solid fa-pen icon"></i>
                  </Button>
                </Tooltip>
              </Fragment>
              <Fragment>
                <Tooltip
                  title={
                    consumptionMaterial.archived ? "Desarchivar" : "Archivar"
                  }
                >
                  <Popconfirm
                    title={`${
                      consumptionMaterial.archived ? "Desarchivar" : "Archivar"
                    } material`}
                    description={`¿Está seguro de ${
                      consumptionMaterial.archived ? "desarchivar" : "archivar"
                    } este material?`}
                    onConfirm={handleArchiveMaterial}
                  >
                    <Button className="edit-button" shape="circle">
                      {consumptionMaterial.archived ? (
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                      ) : (
                        <i className="fa-solid fa-box-archive icon"></i>
                      )}{" "}
                    </Button>
                  </Popconfirm>
                </Tooltip>
              </Fragment>
            </div>
          </div>
          <h1 className="text-2xl text-red-700 mb-4 font-semibold">
            Detalles del material de consumo
          </h1>
          <div
            className={`container bg-gray-100 rounded-lg ${
              isEditing ? "outline" : ""
            } outline-blue-200 p-4 p-4`}
          >
            <SingleConsumptionMaterialContent
              consumptionMaterial={consumptionMaterial}
              form={form}
              isEditing={isEditing}
              setIsChanged={setShowSave}
            />

            <div className="mt-4 flex gap-2">
              {" "}
              {isEditing && (
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    form.resetFields();
                    setShowSave(false);
                  }}
                  className={`consumptionMaterial-form-cancel-button`}
                >
                  Cancelar
                </Button>
              )}
              {showSave && (
                <Button
                  type="primary"
                  icon={<i className="fa-solid fa-save"></i>}
                  onClick={handleUpdateMaterial}
                >
                  Guardar
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SingleConsumptionMaterialContainer;
