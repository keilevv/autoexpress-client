import { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
/* Hooks*/
import useClient from "../../../../hooks/useClient";
/* Components */
import { useSelector } from "react-redux";
import ClientForm from "../../../../components/Landing/Agenda/AgendaContent/Client";
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

function SingleClient() {
  const navitate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [clientId, setClientId] = useState("");
  const [form, setForm] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { client, getClient, loading, updateClient } = useClient();

  useEffect(() => {
    if (clientId) {
      getClient(clientId);
    }
  }, [clientId, user]);

  useEffect(() => {
    window.location.pathname.split("/").forEach((item, index) => {
      if (item === "clients") {
        setClientId(window.location.pathname.split("/")[index + 1]);
      }
    });
  }, [window.location.pathname]);

  function handleUpdateClient() {
    if (clientId) {
      form.validateFields().then((values) => {
        updateClient(clientId, values)
          .then((response) => {
            notification.success({
              message: "Cliente actualizado con éxito",
              description: `${response.data.results.name} ${response.data.results.surname} ${response.data.results.lastname}`,
            });
            setIsEditing(false);
            setShowSave(false);
            getClient(clientId);
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

  function handleArchiveClient() {
    if (clientId) {
      updateClient(clientId, { archived: client.archived ? false : true })
        .then((response) => {
          notification.success({
            message: `Cliente ${
              client.archived ? "desarchivado" : "archivado"
            } con éxito`,
            description: `${response.data.results.name} ${response.data.results.surname} ${response.data.results.lastname}`,
          });
          getClient(clientId);
        })
        .catch((err) => {
          notification.error({
            message: "Error archivando cliente",
            description: err.message || err.message._message,
          });
        });
    }
  }

  return (
    <div className="single-client-container">
      {loading || !client ? (
        <Skeleton />
      ) : (
        <div>
          <div className="lg:flex lg:justify-between lg:items-top mb-5">
            <div className="mb-4">
              <h1 className="text-2xl text-red-700 mb-2 font-semibold">Detalles del cliente</h1>
              <Breadcrumb
                items={[
                  {
                    title: (
                      <a onClick={() => navitate("/operations")}>Operaciones</a>
                    ),
                  },
                  {
                    title: (
                      <a onClick={() => navitate("/operations/clients")}>
                        Clientes
                      </a>
                    ),
                  },
                  {
                    title: `${client.name} ${client.surname} ${client.lastname}`,
                  },
                ]}
              />
              {client.archived && (
                <Tag className="single-client-status" color={"gray"}>
                  Archivado
                </Tag>
              )}
              {client.created_date && (
                <p className="single-client-date">{`Fecha de creación: ${dayjs(
                  client.created_date
                ).format("DD/MM/YYYY")}`}</p>
              )}
            </div>
            <div className="single-client-buttons flex gap-2">
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
                <Tooltip title={client.archived ? "Desarchivar" : "Archivar"}>
                  <Popconfirm
                    title={`${
                      client.archived ? "Desarchivar" : "Archivar"
                    } cliente`}
                    description={`¿Está seguro de ${
                      client.archived ? "desarchivar" : "archivar"
                    } este cliente?`}
                    onConfirm={handleArchiveClient}
                  >
                    <Button className="edit-button" shape="circle">
                      {client.archived ? (
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
          <div className={`container bg-gray-200 rounded-lg ${isEditing ? "outline" : ""} outline-blue-200 p-4 p-4`}>
            <ClientForm
              isEditing={isEditing}
              client={client}
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
                className={`client-form-cancel-button`}
              >
                Cancelar
              </Button>
            )}
            {showSave && (
              <Button
                type="primary"
                className={`client-form-save-button ${!showSave && "disabled"}`}
                icon={<i className="fa-solid fa-save"></i>}
                onClick={handleUpdateClient}
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
export default SingleClient;
