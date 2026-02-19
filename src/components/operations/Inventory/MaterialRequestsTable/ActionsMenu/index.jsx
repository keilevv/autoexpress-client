import { Button, Popconfirm, Tooltip } from "antd";
import { useSelector } from "react-redux";

function MaterialRequestsActionsMenu({
  onApprove = () => {},
  onReject = () => {},
  loading = false,
  isArchived = false,
  onArchive = () => {},
}) {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex gap-2">
      {user?.role?.includes("admin") && (
        <div>
          <Tooltip title="Aprobar">
            <Popconfirm
              title="Aprobar Solicitud"
              description={"¿Está seguro de aprobar esta solicitud?"}
              onConfirm={onApprove}
            >
              <Button
                disabled={loading}
                type="text"
                icon={<i className="fa-solid fa-check text-green-500"></i>}
              />
            </Popconfirm>
          </Tooltip>
          <Tooltip title={"Rechazar"}>
            <Popconfirm
              title="Rechazar Solicitud"
              description={"¿Está seguro de rechazar esta solicitud?"}
              onConfirm={onReject}
            >
              <Button
                disabled={loading}
                type="text"
                icon={<i className="fa-solid fa-xmark text-red-500"></i>}
              />
            </Popconfirm>
          </Tooltip>{" "}
        </div>
      )}
      <div>
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
    </div>
  );
}
export default MaterialRequestsActionsMenu;
