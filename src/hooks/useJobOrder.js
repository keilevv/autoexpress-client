import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import productionService from "../services/production";
import { throwError } from "../helpers";

function useJobOrder() {
  const auth = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobOrders, setJobOrders] = useState([]);
  const [jobOrder, setJobOrder] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (auth.user && auth.user.accessToken) {
      setToken(auth.user.accessToken);
    }
  }, [auth]);

  const getJobOrders = useCallback((page = 1, limit = 10, filter = "") => {
    setLoading(true);
    return productionService
      .getJobOrders(auth.user.accessToken, page, limit, filter)
      .then((response) => {
        setCount(response.data.count);
        setJobOrders(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        throwError(err.message.message);
        setLoading(false);
      });
  }, []);

  const getJobOrder = useCallback((clientId) => {
    setLoading(true);
    productionService
      .getJobOrder(auth.user.accessToken, clientId)
      .then((response) => {
        setLoading(false);
        setJobOrder(response.data.results);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  }, []);

  const createJobOrder = useCallback((payload) => {
    setLoading(true);
    return productionService
      .createJobOrder(auth.user.accessToken, payload)
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.error);
      });
  }, []);

  const updateJobOrder = useCallback((clientId, payload) => {
    setLoading(true);
    return productionService
      .updateJobOrder(clientId, payload)
      .then((response) => {
        setJobOrder(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
      });
  }, []);

  const addMaterialToJobOrder = useCallback((clientId, payload) => {
    setLoading(true);
    return productionService
      .addConsumedMaterialsToJobOrder(clientId, payload)
      .then((response) => {
        setJobOrder(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
      });
  }, []);

  return {
    getJobOrder,
    createJobOrder,
    updateJobOrder,
    getJobOrders,
    setJobOrder,
    addMaterialToJobOrder,
    jobOrder,
    jobOrders,
    loading,
    count,
  };
}

export default useJobOrder;
