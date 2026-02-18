import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import employeesService from "../services/employees";
import { throwError } from "../helpers";
import { setEmployeeList } from "../redux/reducers/employeesSlice";

function useEmployees() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (auth.user && auth.accessToken) {
      setToken(auth.accessToken);
    }
  }, [auth]);

  const getEmployees = useCallback((page = 1, limit = 10, filter = "") => {
    setLoading(true);
    return employeesService
      .getEmployees(auth.accessToken, page, limit, filter)
      .then((response) => {
        setCount(response.data.count);
        setEmployees(response.data.results);
        dispatch(setEmployeeList(response.data.results));
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
      .getEmployee(auth.accessToken, clientId)
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
      .updateEmployee(auth.accessToken, clientId, payload)
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

  const deleteEmployee = useCallback((clientId) => {
    setLoading(true);
    return employeesService
      .deleteEmployee(auth.accessToken, clientId)
      .then((response) => {
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
    deleteEmployee,
    getEmployee,
    setEmployee,
    employee,
    employees,
    loading,
    count,
  };
}

export default useEmployees;
