import { Tooltip, Button, notification, Popconfirm } from "antd";
import useCars from "../../../hooks/useCars";
import useClient from "../../../hooks/useClient";
import useAppointment from "../../../hooks/useAppointment";
import useMessages from "../../../hooks/useMessages";
import { useNavigate } from "react-router-dom";
import "./style.css"

/**
 * @param {{
 *  id: string,
 *  type: string,
 *  isArchived?: boolean,
 *  onArchive: () => void,
 *  onEdit: () => void
 * }} props
 */
function TableMenu({ id, type, isArchived = false, onArchive, onEdit }) {
  const navigate = useNavigate();
  const { updateCar } = useCars();
  const { updateClient } = useClient();
  const { updateAppointment } = useAppointment();
  const { updateMessage } = useMessages();

  function getDescription() {
    if (type === "cars") {
      return "este vehículo";
    }
    if (type === "clients") {
      return "este cliente";
    }
    if (type === "appointments") {
      return "esta cita";
    }
    if (type === "messages") {
      return "este mensaje";
    }
  }
  function handleEdit() {
    if (type === "cars") {
      navigate(`/operations/cars/${id}/`);
    }
    if (type === "clients") {
      navigate(`/operations/clients/${id}/`);
    }
    if (type === "appointments") {
      navigate(`/operations/agenda/${id}/`);
    }
    if (type === "messages") {
      navigate(`/operations/messages/${id}/`);
    }
  }
  function handleArchive() {
    if (type === "cars") {
      updateCar(id, { archived: !isArchived }).then((response) => {
        notification.success({
          message: `Vehiculo ${
            isArchived ? "desarchivado" : "archivado"
          } con éxito`,
          description: response.data.results.plate,
        });
        onArchive();
      });
    }
    if (type === "clients") {
      updateClient(id, { archived: !isArchived }).then((response) => {
        notification.success({
          message: `Cliente ${
            isArchived ? "desarchivado" : "archivado"
          } con éxito`,
          description: response.data.results.name,
        });
        onArchive();
      });
    }
    if (type === "appointments") {
      updateAppointment(id, { archived: !isArchived }).then((response) => {
        notification.success({
          message: `Cita ${
            isArchived ? "desarchivada" : "archivada"
          } con éxito`,
          description: response.data.results.date,
        });
        onArchive();
      });
    }
    if (type === "messages") {
      updateMessage(id, { archived: true }).then((response) => {
        notification.success({
          message: "Mensaje archivada con éxito",
          description: response.data.results.date,
        });
        onArchive();
      });
    }
  }
  return (
    <div className="table-menu-container">
      <Tooltip title="Editar">
        <Button
          type="text"
          shape="circle"
          icon={<i className="fa-solid fa-pen"></i>}
          onClick={handleEdit}
        />
      </Tooltip>
      <Tooltip title={isArchived ? "Desarchivar" : "Archivar"}>
        <Popconfirm
          title="Archivar vehículo"
          description={`¿Está seguro de ${
            isArchived ? "desarchivar" : "archivar"
          } ${getDescription()}?`}
          onConfirm={handleArchive}
        >
          <Button
            type="text"
            shape="circle"
            icon={<i className="fa-solid fa-box-archive"></i>}
          />
        </Popconfirm>
      </Tooltip>
    </div>
  );
}
export default TableMenu;
