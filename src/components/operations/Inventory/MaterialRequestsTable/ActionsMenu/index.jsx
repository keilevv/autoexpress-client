import { Button, Popconfirm, Tooltip } from "antd";
import { useSelector } from "react-redux";
function MaterialRequestsActionsMenu({ onApprove, onReject, loading }) {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex gap-2">
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
  );
}
export default MaterialRequestsActionsMenu;
