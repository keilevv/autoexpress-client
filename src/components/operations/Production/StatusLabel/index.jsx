import { useState, useEffect } from "react";

function StatusLabel({ status }) {
  const [statusState, setStatusState] = useState({
    value: "pending",
    label: "Pendiente",
    color: "orange",
  });
  const statusTypes = [
    { value: "pending", label: "Pendiente", color: "bg-orange-300" },
    { value: "in-progress", label: "En progreso", color: "bg-blue-300" },
    { value: "completed", label: "Completada", color: "bg-green-300" },
  ];

  useEffect(() => {
    if (status) {
      statusTypes.map((item) => {
        if (item.value === status) {
          setStatusState(item);
        }
      });
    }
  }, [status]);
  

  return (
    <div className="flex">
      <div className={`${statusState.color} p-1 rounded-lg shadow-md`}>
        <p className="uppercase font-medium">{statusState.label}</p>
      </div>
    </div>
  );
}
export default StatusLabel;
