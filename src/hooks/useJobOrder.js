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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (auth.user && auth.accessToken) {
      setToken(auth.accessToken);
    }
  }, [auth]);

  const getJobOrders = useCallback((page = 1, limit = 10, filter = "") => {
    setLoading(true);
    return productionService
      .getJobOrders(auth.accessToken, page, limit, filter)
      .then((response) => {
        setCount(response.data.count);
        setJobOrders(response.data.results);
        setTotal(response.data.total_price);
        setLoading(false);
      })
      .catch((err) => {
        throwError(err.message.message);
        setLoading(false);
      });
  }, []);

  const getJobOrder = useCallback((jobOrderId) => {
    setLoading(true);
    productionService
      .getJobOrder(auth.accessToken, jobOrderId)
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
      .createJobOrder(auth.accessToken, payload)
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.error);
      });
  }, []);

  const updateJobOrder = useCallback((jobOrderId, payload) => {
    setLoading(true);
    return productionService
      .updateJobOrder(auth.accessToken, jobOrderId, payload)
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

  const addMaterialToJobOrder = useCallback((jobOrderId, payload) => {
    setLoading(true);
    return productionService
      .addConsumedMaterialsToJobOrder(
        auth.accessToken,
        jobOrderId,
        payload
      )
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
    total,
    jobOrder,
    jobOrders,
    loading,
    count,
  };
}

export default useJobOrder;
