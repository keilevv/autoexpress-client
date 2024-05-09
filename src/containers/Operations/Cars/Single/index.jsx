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
            setIsEditing(false);
            setShowSave(false);
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
      updateCar(carId, { archived: car.archived ? false : true })
        .then((response) => {
          notification.success({
            message: `Vehiculo ${
              car.archived ? "desarchivado" : "archivado"
            } con éxito`,
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
    <div>
      {loading || !car ? (
        <Skeleton />
      ) : (
        <div>
          <div className="lg:flex lg:justify-between lg:items-top mb-5">
            <div className="mb-4">
              <h1 className="text-2xl text-red-700 mb-2 font-semibold">Detalles del vehículo</h1>
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
            <div className="flex gap-2">
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
                <Tooltip title={car.archived ? "Desarchivar" : "Archivar"}>
                  <Popconfirm
                    title={
                      car.archived
                        ? "Desarchivar vehículo"
                        : "Archivar vehículo"
                    }
                    description={`¿Está seguro de ${
                      car.archived ? "desarchivar" : "archivar"
                    } este vehículo?`}
                    onConfirm={handleArchiveCar}
                  >
                    <Button className="edit-button" shape="circle">
                      {car.archived ? (
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                      ) : (
                        <i className="fa-solid fa-box-archive icon"></i>
                      )}
                    </Button>
                  </Popconfirm>
                </Tooltip>
              </Fragment>
            </div>
          </div>
          <div className={`container bg-gray-200 rounded-lg ${
              isEditing ? "outline" : ""
            } outline-blue-200 p-4`}>
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
