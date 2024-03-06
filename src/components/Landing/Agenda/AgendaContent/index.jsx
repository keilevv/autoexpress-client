import React, { useState } from "react";
import moment from "moment";
/* Components */
import { RestOutlined } from "@ant-design/icons";
import { Steps, theme, Button, message, notification } from "antd";
import ClientForm from "./Client";
import CarForm from "./Car";
import AppointmentForm from "./Appointment";
import AppointmentConfirm from "./Confirm";
/* Hooks */
import useClient from "../../../../hooks/useClient";
import useCars from "../../../../hooks/useCars";
import useAppointment from "../../../../hooks/useAppointment";
import "./style.css";
import dayjs from "dayjs";

/**
 * @param {{ isModalVisible?: boolean, setIsModalVisible?: () => void }} props
 */
function AgendaContent({ isModalVisible, setIsModalVisible }) {
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
          return { ...payload, client: response.data.results._id };
        });
        notification.success({
          message: "Cliente creado con éxito",
          description:
            response.data.results.name +
            " " +
            response.data.results.surname +
            " " +
            response.data.results.lastname,
        });
        next();
      })
      .catch((err) => {
        notification.error({
          message: "Error creando cliente",
          description: err.message || err.message._message,
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
          return { ...payload, client: response.data.results._id };
        });
        setShowFullForm(true);
      })
      .catch(() => {
        setShowFullForm(true);
        notification.warning({
          message: "Cliente no encontrado",
          description:
            "Por favor ingrese la información para ser registrado(a)",
        });
      });
  };

  const handleUpdateClient = (values) => {
    values.birthday = moment(
      new Date(values.birthday),
      "DD/MM/YYYY",
      true
    ).format("DD/MM/YYYY");

    updateClient(appointmentPayload.client, values)
      .then((response) => {
        notification.success({
          message: "Cliente actualizado con éxito",
          description:
            response.data.results.name +
            " " +
            response.data.results.surname +
            " " +
            response.data.results.lastname,
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

  const handleCreateCar = (values) => {
    createCar(values)
      .then((response) => {
        setaAppointmentPayload((payload) => {
          return { ...payload, car: response.data.results._id };
        });
        notification.success({
          message: "Auto registrado con éxito",
          description: response.data.results.plate,
        });
        next();
      })
      .catch((err) => {
        notification.error({
          message: "Error creando auto",
          description: err.message._message || err.message,
        });
      });
  };

  const handleGetCar = (values) => {
    getCarByPlate(values.plate, appointmentPayload.client)
      .then((response) => {
        notification.success({
          message: "Vehículo encontrado",
          description:
            "Por favor ayúdenos a verificar que la información sea correcta",
          duration: 7,
        });
        setaAppointmentPayload((payload) => {
          return { ...payload, car: response.data.results._id };
        });
        setShowFullForm(true);
      })
      .catch(() => {
        setShowFullForm(true);
        notification.warning({
          message: "Vehiculo no encontrado",
        });
      });
  };

  const handleUpdateCar = (values) => {
    updateCar(appointmentPayload.car, values)
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
    <div className="agenda-content" style={{ minWidth: "102px" }}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{agendaSteps[current].content}</div>
      <div style={{ marginTop: 24 }} className="agenda-footer-container">
        <div className="handle-steps">
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
                setIsModalVisible(false);
                form.resetFields();
                setCurrent(0);
              }}
            >
              Terminar
            </Button>
          )}
          {((current !== 0 && current !== agendaSteps.length - 1) ||
            showFullForm) && (
            <Button
              className="prev-slide-button"
              onClick={() => prev()}
              loading={loadingClient || loadingCar}
            >
              Atras
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
