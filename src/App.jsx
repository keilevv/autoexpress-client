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

/* Components*/
import Jobs from "./components/operations/Jobs";
import Operators from "./components/operations/Operators";
import Settings from "./components/operations/Settings";

/* Styling */
import "./App.css";
import AgendaContainer from "./containers/Agenda";

function App() {
  const { defaultSelectedHeader } = useMenu();
  return (
    <div className="app">
      <ConfigProvider
        locale={esES}
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#c00113",
            borderRadius: 8,

            // Alias Token
            colorBgContainer: "#ffff",
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
            path="/operations/settings"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LandingContainer />}></Route>
          <Route
            path="/agenda"
            element={
              <ProtectedRoute>
                <MainLayout defaultLocation={defaultSelectedHeader}>
                  <AgendaContainer />
                </MainLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/landing" element={<LandingContainer />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
