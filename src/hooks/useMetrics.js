import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dashboardService from "../services/dashboard";
import { throwError } from "../helpers";
import { statusTypes } from "../helpers/constants";

function useMetrics(filter) {
  let statusList = statusTypes.map((status) => ({
    key: status.value,
    value: 0,
  }));
  statusList.push({
    key: "archived",
    value: 0,
  });
  const auth = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [statusPercentages, setStatusPercentages] = useState([]);
  const [total, setTotal] = useState({
    cost: 0,
    material_profit: 0,
    sell_profit: 0,
    sell_price: 0,
  });

  useEffect(() => {
    if (auth.user && auth.user.accessToken) {
      setToken(auth.user.accessToken);
    }
  }, [auth]);

  useEffect(() => {
    getFinancialMetrics(filter);
  }, [filter]);

  const getFinancialMetrics = useCallback((filter = "") => {
    setLoading(true);
    return dashboardService
      .getFinancialMetrics(auth.user.accessToken, filter)
      .then((response) => {
        if (response.data) {
          setCount(response.data.count);
          setTotal({
            cost: response.data.results.total_cost,
            material_profit: response.data.results.total_material_profit,
            sell_profit: response.data.results.total_sell_profit,
            sell_price: response.data.results.total_sell_price,
            profit: response.data.results.total_profit,
          });
          setStatusPercentages(
            response.data.results.status_percentages.map((status) => ({
              key: status.key,
              value: status.value,
            }))
          );
          setLoading(false);
        }
      })
      .catch((err) => {
        throwError(err.message.message);
        setLoading(false);
      });
  }, []);

  return {
    getFinancialMetrics,
    total,
    loading,
    count,
    statusPercentages,
  };
}

export default useMetrics;
