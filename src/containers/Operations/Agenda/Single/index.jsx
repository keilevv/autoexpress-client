import { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
/* Hooks*/
import useAppointment from "../../../../hooks/useAppointment";
/* Components */
import { useSelector } from "react-redux";
import AppointmentForm from "../../../../components/Landing/Agenda/AgendaContent/Appointment";
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

function SingleAgendaContainer() {
  const navitate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");
  const [form, setForm] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { appointment, getAppointment, loading, updateAppointment } =
    useAppointment();

  useEffect(() => {
    if (appointmentId) {
      getAppointment(appointmentId);
    }
  }, [appointmentId, user]);

  useEffect(() => {
    window.location.pathname.split("/").forEach((item, index) => {
      if (item === "agenda") {
        setAppointmentId(window.location.pathname.split("/")[index + 1]);
      }
    });
  }, [window.location.pathname]);

  function handleUpdateAppointment() {
    if (appointmentId) {
      form.validateFields().then((values) => {
        if (dayjs(values.date).isValid()) {
          values.date = dayjs(values.date).format("DD/MM/YYYY");
        }
        if (values.time) {
          values.time = dayjs(values.time).format("HH:mm");
        }

        updateAppointment(appointmentId, values)
          .then((response) => {
            notification.success({
              message: "Vehiculo actualizado con éxito",
              description: response.data.results.plate,
            });
            setIsEditing(false);
            setShowSave(false);
            getAppointment(appointmentId);
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

  function handleArchiveAppointment() {
    if (appointmentId) {
      updateAppointment(appointmentId, {
        archived: appointment.archived ? false : true,
      })
        .then((response) => {
          notification.success({
            message: `Vehiculo ${
              appointment.archived ? "desarchivado" : "archivado"
            } con éxito`,
            description: response.data.results.plate,
          });

          getAppointment(appointmentId);
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
      {loading || !appointment ? (
        <Skeleton />
      ) : (
        <div>
          <div className="lg:flex lg:justify-between lg:items-top mb-5">
            <div className="mb-4">
              <h1 className="text-2xl text-red-700 mb-2 font-semibold">
                Detalles de la cita
              </h1>
              <Breadcrumb
                items={[
                  {
                    title: (
                      <a onClick={() => navitate("/operations")}>Operaciones</a>
                    ),
                  },
                  {
                    title: (
                      <a onClick={() => navitate("/operations/agenda")}>
                        Agenda
                      </a>
                    ),
                  },
                  { title: appointment?.client.name },
                ]}
              />
              {appointment.archived && (
                <Tag className="single-appointment-status" color={"gray"}>
                  Archivado
                </Tag>
              )}
              {appointment.created_date && (
                <p className="single-appointment-date">{`Fecha de creación: ${dayjs(
                  appointment.created_date
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
                <Tooltip
                  title={appointment.archived ? "Desarchivar" : "Archivar"}
                >
                  <Popconfirm
                    title={
                      appointment.archived
                        ? "Desarchivar cita"
                        : "Archivar cita"
                    }
                    description={`¿Está seguro de ${
                      appointment.archived ? "desarchivar" : "archivar"
                    } esta cita?`}
                    onConfirm={handleArchiveAppointment}
                  >
                    <Button className="edit-button" shape="circle">
                      {appointment.archived ? (
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
          <div
            className={`container bg-gray-200 rounded-lg ${
              isEditing ? "outline" : ""
            } outline-blue-200 p-4`}
          >
            <AppointmentForm
              isEditing={isEditing}
              appointment={appointment}
              setForm={setForm}
              setIsChanged={setShowSave}
              isAppointmentDetails={true}
            />

            {isEditing && (
              <Button
                onClick={() => {
                  setIsEditing(false);
                  form.resetFields();
                  setShowSave(false);
                }}
                className={`appointment-form-cancel-button`}
              >
                Cancelar
              </Button>
            )}
            {showSave && (
              <Button
                type="primary"
                className={`appointment-form-save-button ${
                  !showSave && "disabled"
                }`}
                icon={<i className="fa-solid fa-save"></i>}
                onClick={handleUpdateAppointment}
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
export default SingleAgendaContainer;
