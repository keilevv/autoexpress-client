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
import "./style.css";

/**
 * @param {{ isModalVisible?: boolean }} props
 */
function AgendaContent({ isModalVisible }) {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState(null);
  const [appointmentPayload, setaAppointmentPayload] = useState({
    date: null,
    time: null,
    user: null,
    client: null,
    car: null,
  });

  const { createClient } = useClient();
  const { createCar } = useCars();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleValidateForm = () => {
    form.validateFields().then((values) => {
      if (current === 0) {
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
      }
      if (current === 1) {
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
      }
    });
  };

  const agendaSteps = [
    {
      title: "Cliente",
      content: <ClientForm setForm={setForm} />,
    },
    {
      title: "Auto",
      content: <CarForm setForm={setForm} />,
    },
    {
      title: "Fecha",
      content: <AppointmentForm setForm={setForm} />,
    },
    {
      title: "Confirmar",
      content: <AppointmentConfirm />,
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

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{agendaSteps[current].content}</div>
      <div style={{ marginTop: 24 }} className="agenda-footer-container">
        <div>
          {current < agendaSteps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                handleValidateForm();
              }}
            >
              Siguiente
            </Button>
          )}
          {current === agendaSteps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Terminar
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previo
            </Button>
          )}
        </div>
        <Button icon={<RestOutlined />} onClick={() => form.resetFields()}>
          Limpiar
        </Button>
      </div>
    </>
  );
}
export default AgendaContent;
