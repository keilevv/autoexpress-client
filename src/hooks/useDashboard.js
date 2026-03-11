import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import dashboardService from "../services/dashboard";
import { throwError } from "../helpers";

function useDashboard() {
    const auth = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState(null);

    const getDashboardData = useCallback(
        (owner = "") => {
            if (!auth.accessToken) return;
            setLoading(true);
            return dashboardService
                .getDashboardData(auth.accessToken, owner)
                .then((response) => {
                    setDashboardData(response.data.results);
                    setLoading(false);
                    return response.data.results;
                })
                .catch((err) => {
                    throwError(
                        err.response?.data?.message ||
                        err.message ||
                        "Error al cargar dashboard",
                    );
                    setLoading(false);
                });
        },
        [auth.accessToken],
    );

    return {
        getDashboardData,
        dashboardData,
        loading,
    };
}

export default useDashboard;
