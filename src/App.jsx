import { Route, Routes, Navigate } from "react-router-dom";
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
import Home from "./Landing/pages/Home";
import ColisionPage from "./Landing/pages/Colision";
import DetalladoPage from "./Landing/pages/Detallado";
import LinkPage from "./Landing/pages/Link";
import NotFound from "./Landing/pages/NotFound";
import ClientsContainer from "./containers/Operations/Clients";
import SingleCarContainer from "./containers/Operations/Cars/Single";
import SingleClientContainer from "./containers/Operations/Clients/Single";
import SingleAgendaContainer from "./containers/Operations/Agenda/Single";
import AppointmentContainer from "./containers/Appointment";
import InventoryContainer from "./containers/Operations/Inventory";
import SingleStorageMaterialContainer from "./containers/Operations/Inventory/Storage/Single";
import SingleConsumptionMaterialContainer from "./containers/Operations/Inventory/Consumption/Single";
import ProductionContainer from "./containers/Operations/Production";
import JobOrdersSingleContainer from "./containers/Operations/Production/Jobs/Single";
import OperationSettingsContainer from "./containers/Operations/Settings";
import InventoryRequestsContainer from "./containers/Operations/Inventory/Requests";
/* Components*/
import Jobs from "./components/operations/Jobs";
import Operators from "./components/operations/Operators";
import { useSelector } from "react-redux";

/* Styling */
import AgendaContainer from "./containers/Operations/Agenda";

function App() {
  const { defaultSelectedHeader } = useMenu();
  const user = useSelector((state) => state.auth.user);
  return (
    <div
      className="app relative bg-gray-100 min-h-screen flex flex-col"
      id="app"
    >
      <ConfigProvider
        locale={esES}
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#c00113",
            borderRadius: 8,

            // Alias Token
            colorBgContainer: "#f5f5f5",
            fontFamily: "Zen Dots, sans-serif",
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
          />
          <Route
            path="/operations/inventory/storage"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <InventoryContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/inventory/consumption"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <InventoryContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/inventory/consumption/add"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <InventoryContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          {/* Dynamic parameterized routes */}
          <Route
            path="/operations/inventory/:owner"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <InventoryContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/inventory/:owner/:tab"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <InventoryContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operations/inventory/:owner/consumption/add"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <InventoryContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          />{" "}
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
          <Route
            path="/operations/production/autoexpress"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <ProductionContainer owner={"autoexpress"} />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/production/autodetailing"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <ProductionContainer owner={"autodetailing"} />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/production/jobs/:jobId"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <JobOrdersSingleContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/production/autoexpress/jobs/:jobId"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <JobOrdersSingleContainer owner={"autoexpress"} />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/operations/production/autodetailing/jobs/:jobId"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <JobOrdersSingleContainer owner={"autodetailing"} />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/landing" element={<Home />} />
          <Route path="/landing/colision" element={<ColisionPage />} />
          <Route path="/colision" element={<ColisionPage />} />
          <Route path="/landing/detallado" element={<DetalladoPage />} />
          <Route path="/detallado" element={<DetalladoPage />} />
          <Route path="/landing/link" element={<LinkPage />} />
          <Route path="/link" element={<LinkPage />} />
          <Route
            path="/operations/*"
            element={<Navigate to="/operations" replace />}
          />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/appointment" element={<AppointmentContainer />} /> */}
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
