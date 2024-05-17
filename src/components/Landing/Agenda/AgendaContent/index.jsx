import React, { useState } from "react";
import moment from "moment";
/* Components */
import { RestOutlined } from "@ant-design/icons";
import { Steps, theme, Button, message, notification } from "antd";
import ClientForm from "../../../Common/ClientForm";
import CarForm from "../../../Common/CarForm";
import AppointmentForm from "../../../Common/AppointmentForm";
import AppointmentConfirm from "./Confirm";
/* Hooks */
import { useNavigate } from "react-router-dom";
import useClient from "../../../../hooks/useClient";
import useCars from "../../../../hooks/useCars";
import useAppointment from "../../../../hooks/useAppointment";
import "./style.css";
import dayjs from "dayjs";

/**
 * @param {{ isModalVisible?: boolean, setIsModalVisible?: () => void }} props
 */
function AgendaContent({ isModalVisible, setIsModalVisible }) {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState(null);
  const [showFullForm, setShowFullForm] = useState(false);
  const [appointmentPayload, setaAppointmentPayload] = useState({
    client: null,
    car: null,
  });

  const {
    createClient,
    getClientByCountryId,
    updateClient,
    client,
    loading: loadingClient,
  } = useClient();

  const {
    createCar,
    getCarByPlate,
    updateCar,
    car,
    loading: loadingCar,
  } = useCars();

  const {
    createAppointment,
    appointment,
    loading: loadingAppointment,
  } = useAppointment();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
    if (current === 0) {
      setShowFullForm(false);
      // form.resetFields();
    }
  };

  const handleValidateForm = () => {
    form.validateFields().then((values) => {
      if (current === 0) {
        if (showFullForm) {
          if (appointmentPayload.client) {
            return handleUpdateClient(values);
          }
          return handleCreateClient(values);
        }
        return handleGetClient(values);
      }
      if (current === 1) {
        if (showFullForm) {
          if (appointmentPayload.car) {
            return handleUpdateCar(values);
          }
          return handleCreateCar(values);
        }
        return handleGetCar(values);
      }
      if (current === 2) {
        handleCreateAppointment(values);
      }
    });
  };

  const agendaSteps = [
    {
      title: "Cliente",
      content: (
        <ClientForm
          setForm={setForm}
          showFullForm={showFullForm}
          client={client}
          current={current}
        />
      ),
    },
    {
      title: "Auto",
      content: (
        <CarForm
          setForm={setForm}
          showFullForm={showFullForm}
          client={client}
          car={car}
          current={current}
        />
      ),
    },
    {
      title: "Fecha",
      content: <AppointmentForm setForm={setForm} />,
    },
    {
      title: "Confirmación",
      content: <AppointmentConfirm appointment={appointment} />,
    },
  ];

  const items = agendaSteps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    display: "flex",
    justifyContent: "center",
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
  };

  const handleCreateClient = (values) => {
    values.birthday = moment(
      new Date(values.birthday),
      "DD/MM/YYYY",
      true
    ).format("DD/MM/YYYY");

    createClient(values)
      .then((response) => {
        setaAppointmentPayload((payload) => {
          return {
            ...payload,
            client: response.data.results,
          };
        });
        notification.success({
          message: "Cliente creado con éxito",
          description: `${response.data.results.name} ${response.data.results.surname} ${response.data.results.lastname}`,
        });
        next();
      })
      .catch((err) => {
        notification.error({
          message: "Error creando cliente",
          description: err,
        });
      });
  };

  const handleGetClient = (values) => {
    getClientByCountryId(values.country_id)
      .then((response) => {
        notification.success({
          message: "¡Bienvenido(a) de vuelta!",
          description:
            "Por favor ayúdenos a verificar que la información sea correcta",
          duration: 7,
        });
        setaAppointmentPayload((payload) => {
          return {
            ...payload,
            client: response.data.results,
          };
        });
        setShowFullForm(true);
      })
      .catch((err) => {
        setaAppointmentPayload((payload) => {
          return { ...payload, client: null };
        });
        setShowFullForm(true);
        notification.warning({
          message: "Cliente no encontrado",
          description:
            "Por favor ingrese la información para ser registrado(a)",
        });
      });
  };

  const handleUpdateClient = (values, isCarCreation = false) => {
    if (!isCarCreation) {
      values.birthday = moment(
        new Date(values.birthday),
        "DD/MM/YYYY",
        true
      ).format("DD/MM/YYYY");
    }

    updateClient(appointmentPayload.client._id, values)
      .then((response) => {
        notification.success({
          message: isCarCreation
            ? "Auto asignado a cliente"
            : "Cliente actualizado con éxito",
          description: `${response.data.results.name} ${response.data.results.surname} ${response.data.results.lastname}`,
        });
        setShowFullForm(false);
        !isCarCreation && next();
      })
      .catch((err) => {
        notification.error({
          message: "Error actualizando cliente",
          description: err.message || err.message._message,
        });
      });
  };

  const handleCreateCar = (values) => {
    values.clients = [appointmentPayload.client];
    createCar(values)
      .then((response) => {
        setaAppointmentPayload((payload) => {
          return {
            ...payload,
            car: response.data.results,
          };
        });
        notification.success({
          message: "Auto registrado con éxito",
          description: response.data.results.plate,
        });
        handleUpdateClient(
          {
            cars: [response.data.results._id].concat(
              appointmentPayload.client.cars
            ),
          },
          true
        );
        next();
      })
      .catch((err) => {
        notification.error({
          message: "Error creando auto",
          description: err,
        });
      });
  };

  const handleGetCar = (values) => {
    getCarByPlate(values.plate, appointmentPayload.client._id)
      .then((response) => {
        notification.success({
          message: "Vehículo encontrado",
          description:
            "Por favor ayúdenos a verificar que la información sea correcta",
          duration: 7,
        });
        setaAppointmentPayload((payload) => {
          return {
            ...payload,
            car: response.data.results,
          };
        });
        setShowFullForm(true);
      })
      .catch((err) => {
        setaAppointmentPayload((payload) => {
          return { ...payload, car: null };
        });
        if (err === "Unable to get car") {
          notification.error({
            message: "Sin autorización",
          });
        } else {
          notification.warning({
            message: "Auto no encontrado",
          });
          setShowFullForm(true);
        }
      });
  };

  const handleUpdateCar = (values) => {
    updateCar(appointmentPayload.car._id, values)
      .then((response) => {
        notification.success({
          message: "Vehiculo actualizado con éxito",
          description: response.data.results.plate,
        });
        setShowFullForm(false);
        next();
      })
      .catch((err) => {
        notification.error({
          message: "Error actualizando cliente",
          description: err.message || err.message._message,
        });
      });
  };

  const handleCreateAppointment = (values) => {
    const formattedTime = dayjs(values.time).format("HH:mm");
    const payload = { ...appointmentPayload, ...values, time: formattedTime };
    createAppointment(payload)
      .then(() => {
        notification.success({ message: "Cita creada con éxito" });
        setaAppointmentPayload({ client: null, car: null });
        next();
      })
      .catch((err) => {
        notification.error({
          message: "Error crendo cita",
          description: err.message || err.message._message,
        });
      });
  };
  return (
    <div>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{agendaSteps[current].content}</div>
      <div className="flex gap-4 mt-8 justify-center">
        <div className="flex gap-2">
          {((current !== 0 && current !== agendaSteps.length - 1) ||
            showFullForm) && (
            <Button
              onClick={() => prev()}
              loading={loadingClient || loadingCar}
            >
              Atras
            </Button>
          )}
          {current < agendaSteps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                handleValidateForm();
              }}
              loading={loadingClient || loadingCar || loadingAppointment}
            >
              Siguiente
            </Button>
          )}
          {current === agendaSteps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                navigate("/home");
              }}
            >
              Terminar
            </Button>
          )}
        </div>
        {current !== agendaSteps.length - 1 && (
          <Button icon={<RestOutlined />} onClick={() => form.resetFields()}>
            Limpiar
          </Button>
        )}
      </div>
    </div>
  );
}
export default AgendaContent;
