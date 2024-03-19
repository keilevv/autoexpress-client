import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import LoginContainer from "./containers/Login";
import MainLayout from "./containers/Layout";
import ProtectedRoute from "./helpers/ProtectedRoute";
/* Hooks */
import useMenu from "./hooks/useMenu";
/* Containers */
import OperationsContainer from "./containers/Operations";
import CarsContainer from "./containers/Operations/Cars";
import LandingContainer from "./containers/Landing";
import ClientsContainer from "./containers/Operations/Clients";

/* Components*/
import Jobs from "./components/operations/Jobs";
import Operators from "./components/operations/Operators";
import Settings from "./components/operations/Settings";
import Dashboard from "./components/operations/Dashboard";

/* Styling */
import "./App.css";

function App() {
  const { defaultSelectedHeader } = useMenu();
  return (
    <div className="app">
      <ConfigProvider
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
                  <Dashboard />
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
                <OperationsContainer />
              </ProtectedRoute>
            }
          >
            <Route path="/agenda" element={<OperationsContainer />} />
          </Route>
          <Route
            path="/billing"
            element={
              <ProtectedRoute>
                <OperationsContainer />
              </ProtectedRoute>
            }
          >
            <Route path="/billing" element={<OperationsContainer />} />
          </Route>

          <Route path="/login" element={<LoginContainer />} />
          <Route path="/landing" element={<LandingContainer />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
