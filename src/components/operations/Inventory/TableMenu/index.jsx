import { Tooltip, Button, notification, Popconfirm } from "antd";

function InventoryTableMenu({ isArchived, onEdit, onArchive, loading }) {
  return (
    <div className="flex">
      <Tooltip title="Editar">
        <Button
          disabled={loading}
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
            disabled={loading}
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
