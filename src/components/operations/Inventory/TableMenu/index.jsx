import { Tooltip, Button, notification, Popconfirm } from "antd";

function InventoryTableMenu({ isArchived, onEdit, onArchive }) {
  return (
    <div className="flex">
      <Tooltip title="Editar">
        <Button
          type="text"
          shape="circle"
          icon={<i className="fa-solid fa-pen"></i>}
          onClick={onEdit}
        />
      </Tooltip>
      <Tooltip title={isArchived ? "Desarchivar" : "Archivar"}>
        <Popconfirm
          title="Archivar material"
          description={"¿Está seguro de archivar este material?"}
          onConfirm={onArchive}
        >
          <Button
            type="text"
            shape="circle"
            icon={<i className="fa-solid fa-archive"></i>}
          />
        </Popconfirm>
      </Tooltip>{" "}
    </div>
  );
}

export default InventoryTableMenu;
