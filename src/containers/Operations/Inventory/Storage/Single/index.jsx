import { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
/* Hooks*/
import useInventory from "../../../../../hooks/useInventory";
/* Components */
import { useSelector } from "react-redux";
import StorageMaterialForm from "../../../../../components/operations/Inventory/StrorageMaterialForm";
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

import "./style.css";

function SingleStorageMaterial() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [materialId, setClientId] = useState("");
  const [form] = Form.useForm();
  const [payload, setPayload] = useState({});
  const {
    storageMaterial,
    getStorageMaterial,
    loading,
    updateStorageMaterial,
  } = useInventory();

  useEffect(() => {
    if (materialId) {
      getStorageMaterial(materialId);
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
      updateStorageMaterial(materialId, payload)
        .then((response) => {
          notification.success({
            message: "Material actualizado con éxito",
            description: `${response.data.results.name} Ref. #${response.data.results.reference}`,
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
    }
  }

  function handleArchiveClient() {
    if (materialId) {
      updateStorageMaterial(materialId, {
        archived: storageMaterial.archived ? false : true,
      })
        .then((response) => {
          notification.success({
            message: `Material ${
              storageMaterial.archived ? "desarchivado" : "archivado"
            } con éxito`,
            description: `${response.data.results.name} Ref. #${response.data.results.reference}`,
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
      {loading || !storageMaterial ? (
        <Skeleton />
      ) : (
        <div>
          <div className="lg:flex lg:justify-between lg:items-top">
            <div className="flex flex-col gap-4 mb-4">
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
                      <a
                        onClick={() =>
                          navigate("/operations/inventory/storage")
                        }
                      >
                        Almacén
                      </a>
                    ),
                  },
                  {
                    title: (
                      <p className="text text-red-700 font-semibold">{`${storageMaterial.name} Ref. #${storageMaterial.reference}`}</p>
                    ),
                  },
                ]}
              />
              {storageMaterial.archived && (
                <Tag className="max-w-[70px]" color={"gray"}>
                  Archivado
                </Tag>
              )}
              {storageMaterial.created_date && (
                <p className="text-sm text-gray-500 font-semibold">{`Fecha de creación: ${dayjs(
                  storageMaterial.created_date
                ).format("DD/MM/YYYY")}`}</p>
              )}
            </div>
            <div className="single-storageMaterial-buttons flex gap-2 mb-4 md:mb-0">
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
                  title={storageMaterial.archived ? "Desarchivar" : "Archivar"}
                >
                  <Popconfirm
                    title={`${
                      storageMaterial.archived ? "Desarchivar" : "Archivar"
                    } material`}
                    description={`¿Está seguro de ${
                      storageMaterial.archived ? "desarchivar" : "archivar"
                    } este material?`}
                    onConfirm={handleArchiveClient}
                  >
                    <Button className="edit-button" shape="circle">
                      {storageMaterial.archived ? (
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
            Detalles del material
          </h1>
          <div
            className={`container bg-gray-100 rounded-lg ${
              isEditing ? "outline" : ""
            } outline-blue-200 p-4 p-4`}
          >
            <StorageMaterialForm
              form={form}
              isEditing={isEditing}
              storageMaterial={storageMaterial}
              showFullForm={true}
              setIsChanged={setShowSave}
              setPayload={setPayload}
            />
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
export default SingleStorageMaterial;
