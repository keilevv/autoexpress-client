import { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
/* Hooks*/
import useCars from "../../../../hooks/useCars";
/* Components */
import { useSelector } from "react-redux";
import CarForm from "../../../../components/Landing/Agenda/AgendaContent/Car";
import {
  Skeleton,
  Breadcrumb,
  Button,
  Tooltip,
  notification,
  Popconfirm,
  Tag,
} from "antd";

import "./style.css";

function SingleCarContainer() {
  const navitate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [carId, setCarId] = useState("");
  const [form, setForm] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { car, getCar, loading, updateCar } = useCars();

  useEffect(() => {
    if (carId) {
      getCar(carId);
    }
  }, [carId, user]);

  useEffect(() => {
    window.location.pathname.split("/").forEach((item, index) => {
      if (item === "cars") {
        setCarId(window.location.pathname.split("/")[index + 1]);
      }
    });
  }, [window.location.pathname]);

  function handleUpdateCar() {
    if (carId) {
      form.validateFields().then((values) => {
        updateCar(carId, values)
          .then((response) => {
            notification.success({
              message: "Vehiculo actualizado con éxito",
              description: response.data.results.plate,
            });

            getCar(carId);
          })
          .catch((err) => {
            notification.error({
              message: "Error actualizando cliente",
              description: err.message || err.message._message,
            });
          });
      });
    }
  }

  function handleArchiveCar() {
    if (carId) {
      updateCar(carId, { archived: true })
        .then((response) => {
          notification.success({
            message: "Vehiculo archivado con éxito",
            description: response.data.results.plate,
          });

          getCar(carId);
        })
        .catch((err) => {
          notification.error({
            message: "Error archivando auto",
            description: err.message || err.message._message,
          });
        });
    }
  }

  return (
    <div className="single-car-container">
      {loading || !car ? (
        <Skeleton />
      ) : (
        <div className="single-car-content">
          <div className="single-car-header">
            <div className="single-car-header-info">
              <h1 className="single-car-title">Detalles del vehículo</h1>
              <Breadcrumb
                items={[
                  {
                    title: (
                      <a onClick={() => navitate("/operations")}>Operaciones</a>
                    ),
                  },
                  {
                    title: (
                      <a onClick={() => navitate("/operations/cars")}>Autos</a>
                    ),
                  },
                  { title: car?.plate },
                ]}
              />
              {car.archived && (
                <Tag className="single-car-status" color={"gray"}>
                  Archivado
                </Tag>
              )}
              {car.created_date && (
                <p className="single-car-date">{`Fecha de creación: ${dayjs(
                  car.created_date
                ).format("DD/MM/YYYY")}`}</p>
              )}
            </div>
            <div className="single-car-buttons">
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
                <Tooltip title={"Archivar"}>
                  <Popconfirm
                    title="Archivar vehículo"
                    description={`¿Está seguro de archivar este vehículo?`}
                    onConfirm={handleArchiveCar}
                  >
                    <Button className="edit-button" shape="circle">
                      <i className="fa-solid fa-archive icon"></i>
                    </Button>
                  </Popconfirm>
                </Tooltip>
              </Fragment>
            </div>
          </div>
          <div className={`car-form ${isEditing ? "highlight" : ""}`}>
            <CarForm
              isEditing={isEditing}
              car={car}
              setForm={setForm}
              showFullForm={true}
              isCarDetails={true}
              setIsChanged={setShowSave}
            />

            {isEditing && (
              <Button
                onClick={() => {
                  setIsEditing(false);
                  form.resetFields();
                  setShowSave(false);
                }}
                className={`car-form-cancel-button`}
              >
                Cancelar
              </Button>
            )}
            {showSave && (
              <Button
                type="primary"
                className={`car-form-save-button ${!showSave && "disabled"}`}
                icon={<i className="fa-solid fa-save"></i>}
                onClick={handleUpdateCar}
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
export default SingleCarContainer;