import { useState, useCallback } from "react";
import servicesService from "../services/service";
import { useSelector } from "react-redux";
import { throwError } from "../helpers";

function useServices() {
  const [service, setService] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const auth = useSelector((state) => state.auth);

  const createService = useCallback((payload) => {
    setLoading(true);
    return servicesService
      .createService(auth.accessToken, payload)
      .then((response) => {
        setServices([...services, response.data.results]);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response?.data?.message || "Error creating service");
        return err;
      });
  }, [auth.accessToken, services]);

  const getServices = useCallback(
    (page = 1, limit = 10, filter = "") => {
      setLoading(true);
      return servicesService
        .getServices(auth.accessToken, page, limit, filter)
        .then((response) => {
          setServices(response.data.results);
          setCount(response.data.count);
          setLoading(false);
          return response;
        })
        .catch((err) => {
          setLoading(false);
          throwError(err.response?.data?.message || "Error fetching services");
          return err;
        });
    },
    [auth.accessToken],
  );

  const getService = useCallback((serviceId) => {
    setLoading(true);
    return servicesService
      .getService(auth.accessToken, serviceId)
      .then((response) => {
        setService(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response?.data?.message || "Error fetching service");
        return err;
      });
  }, [auth.accessToken]);

  const updateService = useCallback((serviceId, payload) => {
    setLoading(true);
    return servicesService
      .updateService(auth.accessToken, serviceId, payload)
      .then((response) => {
        if (response.data) {
          setService(response.data.results);
          setLoading(false);
          return response;
        }
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response?.data?.message || "Error updating service");
      });
  }, [auth.accessToken]);

  const deleteService = useCallback((serviceId) => {
    setLoading(true);
    return servicesService
      .deleteService(auth.accessToken, serviceId)
      .then((response) => {
        if (response.data) {
          setServices(services.filter((s) => s._id !== serviceId));
          setLoading(false);
          return response;
        }
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response?.data?.message || "Error deleting service");
      });
  }, [auth.accessToken, services]);

  return {
    createService,
    getServices,
    updateService,
    deleteService,
    getService,
    service,
    services,
    count,
    loading,
  };
}

export default useServices;
