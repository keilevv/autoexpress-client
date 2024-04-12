import { Tooltip, Button, notification, Popconfirm } from "antd";
import useCars from "../../../hooks/useCars";

/**
 * @param {{id: string, type: string, onArchive: () => void, onEdit: () => void}} props
 */
function TableMenu({ id, type, onArchive, onEdit }) {
  const { updateCar } = useCars();

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
  function handleEdit() {}
  function handleArchive() {
    if (type === "cars") {
      updateCar(id, { archived: true }).then((response) => {
        notification.success({
          message: "Vehiculo archivado con exito",
          description: response.data.results.plate,
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
        />
      </Tooltip>
      <Tooltip title="Archivar">
        <Popconfirm
          title="Archivar vehículo"
          description={`¿Está seguro de archivar ${getDescription()}?`}
          onConfirm={handleArchive}
        >
          <Button
            type="text"
            style={{ marginLeft: "5px" }}
            shape="circle"
            icon={<i className="fa-solid fa-box-archive"></i>}
          />
        </Popconfirm>
      </Tooltip>
    </div>
  );
}
export default TableMenu;
