import { useState, useEffect } from "react";
import { statusTypes } from "../../../../helpers/constants";

function StatusLabel({ status }) {
  const [statusState, setStatusState] = useState({
    value: "pending",
    label: "Pendiente",
    color: "orange",
  });

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
