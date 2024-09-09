import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import LoginContainer from "./containers/Login";
import MainLayout from "./containers/Layout";
import ProtectedRoute from "./helpers/ProtectedRoute";
import esES from "antd/lib/locale/es_ES";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
dayjs.locale("es-mx");

/* Hooks */
import useMenu from "./hooks/useMenu";
/* Containers */
import DashboardContainer from "./containers/Operations/Dashboard";
import CarsContainer from "./containers/Operations/Cars";
import LandingContainer from "./containers/Landing";
import ClientsContainer from "./containers/Operations/Clients";
import SingleCarContainer from "./containers/Operations/Cars/Single";
import SingleClientContainer from "./containers/Operations/Clients/Single";
import SingleAgendaContainer from "./containers/Operations/Agenda/Single";
import AppointmentContainer from "./containers/Appointment";
import InventoryContainer from "./containers/Operations/Inventory";
import SingleStorageMaterialContainer from "./containers/Operations/Inventory/Storage/Single";
import SingleConsumptionMaterialContainer from "./containers/Operations/Inventory/Consumption/Single";
import ProductionContainer from "./containers/Operations/Production";
import OperationSettingsContainer from "./containers/Operations/Settings";
/* Components*/
import Jobs from "./components/operations/Jobs";
import Operators from "./components/operations/Operators";
import Settings from "./components/operations/Settings/SettingsMenu";

/* Styling */
import "./App.css";
import AgendaContainer from "./containers/Operations/Agenda";
import { useEffect } from "react";

function App() {
  const { defaultSelectedHeader } = useMenu();
  return (
    <div className="app mx-0 bg-gray-100 h-screen" id="app">
      <ConfigProvider
        locale={esES}
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#c00113",
            borderRadius: 8,

            // Alias Token
            colorBgContainer: "#f5f5f5",
          },
        }}
      >
        <Routes>
          <Route
            path="/operations"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <DashboardContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/jobs"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <Jobs />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/cars"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <CarsContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/cars/:carId"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <SingleCarContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/operators"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <Operators />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/clients"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <ClientsContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/clients/:clientId"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <SingleClientContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/settings"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <OperationSettingsContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LandingContainer />}></Route>
          <Route
            path="/operations/agenda"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <AgendaContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/agenda/:appointmentId"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <SingleAgendaContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/inventory"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <InventoryContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/inventory/storage"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <InventoryContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/inventory/consumption"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <InventoryContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/inventory/material/storage/:materialId"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <SingleStorageMaterialContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/inventory/material/consumption/:materialId"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <SingleConsumptionMaterialContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/production"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <ProductionContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/landing" element={<LandingContainer />} />
          <Route path="/appointment" element={<AppointmentContainer />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
