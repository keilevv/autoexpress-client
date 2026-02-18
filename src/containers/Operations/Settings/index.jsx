import SettingsMenu from "../../../components/operations/Settings/SettingsMenu";
import EmployeesList from "../../../components/operations/Settings/Employees/EmployeesList";
import { useState } from "react";
import { FaCog, FaUsers } from "react-icons/fa";
import BuilderBotSettings from "../../../components/operations/Settings/Builderbot";
import UserSettingsContainer from "./User";

function OperationSettingsContainer() {
  const [title, setTitle] = useState({
    key: "employees",
    label: "Empleados",
    icon: <FaUsers />,
  });

  const onSelectMenuOption = (key) => {
    switch (key) {
      case "employees":
        return <EmployeesList />;
      case "whatsapp-bot":
        return <BuilderBotSettings />;
      case "user":
        return <UserSettingsContainer />;
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold mb-5 text-red-700 flex items-center">
        <FaCog className="mr-2" />
        Configuración
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <SettingsMenu
          setTitle={setTitle}
          onSelectMenuOption={onSelectMenuOption}
        />

        <div className="w-full ">
          <div className="w-full">
            <h1 className="text-2xl font-semibold mb-5 text-red-700 flex gap-2 items-center">
              {title.icon}
              {title.label}
            </h1>
            {onSelectMenuOption(title.key)}
          </div>
        </div>
      </div>
    </>
  );
}

export default OperationSettingsContainer;
