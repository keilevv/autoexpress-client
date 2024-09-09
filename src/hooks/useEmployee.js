import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import employeesService from "../services/employees";
import { throwError } from "../helpers";

function useEmployees() {
  const auth = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (auth.user && auth.user.accessToken) {
      setToken(auth.user.accessToken);
    }
  }, [auth]);

  const getEmployees = useCallback((page = 1, limit = 10, filter = "") => {
    setLoading(true);
    return employeesService
      .getEmployees(auth.user.accessToken, page, limit, filter)
      .then((response) => {
        setCount(response.data.count);
        setEmployees(response.data.results);

        setLoading(false);
      })
      .catch((err) => {
        throwError(err.message.message);
        setLoading(false);
      });
  }, []);

  const getEmployee = useCallback((clientId) => {
    setLoading(true);
    employeesService
      .getEmployee(auth.user.accessToken, clientId)
      .then((response) => {
        setLoading(false);
        setEmployee(response.data.results);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  }, []);

  const createEmployee = useCallback((payload) => {
    setLoading(true);
    return employeesService
      .createEmployee(payload)
      .then((response) => {
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.error);
      });
  }, []);

  const updateEmployee = useCallback((clientId, payload) => {
    setLoading(true);
    return employeesService
      .updateEmployee(clientId, payload)
      .then((response) => {
        setEmployee(response.data.results);
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throwError(err.response.data.message);
      });
  }, []);

  return {
    getEmployees,
    createEmployee,
    updateEmployee,
    getEmployee,
    setEmployee,
    employee,
    employees,
    loading,
    count,
  };
}

export default useEmployees;
