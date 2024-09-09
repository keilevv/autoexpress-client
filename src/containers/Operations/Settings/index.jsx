import SettingsMenu from "../../../components/operations/Settings/SettingsMenu";
import EmployeesList from "../../../components/operations/Settings/Employees/EmployeesList";
import { useState } from "react";
function OperationSettingsContainer() {
  const [title, setTitle] = useState("Lista de empleados");
  return (
    <>
      <h1 className="text-3xl font-semibold mb-5 text-red-700">
        Configuración
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <SettingsMenu
          onSelectMenuOption={(key) => {
            switch (key) {
              case "employees":
                setTitle("Lista de empleados");
                break;
              default:
                setTitle("Configuración");
            }
          }}
        />

        <div className="w-full ">
          <div className="w-full">
            <h1 className="text-2xl font-semibold mb-5 text-red-700">
              {title}
            </h1>
            <EmployeesList />
          </div>
        </div>
      </div>
    </>
  );
}

export default OperationSettingsContainer;
