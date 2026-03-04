import { useState, useEffect } from "react";
import { statusTypes } from "../../../../helpers/constants";

function StatusLabel({ status  }) {
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
      <div
        className={`${statusState.color} px-2 py-1 rounded-lg border border-gray-100`}
      >
        <p className="uppercase font-semibold">{statusState?.label}</p>
      </div>
    </div>
  );
}
export default StatusLabel;
