import { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
/* Hooks*/
import useInventory from "../../../../../hooks/useInventory";
/* Components */
import { useSelector } from "react-redux";
import SingleConsumptionMaterialForm from "./SingleMaterialForm";
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

  function handleUpdateMaterial() {
    if (materialId) {
      form.validateFields().then((values) => {
        updateConsumptionMaterial(materialId, values)
          .then((response) => {
            notification.success({
              message: "Material actualizado con éxito",
              description: `${response.data.results.name} - ${response.data.results.reference}`,
            });
            setIsEditing(false);
            setShowSave(false);
            getStorageMaterial(materialId);
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
        archived: material.archived ? false : true,
      })
        .then((response) => {
          notification.success({
            message: `Material${
              material.archived ? "desarchivado" : "archivado"
            } con éxito`,
            description: `${response.data.results.name} - ${response.data.results.reference}`,
          });
          getStorageMaterial(materialId);
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
          <div className="lg:flex lg:justify-between lg:items-top mb-5">
            <div className="mb-4">
              <h1 className="text-2xl text-red-700 mb-2 font-semibold">
                Detalles del material de consumo
              </h1>
              <Breadcrumb
                items={[
                  {
                    title: (
                      <a onClick={() => navigate("/operations")}>Operaciones</a>
                    ),
                  },
                  {
                    title: (
                      <a onClick={() => navigate("/operations/inventory")}>
                        Inventario
                      </a>
                    ),
                  },
                  {
                    title: (
                      <p className="text text-red-700 font-semibold">{`${consumptionMaterial.name} - ${consumptionMaterial.reference}`}</p>
                    ),
                  },
                ]}
              />
              {consumptionMaterial.archived && (
                <Tag
                  className="single-consumptionMaterial-status"
                  color={"gray"}
                >
                  Archivado
                </Tag>
              )}
              {consumptionMaterial.created_date && (
                <p className="mt-5 text-sm text-gray-500 font-semibold">{`Fecha de creación: ${dayjs(
                  consumptionMaterial.created_date
                ).format("DD/MM/YYYY")}`}</p>
              )}
            </div>
            <div className="single-consumptionMaterial-buttons flex gap-2">
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
                  title={consumptionMaterial.archived ? "Desarchivar" : "Archivar"}
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
          <div
            className={`container bg-gray-100 rounded-lg ${
              isEditing ? "outline" : ""
            } outline-blue-200 p-4 p-4`}
          >
            <div> Material de consumo</div>

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
                className={`consumptionMaterial-form-save-button ${
                  !showSave && "disabled"
                }`}
                icon={<i className="fa-solid fa-save"></i>}
                onClick={handleUpdateMaterial}
              >
                Guardar
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default SingleConsumptionMaterialContainer;
